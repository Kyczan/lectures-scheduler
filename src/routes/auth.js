import { Router } from 'express';
import passportGoogle from '../auth/google';

const router = Router();

/* LOGIN ROUTER */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Please Sign In with:' });
});

/* LOGOUT ROUTER */
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

/* GOOGLE ROUTER */
router.get('/google',
  passportGoogle.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

export default router;