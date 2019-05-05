# lectures-scheduler

[![Build Status](https://travis-ci.com/Kyczan/lectures-scheduler.svg?branch=master)](https://travis-ci.com/Kyczan/lectures-scheduler)

Fullstack application to schedule lectures. Authentication is provided by passport.js and uses Google oAuth 2.0.

`mySQL + Express + React + Node`

Backend is Node.js API written using Express.js

Frontend uses React + Redux

Communication between API and frontend is managed by Axios lib.

## Local setup

You have to install docker first.

First copy `.env.example` to `.env`. Then just:

```sh
npm start
```

And navigate to `localhost:3000`

In development mode there are running 4 services in docker containers:

- one on `localhost:3000` - client react app
- second on `localhost:3001` - server express app
- third: mysql database
- fourth: adminer - simple db client running on `localhost:8080` (connect to db with host and password from `.env` file. User is `root`)

Also in dev mode authentication is not working because of proxy used in client app.

After first **prod** run you will get alert about no access.

You need to change flag in db in `users` table. Change column `access_privilege` from `F` to `T` and refresh page.
