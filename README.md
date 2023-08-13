# GitHub Repo Search

Glimpse is a simple web application that allows users to search for GitHub repositories using keywords and save them to a favorite repos list. The application uses the GitHub API to fetch the search results and display them to the user. Additionally, a lightweight external API server manages the favorites list.

### Technologies Used
- Nextjs 13+
- Typescript
- [TailwindCSS](https://tailwindcss.com/docs/installation)
- [HeadlessUI](https://headlessui.com/react/combobox)
- Jest
## Installation

To install and run the application locally, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies by running `npm install`.
3. Start the application by running `npm start`.
4. Open your web browser and navigate to `http://localhost:3000`.

Note:
To use the search functionality you will need to provide a Github Access Token with the public repository scope.

[Endpoints Available for fine-grain access tokens](https://docs.github.com/en/rest/overview/endpoints-available-for-fine-grained-personal-access-tokens?apiVersion=2022-11-28)

```
GET /search/code
GET /search/commits
GET /search/issues
GET /search/labels
GET /search/repositories
GET /search/topics
GET /search/users
```

The Github access token is referenced from an `.env` file with the name: `GITHUB_ACCESS_TOKEN`

## Usage

To use the application, enter a search term into the input field. The application will fetch the search results from the GitHub API and display them within the autocomplete. Select a result to add it to your list of favorite Github repositories.

Note:
The max amount of favorite Github repositories is 10. To search for additional repositiories lower the current favorite repository number to a number lower than 10.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
