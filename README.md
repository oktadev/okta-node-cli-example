# Okta Node.js Command Line Application Example

This project is the sample CLI application code for the blog post [Build a Command Line Application with Node.js](https://developer.okta.com/blog/2019/06/18/command-line-app-with-nodejs). This sample app demonstrates using Node.js to build a CLI application that can use PKCE to authenticate with an OAuth 2.0 API. Please read the blog post for more information!

To use this code, you will need the following:

* A recent version of [Node.js](https://nodejs.org) downloaded and installed
* A good text editor, such as [Visual Studio Code](https://code.visualstudio.com)
* A [free Okta developer account](https://developer.okta.com/signup/)

To successfully run this project you will need to:

1. Clone or download the source code.
1. Run `npm install` from the command line in the project folder.
1. Copy `.env.sample` to `.env`
1. Install the [Okta CLI](https://cli.okta.com) and run `okta register` to sign up for a new account. Use `okta login` if you already have an account.
1. Run `okta apps create`. Select the default app name, or change it as you see fit. Choose **Native** and use `http://localhost:8080/callback` for the Redirect URI. Set the Logout Redirect URI to `http://localhost:8080`.
1. Update `.env` with your **Issuer** and application's **Client ID**
1. Install the CLI app globally using `npm install -g .`

After installing the CLI app globally, you will have two commands you can use: `hello` and `pkce-login`.

Enjoy!
