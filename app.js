import express from "express";
import morgan from "morgan"; //middleware
import helmet from "helmet"; //security
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddelware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

import "./passport";

const app = express();

const CokieStore = MongoStore(session);

app.use(helmet());
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads")); //directory에서 file을 보내주는 middleware
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json()); //bodyParser은 웹사이트로 전달하는 정보들을 검사하는 middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan("dev"));
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CokieStore({mongooseConnection: mongoose.connection})
    })
);
app.use(passport.initialize()); //passport 초기화
app.use(passport.session()); 
//passport가 스스로 쿠키 보고 쿠키 정보에 해당하는 사용자를 찾아줌, 자기가 찾은 사용자를 request의 객체, req.user로 만듦

app.use(localsMiddelware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;