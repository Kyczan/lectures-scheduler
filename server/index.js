import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import {} from 'dotenv/config';
import path from 'path';
import routes from './routes';
import auth from './routes/auth';

const app = express();

app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', routes);
// app.use('/api', ensureAuthenticated, routes);
app.use('/auth', auth);
// app.use('/', ensureAuthenticated);

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '/client')));
  app.get('/*', (req, res) => {
    res.render('index', (err, html) => {
      res.send(html);
    });
  });
}

app.listen(3001);

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) return next();
//   res.redirect('/auth/login');
// }
