import passport from "passport";
import GithubStrategy from "passport-github";
import User from "./models/User";
import { githubLoginCallback } from "./controllers/userController";

passport.use(User.createStrategy());

passport.use(
    new GithubStrategy({ //github에서 돌아오는 과정
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    callbackURL: "http://localhost:4000/auth/github/callback"
    }),
    githubLoginCallback
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());