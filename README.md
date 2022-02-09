# Shopify Koa.js React App

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE.md)

**Production-ready** boilerplate to create a Shopify node app made with [Koa.js](https://koajs.com/), [Shopify-koa-auth](https://github.com/Shopify/quilt/tree/master/packages/koa-shopify-auth), [JSON web token](https://jwt.io/), [MongoDB](https://www.mongodb.com
) with [Mongoose](https://mongoosejs.com/), and [React](https://reactjs.org/) with [Polaris](https://github.com/Shopify/polaris-react).

## First things first

Since this [tutorial](https://shopify.dev/apps/getting-started/create) ([Link before **Unite**](https://developers.shopify.com/tutorials/build-a-shopify-app-with-node-and-react)) from **Shopify** using `shopify-cli` has a lot of issues with `Authentication`, `Session`, `Cookie`, `Infinite redirect`, `Expected a valid shop query parameter`... that make me frustrated for days, I decided to make this boilerplate which include all requirements for a Shopify app and have none of the above issues.

## Key features

- Using `shopify-koa-auth` (`offline` access mode) which make authentication process much faster
- Cookie base authentication using **JWT** with `httpOnly` and `secure` flag
- All [mandatory Webhooks](https://shopify.dev/apps/webhooks/mandatory) (**GDPR** and `app/uninstalled` topics) registered
- Querying **Shopify** resources with either **Rest API** or **GraphQL API**

## Prerequisites

- If you don’t have one, [create a Shopify partner account](https://partners.shopify.com/signup).
- If you don’t have one, [create a Development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) where you can install and test your app.
- In the Partner dashboard, [create a new app](https://help.shopify.com/en/api/tools/partner-dashboard/your-apps#create-a-new-app). You’ll need this app’s API credentials during the setup process.

## Installation

- Install and start MongoDB: https://www.mongodb.com/blog/post/mongodbs-official-brew-tap-now-open-and-flowing

- Clone repo
	```bash
	git clone https://github.com/hta218/shopify-koajs-react-app.git && cd shopify-koajs-react-app
	```

- Install dependencies
	```bash
	npm run set-up
	# or yarn set-up
	```

- Inside `/server` directory, create `.env` with all credentials from your private app that you have created in the above step (Take a look at `.env.example` for the template)

- Start project
	```bash
	npm start
	```

## Authentication

**Shopify OAuth** process require **HTTPS** so you need to either using [ngrok](https://ngrok.com/) or [generate SSL](https://www.freecodecamp.org/news/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec/) files then move theme to `server/certs` directory (**recommended**)

## License

Copyright (c) 2022 - Leo @ [https://leohuynh.dev](https://leohuynh.dev)
