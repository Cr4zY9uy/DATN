
import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from "../models/user_model.js";

passport.use(
    new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
        scope: [
            'email',
            'profile']
    }, async (accessToken, refreshToken, profile, done) => {
        if (profile.id) {
            const existingUser = User.findOne({ googleId: profile.id });
            if (existingUser) {
                done(null, existingUser);
            } else {
                const newUser = {
                    googleID: profile?.id,
                    email: profile?.emails[0]?.value,
                    name: profile?.displayName,
                    image: profile?.photos[0]?.value,
                    refreshToken: refreshToken,
                    accessToken: accessToken
                }
                await User.create(newUser)
                done(null, newUser);
            }
        }
    })
);

