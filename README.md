# lectures-scheduler

Fullstack application to schedule lectures with Google authentication.

`mySQL + Express + Angular + Node`

Frontend uses old Angular 1.x as it was written a long time ago...

In future Angular will be replaced with React (?)

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
gulp
```

And navigate to `localhost:3000`