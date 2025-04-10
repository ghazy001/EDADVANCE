const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;const User = require('../models/User');
const axios = require('axios');

require('dotenv').config();

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user.id); // Store user ID in session
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email', 'https://www.googleapis.com/auth/classroom.courses.readonly'], // Ensure all required scopes
    },
    async (accessToken, refreshToken, profile, done) => {
      try {

        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.findOne({ email: profile.emails[0].value });
          if (!user) {
            user = new User({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              role: 'user',
              googleAccessToken: accessToken,
              googleRefreshToken: refreshToken,
            });
            await user.save();
            console.log('New user created with tokens:', user);
          } else {
            // Update existing user with new tokens
            user.googleId = profile.id;
            user.googleAccessToken = accessToken;
            user.googleRefreshToken = refreshToken;
            await user.save();
          }
        } else {
          // Update tokens for existing Google user
          user.googleAccessToken = accessToken;
          user.googleRefreshToken = refreshToken;
          await user.save();
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ['id', 'displayName', 'emails'], // Request email
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ facebookId: profile.id });
        if (!user) {
          user = await User.findOne({ email: profile.emails?.[0]?.value });
          if (!user) {
            user = new User({
              facebookId: profile.id,
              name: profile.displayName,
              email: profile.emails?.[0]?.value || `${profile.id}@facebook.com`, // Fallback email
              role: 'user',
            });
            await user.save();
          } else {
            user.facebookId = profile.id;
            await user.save();
          }
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// GitHub Strategy (Improved)
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ['user:email'], // Request email access
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ githubId: profile.id });
        if (!user) {
          // Check if user exists by email
          const email = profile.emails?.[0]?.value;
          user = await User.findOne({ email });
          if (!user) {
            // Create new user
            user = new User({
              githubId: profile.id,
              name: profile.displayName || profile.username || 'GitHub User',
              email: email || `${profile.id}@github.com`, // Fallback email
              role: 'user',
            });
            await user.save();
          } else {
            // Link GitHub ID to existing user
            user.githubId = profile.id;
            await user.save();
          }
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// LinkedIn Strategy (Adjusted)
passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: process.env.LINKEDIN_CALLBACK_URL,
      scope: ['openid', 'profile', 'email'], // Assurez-vous que 'email' est bien inclus
      state: true,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      console.log("Profile JSON:", profile._json);
      console.log("Emails:", profile.emails);

      try {
        let user = await User.findOne({ linkedinId: profile.id });

        if (!user) {
          const email = profile.emails?.[0]?.value; // Vérifiez si l'email est bien retourné
          user = new User({
            linkedinId: profile.id,
            name: profile.displayName || 'LinkedIn User',
            email: email || `${profile.id}@linkedin.com`,
            role: 'user',
          });
          await user.save();
        }

        done(null, user);
      } catch (err) {
        console.error("LinkedIn Strategy Error:", err);
        done(err, null);
      }
    }
  )
);

module.exports = passport;