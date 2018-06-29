import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import {} from 'dotenv/config';
import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.use('/api', routes);

app.get('/', (req, res) => 
  res.sendFile('index.html')
);
app.get('*', (req, res) => 
  res.redirect('/')
);

app.listen(3000);
