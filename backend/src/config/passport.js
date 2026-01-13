import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { User } from '../models/index.js';

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/api/auth/google/callback",
},
async function (accessToken, refreshToken, profile, done) {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (user) {
      return done(null, user);
    }
    const email = profile.emails && profile.emails[0].value;
    const newUser = await User.create({ username: profile.displayName, googleId: profile.id, email: email });
    return done(null, newUser);
  } catch (error) {
    return done(error, null);
  }
}
));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/api/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'emails']
},
async function(accessToken, refreshToken, profile, done) {
  try {
    let user = await User.findOne({ facebookId: profile.id });
    if (user) {
      return done(null, user);
    }
    // Facebook may not always provide email
    const email = profile.emails && profile.emails[0] && profile.emails[0].value ? profile.emails[0].value : null;
    const newUser = await User.create({
      username: profile.displayName,
      facebookId: profile.id,
      email: email
    });
    return done(null, newUser);
  } catch (error) {
    return done(error, null);
  }
}
));

passport.serializeUser((user, done) => {
  done(null, user.id || user.userId);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ where: { userId: id } }); // use userId, matching model definition
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;