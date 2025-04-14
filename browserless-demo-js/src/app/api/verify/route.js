import browserqlQuery from '../../../graphql/browserql.graphql';

// Define possible values for session parameters
const parameterCombinations = [
  { browser: 'Chromium', humanLikeBehavior: true, adblock: true },
  { browser: 'Chromium', humanLikeBehavior: true, adblock: false },
  { browser: 'Chromium', humanLikeBehavior: false, adblock: true },
  { browser: 'Chromium', humanLikeBehavior: false, adblock: false },
  { browser: 'Chrome', humanLikeBehavior: true, adblock: true },
  { browser: 'Chrome', humanLikeBehavior: true, adblock: false },
  { browser: 'Chrome', humanLikeBehavior: false, adblock: true },
  { browser: 'Chrome', humanLikeBehavior: false, adblock: false },
];

// API route handler for POST requests
export async function POST(request) {
  const { urls } = await request.json();  // Extract URLs from request
  const results = [];  // Store results for each URL

  for (const url of urls) {
    let success = false;
    let successParams = null;
    let lastError = null;

    for (const params of parameterCombinations) {
      try {
        const response = await fetch(`https://production-sfo.browserless.io/content?token=${process.env.BROWSERLESS_API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
          },
          body: JSON.stringify({ url }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText.slice(0, 100)}...`);
        }

        const html = await response.text();  // Parse as text, not JSON
        success = true;
        successParams = params;
        break;  // Exit loop after successful fetch

      } catch (error) {
        lastError = error.message;
      }
    }

    results.push({
      url,
      success,
      parameters: success ? successParams : null,
      error: !success ? lastError : null,
    });
  }

  return new Response(JSON.stringify(results), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
