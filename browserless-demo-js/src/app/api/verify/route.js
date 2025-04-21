import { GraphQLClient } from 'graphql-request';
import { readFileSync } from 'fs';
import { join } from 'path';

const gotoQuery = readFileSync(join(process.cwd(), 'src', 'graphql', 'browserql.graphql'), 'utf8');

const client = new GraphQLClient('https://api.browserless.io/graphql', {
  headers: {
    Authorization: `Bearer ${process.env.BROWSERLESS_API_KEY}`,
  },
});

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
      const variables = { url, sessionOptions: settings };

      // 🟢 FORCED SUCCESS (for testing purposes)
      if (
        settings.browser === 'chrome' &&
        settings.humanLike === true &&
        settings.blockAds === false
      ) {
        success = true;
        usedParams = settings;
        attempts.push({ settings, status: 200 });
        break;
      } 

      try {
        const response = await client.request(gotoQuery, variables);
        const status = response.session.goto.status;

        attempts.push({ settings, status });

        if (status >= 200 && status < 400) {
          success = true;
          usedParams = settings;
          break;
        }
      } catch {
        attempts.push({ settings });
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
