# StudyPortal Front-End

Studyportal-axion is the frontend application for the Studyportal application.  This repositiory contains all the front-end code.

The application is avaliable at studysdslabs.co.

## Pre-Requisites:

1. Node.js + npm
1. Docker(optional)

## Local Development

Run the following commands in order to have the code up and running on your machine:

```bash
# installs dependencies
npm install

# Builds and serves assets with hot-reload
npm start
```

## Docker setup

Alternatively, you can use Docker to build and run the application. You just have to run:

```bash
docker-compose up
```

You should now have the application running and accessible at http://localhost:3005.

You will need to setup the studyportal-nexus locally to get the api for testing the application locally. You can find the instructions for the API setup at [studyportal-nexus](https://github.com/sdslabs/studyportal-nexus).

## Localhost Tunneling

If you want to make your local development server accessible to the internet (for testing or showing someone something you're working on), you can use [`ngrok`](https://ngrok.com/). Follow the documentation on the `ngrok` site to install it and set it up. Once you have it installed, get the development server for Openverse running and in a separate window/tab, run:

```
# The extra parameters are required to ensure that ngrok redirects to the HTTPS version of the site
# and that the host header matches one that is accepted by the server
# (ngrok's default hostname is randomly generated and is not whitelisted).
ngrok http http://localhost:3005 -host-header="localhost:3005"
```

If you need to run an HTTP version (for example, if you're testing against third-party websites that do not accept the self-signed certificate generated by the dev server), run the dev server using `npm start` and use the following command to start `ngrok`:

```
ngrok http 3005 -host-header="localhost:3005"
```

## Formatting and Linting

The code in this repository is formatted using `prettier`. If you have prettier setup in your code editor it should work out of the box; otherwise you can use the `npm run lintfix` script to format and fix lint errors in your code. Checks are run to lint your code and validate the formatting on git precommit using [husky](https://github.com/typicode/husky).

You will need to fix any linting issues before committing. We recommend formatting your JavaScript files on save in your text editor. You can learn how to do this in Visual Studio Code [here](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode#format-on-save).

