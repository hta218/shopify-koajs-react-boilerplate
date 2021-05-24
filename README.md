# Shopify App Starter

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE.md)
[![Build Status](https://travis-ci.com/Shopify/shopify-app-node.svg?branch=master)](https://travis-ci.com/Shopify/shopify-app-node)

Boilerplate to create an embedded Shopify app made with Node, [Next.js](https://nextjs.org/), [Shopify-koa-auth](https://github.com/Shopify/quilt/tree/master/packages/koa-shopify-auth), [Polaris](https://github.com/Shopify/polaris-react), and [App Bridge React](https://shopify.dev/tools/app-bridge/react-components).

## Prerequisites

- [Create a Shopify partner account](https://partners.shopify.com/signup).
- [Create a Development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) where you can install and test your app.

## Installation

- [Node.js](https://nodejs.org) latest installed.
- Install [ngrok](https://ngrok.com/) in your environment and log in on browser 
- Install [Shopify App CLI](https://shopify.dev/tools/cli)

  ```bash
  # Using homebrew on macOS
  brew tap shopify/shopify
  brew install shopify-cli
  ```

  After the installation has completed, run `shopify version` to verify the installation was successful.

## Use starter code

- Clone repo (or fork)

  ```bash
  git clone https://github.com/hta218/shopify-app-starter.git && cd shopify-app-starter
  ```

- Open it on your **IDE**

  ```bash
  # For VSCode user
  code .
  ```

- Connect starter to a specific Shopify development store.

  ```bash
  shopify connect
  ```

  The `connect` command re-creates the project's `.env` and `.shopify-cli.yml` files if they don't exist, or updates the files if they do exist.

  Follow the CLI instruction then check `.env` file to make sure it has correct credential info

- Start development server

  ```bash
  shopify serve
  ```

  - Follow the **ngrok URL** shown in the terminal to install and start using the app in your development store

  - The **ngrok URL** should redirect to your Shopify admin app dashboard. Click **Install** and wait for a few seconds to load and render your app

## License

This respository is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

Copyright © 2021 - Leo @ [https://leohuynh.dev](https://leohuynh.dev)
