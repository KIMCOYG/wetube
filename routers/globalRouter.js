import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import { join, logout, login, getJoin, postJoin, getLogin, postLogin } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin); //postJoin 가입, postLogin 로그인

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, logout);

export default globalRouter;