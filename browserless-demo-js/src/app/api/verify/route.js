import { readFileSync } from 'fs';
import { join } from 'path';

const gotoQuery = readFileSync(
  join(process.cwd(), 'src', 'graphql', 'browserql.graphql'),
  'utf8'
);

export async function POST(req) {
  const { urls } = await req.json();

  const settingsPermutations = [
    { browser: 'chrome', humanLike: true, blockAds: true },
    { browser: 'chrome', humanLike: true, blockAds: false },
    { browser: 'chrome', humanLike: false, blockAds: true },
    { browser: 'chrome', humanLike: false, blockAds: false },
    { browser: 'chromium', humanLike: true, blockAds: true },
    { browser: 'chromium', humanLike: true, blockAds: false },
    { browser: 'chromium', humanLike: false, blockAds: true },
    { browser: 'chromium', humanLike: false, blockAds: false },
  ];

  const results = [];

  for (const url of urls) {
    const attempts = [];
    let success = false;
    let usedParams = null;

    for (const settings of settingsPermutations) {
      try {
        const response = await fetch(
          `https://production-sfo.browserless.io/chrome/bql?token=${process.env.BROWSERLESS_API_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              query: gotoQuery,
              variables: {url},
            }),
          }
        );

        const text = await response.text();
        let data;

        try {
          data = JSON.parse(text);
        } catch (err) {
          console.error(`❌ Non-JSON response with ${JSON.stringify(settings)}:`);
          console.error(text.slice(0, 300));
          attempts.push({ settings, error: 'Non-JSON response', raw: text.slice(0, 300) });
          continue;
        }
        if (data.errors) {
          console.error(`❌ GraphQL error with ${JSON.stringify(settings)}:`);
          console.error(JSON.stringify(data.errors, null, 2));
          attempts.push({ settings, error: 'GraphQL Error', details: data.errors });
          continue;
        }

        const status = data?.data?.goto?.status;

        if (status && status >= 200 && status < 400) {
          success = true;
          usedParams = settings; 
          attempts.push({ settings, status });
          break; 
        } else {
          attempts.push({ settings, status });
        }
        
      } catch (err) {
        console.error(`❌ Fetch error with ${JSON.stringify(settings)}:`, err.message);
        attempts.push({ settings, error: err.message });
      }
    }

    results.push({
      url,
      success,
      usedParams,
      attemptedSettings: attempts,
    });
  }

  return Response.json({ results });
}
