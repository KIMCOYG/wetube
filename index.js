import express from "express";
const app = express();

const PORT = 4000;

const handleProfile = (req, res) => res.send("You are on my profile");

const handleListening = () => 
    console.log(`Listening on: http://localhost:${PORT}`);


const handleHome = (req, res) => res.send("Hello from ass");

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);