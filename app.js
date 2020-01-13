import express from "express";
import morgan from "morgan"; //middleware
import helmet from "helmet"; //security
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import { localsMiddelware } from "./middlewares";

const app = express();

app.use(helmet());
app.set("view engine", "pug");
app.use(cookieParser());
app.use(bodyParser.json()); //bodyParser은 웹사이트로 전달하는 정보들을 검사하는 middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan("dev"));
app.use(localsMiddelware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;