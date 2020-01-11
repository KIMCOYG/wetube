import express from "express";
import morgan from "morgan"; //middleware
import helmet from "helmet"; //security

const app = express();

const PORT = 4000;

const handleListening = () => 
    console.log(`Listening on: http://localhost:${PORT}`);

const handleHome = (req, res, next) => res.send("Hello from ass");

const handleProfile = (req, res) => res.send("You are on my profile");

app.use(helmet());
app.use(morgan("dev"));

const middleware = (req, res, next) => {
    res.send("not happening");
}

app.get("/",middleware, handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);