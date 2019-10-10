# Profile MS

## Dependencies

1. Node.js: v10.16.0
2. Install yarn package manager for node https://yarnpkg.com/lang/en/docs/install/#debian-stable
3. PM2, process monitor for node, install using `yarn global add pm2`

## Install

### install necessary dependencies

-   Run `cd ms-profileService`
-   Run `yarn`

### Set up environment variables

-   `cp .env.sample .env`, modify as required

### If you have pm2 installed

-   You can use `pm2 start ./src/index.js`

### Or manually

-   Run `node ./src/index.js`

## Swagger UI

Swagger is available at http://HOST:PORT/docs
# profile
