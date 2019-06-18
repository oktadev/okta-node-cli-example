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
1. Create a "native" application in [Okta](https://developer.okta.com)
1. Update `.env` with your **Okta developer URL** and application's **Client ID**
1. Install the CLI app globally using `npm install -g .`

After installing the CLI app globally, you will have two commands you can use: `hello` and `pkce-login`.

Enjoy!
