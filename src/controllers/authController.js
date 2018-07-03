import passport from 'passport';
import passportGoogleOauth from 'passport-google-oauth';
import db, { users as sql } from '../db';

const GoogleStrategy = passportGoogleOauth.OAuth2Strategy;

passport.serializeUser( (user, done) => {
  done(null, user);
});

passport.deserializeUser(async (userData, done) => {
  const data = await db.query(sql.findOne, [userData.id]);
  let user = false;
  if (data.length) user = data[0];
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},
async (accessToken, refreshToken, profile, done) => {
  const data = await db.query(sql.findOne, [profile.id]);
  let user = false;
  if (data.length) user = data[0];
  return done(null, user);
}));

export default passport;
