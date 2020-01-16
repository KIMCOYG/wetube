// export const videos = [
//     {
//         id:324393,
//         title: 'Video awesome',
//         description: 'This is something I love',
//         views:24,
//         videoFile:"https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//         creator: {
//             id: 121212,
//             name: "Nicolas",
//             email: "nico@las.com",
//         }
//     },
// ];
import mongoose from "mongoose";

mongoose.connect(
    "mongodb://localhost:27017/we-tube",
    {
        useNewUrlParser: true,
        useFindAndModify: false
    });

const db = mongoose.connection;

const handleOpen = () => console.log("Connected to DB");
const handleError = () => console.log(`Error on DB Connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);