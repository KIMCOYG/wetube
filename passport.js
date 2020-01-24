import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import User from "./models/User";
import { githubLoginCallback, facebookLoginCallback } from "./controllers/userController";
import routes from "./routes";



passport.use(User.createStrategy());

passport.use(
    new GithubStrategy(
        { //github에서 돌아오는 과정
            clientID: process.env.GH_ID,
            clientSecret: process.env.GH_SECRET,
            callbackURL: `http://localhost:4000${routes.githubCallback}`
        },
        githubLoginCallback
    )
);

passport.use(
    new FacebookStrategy(
    {
        clientID: process.env.FB_ID,
        clientSecret: process.env.FB_SECRET,
        /* clientID: "246712722979317",
        clientSecret: "1c4d6b79a395273d0d2fa20060ea8673", */
        callbackURL: `http://localhost:4000${routes.facebookCallback}`
    },
    facebookLoginCallback
    )
);

/* passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); */
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));