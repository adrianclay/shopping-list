# Shopping list
![Build](https://github.com/adrianclay/shopping-list/workflows/Build/badge.svg)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Developing

### Dependencies

* [Yarn][yarn]
* [Firebase CLI][firebase_cli]

[yarn]: https://yarnpkg.com/
[firebase_cli]: https://firebase.google.com/docs/cli

### Firebase config

Copy the `.env.sample` to `.env`, e.g.
```
$ cp .env.sample .env
```
and fill in the blanks using the [Firebase config object][firebase-config-object].

[firebase-config-object]: https://firebase.google.com/docs/web/setup?authuser=0#config-object

In the project directory, you can run:

### `make start`

Runs the emulator and app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.

## Deployment

GitHub Actions has jobs which test, build and deploy the application.

### GitHub secrets

To Deploy to [Firebase Hosting][firebase_hosting] the deploy job needs the following [GitHub secrets][github_secrets_docs]. 

* FIREBASE_PROJECT_ID - see [Setting up a Firebase Project][firebase_project_id]
* FIREBASE_TOKEN - generated via `firebase login:ci`

[firebase_hosting]: https://firebase.google.com/docs/hosting
[github_secrets_docs]: https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets
[firebase_project_id]: https://firebase.google.com/docs/projects/learn-more#project-id
