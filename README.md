# Browserless URL Verification Tool

This tool allows users to submit URLs and verify whether they load successfully using Browserless with different session permutations. It uses a `.graphql` file to send requests via **BrowserQL** on the free tier of the plan.

---

## ✅ Features

- Accepts one or more user-submitted URLs
- Sends BQL (Browserless GraphQL) requests using a `.graphql` file
- Iterates through 8 session setting combinations:
  - `browser: chrome | chromium`
  - `humanLike: true | false`
  - `blockAds: true | false`
- Displays which combinations result in a successful load

---

## 📂 Tech Stack

- Next.js (App Router)
- GraphQL (BrowserQL)
- Browserless API
- `.graphql` query (loaded from file)

---

## 🚀 How to Run Locally

> 📌 This app uses the `.graphql` file format and is fully compatible with the free tier of Browserless BQL.

### 1. Clone the repository

```bash
git clone https://github.com/your-username/browserless-url-tool.git
cd browserless-url-tool
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your Browserless API key

Create a `.env.local` file in the root folder:

```env
BROWSERLESS_API_KEY=your-browserless-token-here
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open your browser

Go to: [http://localhost:3000](http://localhost:3000)

---

## 📄 GraphQL Query (`browserql.graphql`)

This file contains the BrowserQL mutation that’s used to test each URL with a given session setting.

```graphql
mutation BrowserQuery($url: String!) {
  goto(url: $url) {
    status
  }
}
```

> ⚠️ Session options like `browser`, `humanLike`, and `blockAds` are passed as **top-level variables**, not inside a `sessionOptions` object. This format is specific to BrowserQL and differs from the general GraphQL API.

---

## 🔗 Notes

- All BQL requests are sent to:

```
https://production-sfo.browserless.io/chrome/bql?token=your-token
```

- The `.graphql` file is required and must be located at:

```
src/graphql/browserql.graphql
```

- This project uses only features available on the **free tier** of Browserless.io.

---

