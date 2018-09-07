# lectures-scheduler

Fullstack application to schedule lectures with Google authentication.

`mySQL + Express + React + Node`

Frontend uses React + Redux

## Setup

First copy `.env.example` to `.env` and set mySQL database details and google credentials for authentication.

Run `setup_db.sql` in mySQL database.

Database also needs yours details to authenticate you in app:

```
insert into users values ('your_google_user_id', 'Your Name');
```

Then just:

```
npm i
npm start
```

And navigate to `localhost:3000`
