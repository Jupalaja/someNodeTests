# Some Node Tests

This is a Node.js application to ranks the top 10 Google repositories on [GitHub](https://docs.github.com/en/rest/using-the-rest-api/getting-started-with-the-rest-api?apiVersion=2022-11-28) according to user-defined importance

## Run it!

```bash
git clone https://github.com/Jupalaja/someNodeTests
cd someNodeTests
npm install
npm run dev
```

## API Endpoint

**GET** `/api/popularity`

Query parameters:

- `starImportance`: Numeric value representing the importance of stars.
- `forkImportance`: Numeric value representing the importance of forks.

Example: `http://localhost:3000/?starImportance=2&forkImportance=1`
Test it [Here](https://web-production-b8d3.up.railway.app?starImportance=0.1&forkImportance=1/)

Response: Top 10 Google repos ordered by custom popularity index.

## Function `getPopularityIndex`

Located in `utils/getPopularityIndex.js`, this function takes a list of repositories and two numbers (starImportance, forkImportance) as inputs and then calculates a popularity index for each repository by applying these weights

## Possible Improvements

**Adding API Endpoints:** so far the app just has one task which is to list the top google repos, however as new logic is added, there should be endpoints to keep it organized

**The function `getPopularityIndex`:** is not normalized, this is an issue because it does not offer a standard for the imput weights, if the function considers the max value of the input it can provide better results
