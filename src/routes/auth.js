import { Router } from 'express';
import passportGoogle from '../controllers/authController';

const auth = Router();

auth.get('/login', (req, res) => {
  res.render('login', { title: 'Logowanie' });
});

auth.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

auth.get('/google',
  passportGoogle.authenticate('google', { scope: ['profile'] })
);

auth.get('/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/') 
);

export default auth;