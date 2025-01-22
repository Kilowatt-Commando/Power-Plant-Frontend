# Power Plant Frontend
This webapp renders a simple user interface that allows users to view and interact with (our) power plants.

## Prerequisites
In order to run this project you need to have the following installed on your machine:
- Node.js

## Environment Variables
This project uses the following secrets that need to be set in the `.env` file:
- `NEXTAUTH_URL`: The URL at which the frontend can be accessed, locally this is by default `http://localhost:3000`
- `NEXTAUTH_SECRET`: A secret (string) used to encrypt the session token
- `NEXT_AUTH_GITHUB_ID`: The client ID of the GitHub OAuth application used for authentication
- `NEXT_AUTH_GITHUB_SECRET`: The client secret of the GitHub OAuth application used for authentication
- `DATA_API`: The base URL of the data API, e.g. `https://api.example.com` that provides the frontend with real-world data. When no data API is available, you can use the dummy data API endpoint by setting `DATA_API` to `http://localhost:3000/api`. 
- `CONTROL_API`: The base URL of the control API, e.g. `https://api-control.example.com` to which commands like "shutdown", "start" are send. When no control API is available, you can use the dummy control API endpoint by setting `CONTROL_API` to `http://localhost:3000/api`. 

## Getting Started

First, clone the repository:

```bash
https://github.com/Kilowatt-Commando/Power-Plant-Frontend.git
```

Then, navigate to the project directory and install the dependencies, using yarn. In case you don't have yarn installed, you can install it using npm:

```bash
npm install yarn -g
````

```bash
yarn install
````

Having installed the dependencies you can now run the development server or build the application for production.

```bash
npm run dev
# or
npm run build # to build the application
npm run start # to start the application, after it has been build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Wiki
For more information on the project, please refer to the [Wiki](https://github.com/Kilowatt-Commando/Power-Plant-Frontend/wiki). For example:
- [Development Process](https://github.com/Kilowatt-Commando/Power-Plant-Frontend/wiki/Development-Process)
- [Workflows](https://github.com/Kilowatt-Commando/Power-Plant-Frontend/wiki/Workflows)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions
are welcome!