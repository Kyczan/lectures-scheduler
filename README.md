# lectures-scheduler

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
npm i
npm start
```

And navigate to `localhost:3000`

After first run you will get alert about no access. 

You need to change flag in db in `users` table. Change column `access_privilege` from `F` to `T` and refresh page.
