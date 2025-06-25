
import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from "../models/user_model.js";
import dotenv from 'dotenv';
dotenv.config();


const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;

export const connectToGoogle = () => {



    passport.use(
        new GoogleStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
            scope: [
                'email',
                'profile'],
            // passReqToCallback: true
        }, async (accessToken, refreshToken, profile, done) => {
            if (profile.id) {
                const existingUser = await User.findOne({ $or: [{ googleID: profile?.id }, { email: profile?.emails[0]?.value }] });
                if (existingUser) {
                    if (existingUser.googleID !== profile?.id) {
                        const updatedUser = await User.findOneAndUpdate({ _id: existingUser._id }, { googleID: profile?.id })
                        return done(null, updatedUser);
                    }
                    return done(null, existingUser);
                } else {
                    const newUser = {
                        googleID: profile?.id,
                        email: profile?.emails[0]?.value,
                        firstName: profile?.name?.familyName,
                        lastName: profile?.name?.givenName,
                        image: profile?.photos[0]?.value,
                        username: profile?.name?.familyName,
                        role: 0
                    }
                    const user = await User.create(newUser)
                    delete user.password
                    const dataForAccessToken = {
                        username: user.username,
                        role: user.role,
                        user_id: user._id
                    };

                    const accessToken = jwt.sign(dataForAccessToken, accessTokenSecret, { expiresIn: accessTokenLife });

                    const dataForRefreshToken = {
                        username: user.username,
                        user_id: user._id
                    };
                    const refreshToken = jwt.sign(dataForRefreshToken, refreshTokenSecret, { expiresIn: refreshTokenLife });
                    return done(null, { ...user, accessToken: accessToken, refreshToken: refreshToken });
                }
            }
        })
    );

    passport.serializeUser((user, done) => {
        return done(null, user);
    })


    passport.deserializeUser(async (obj, cb) => {
        const user = await User.findById(obj._id);
        return user ? cb(null, user) : cb(null, null);
    });


}