import { Router } from 'express';
import passportGoogle from '../controllers/authController';

const auth = Router();

auth.get('/login', 
  passportGoogle.authenticate('google', { scope: ['email'] })  
);

auth.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

auth.get('/401', (req, res) => {
  res.render('401');
});

auth.get('/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/auth/401' }),
  (req, res) => res.redirect('/') 
);

export default auth;
