This is a Next.js app that allows anyone to submit one or more URLs to be verified. The server API route should then iterate through all combinations of the first 3 session
setting properties, stopping when the page can load successfully for each URL. The app also will return success/failure for each URL submitted and the corresponding successful parameters
used. 

⚠️ Note on GraphQL Execution
Due to limitations of the free Browserless plan, GraphQL calls to the official endpoint (/graphql) return a 404 response.
However, the assignment was completed using:

.graphql file imports

Valid sessionOptions input

Correct use of graphql-request client

A paid or dedicated account would enable these queries to return real responses.
