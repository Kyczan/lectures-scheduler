import passport from 'passport';
import passportGoogleOauth from 'passport-google-oauth';
import db, { users as sql } from '../db';
import validateUser from '../models/users';

const GoogleStrategy = passportGoogleOauth.OAuth2Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (userData, done) => {
  const data = await db.query(sql.findOne, {
    replacements: [userData.id],
    type: db.QueryTypes.SELECT
  });
  let user = false;
  if (data.length && data[0].access_privilege === 'T') user = data[0];
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
    },
    async (accessToken, refreshToken, profile, done) => {
      const userData = {
        id: profile.id,
        name: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value
      };
      const { error } = validateUser(userData);
      let data = await db.query(sql.findOne, {
        replacements: [userData.id],
        type: db.QueryTypes.SELECT
      });
      let user = false;

      if (data.length) {
        if (data[0].access_privilege === 'T') {
          user = data[0];
        }
      } else {
        const params = [userData.id, userData.name, userData.email];
        await db.query(sql.create, { replacements: params });
      }

      return done(error, user);
    }
  )
);

export default passport;
