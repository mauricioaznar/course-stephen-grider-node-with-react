const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../config/keys')
const mongoose = require('mongoose')

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

// 110865774611-9amnmdug156iesivb2hc3gtdl69dqk0u.apps.googleusercontent.com
// PYRfJucfZ36ieoOnkn1yg1U4
passport.use('google', new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({googleId: profile.id})
    if (existingUser) {
      // we already have a record with the given profile ID
      done(null, existingUser)
      return
    }
    // we dont have a user record with this id, make a new record
    const newUser = await new User({googleId: profile.id}).save()
    done(null, newUser)
  })
)