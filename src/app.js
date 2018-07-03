import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import {} from 'dotenv/config';
import routes from './routes';
import auth from './routes/auth';

const app = express();

app.set('views', './src/views');
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api',ensureAuthenticated, routes);
app.use('/auth', auth);
app.use('/', ensureAuthenticated);
app.use('/', express.static(__dirname + '/public'));

app.get('/', (req, res) => 
  res.sendFile('index.html')
);
app.get('*', (req, res) => 
  res.redirect('/')
);

app.listen(3000);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next(); 
  res.redirect('/auth/login');
}
