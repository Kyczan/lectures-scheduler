# lectures-scheduler

[![Build Status](https://travis-ci.org/Kyczan/lectures-scheduler.svg?branch=master)](https://travis-ci.org/Kyczan/lectures-scheduler)

Fullstack application to schedule lectures. Authentication is provided by passport.js and uses Google oAuth 2.0.

`mySQL + Express + React + Node`

Backend is Node.js API written using Express.js

Frontend uses React + Redux

Communication between API and frontend is managed by Axios lib.

## Setup

First copy `.env.example` to `.env` and set mySQL database details and google credentials for authentication.

Run `setup_db.sql` in mySQL database.

Then just:

```
npm i && cd client && npm i && cd ..
npm start
```

And navigate to `localhost:3000`

In development mode there are running two servers:

- one on `localhost:3000` - client react app
- second on `localhost:3001` - server express app

Also in dev mode authentication is not working because of proxy used in client app.

When you start production version of app (by typing `npm run start:build`) there is only one server running on `localhost:3001`.

After first prod run you will get alert about no access.

You need to change flag in db in `users` table. Change column `access_privilege` from `F` to `T` and refresh page.
