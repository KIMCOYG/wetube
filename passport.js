import passport from "passport";
import User from "./models/User";

passport.use(user.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());