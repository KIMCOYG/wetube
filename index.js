import express from "express";
import morgan from "morgan"; //middleware
import helmet from "helmet"; //security
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();

const PORT = 4000;

const handleListening = () => 
    console.log(`Listening on: http://localhost:${PORT}`);

const handleHome = (req, res, next) => res.send("Hello from ass");

const handleProfile = (req, res) => res.send("You are on my profile");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(helmet());
app.use(morgan("dev"));


app.get("/", handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);