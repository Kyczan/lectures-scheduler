import passport from 'passport';
import passportGoogleOauth from 'passport-google-oauth';
// var User = require('../models/User');

const GoogleStrategy = passportGoogleOauth.OAuth2Strategy

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    // todo:
      //  User.findOrCreate({ userid: profile.id }, { name: profile.displayName,userid: profile.id }, function (err, user) {
      //    return done(err, user);
      //  });
  }
));

export default passport;