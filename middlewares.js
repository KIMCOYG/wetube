import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_PRIVATE_KEY,
    region: "ap-northeast-2"
})

// const multerVideo = multer({dest: "uploads/videos/"});
const multerVideo = multer({
    storage: multerS3({
        s3,
        acl: "public-read",
        bucket: "kimtube/video",
    })
});
// const multerAvatar = multer({dest: "uploads/avatars/"});
const multerAvatar = multer({
    storage: multerS3({
        s3,
        acl: "public-read",
        bucket: "kimtube/avatar"
    })
});

export const uploadVideo = multerVideo.single("videoFile"); //3.6 chapter
export const uploadAvatar = multerAvatar.single("avatar");

export const localsMiddelware = (req, res, next) => {
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    // res.locals.loggedUser = req.user || null;
    res.locals.loggedUser = req.user || null;
    console.log(req.user);
    next();
};

export const onlyPublic = (req, res, next) => {
    if(req.user){
        res.redirect(routes.home);
    } else{
        next();
    }
};

export const onlyPrivate = (req, res, next) => {
    if(req.user){
        next();
    } else{
        res.redirect(routes.home);
    }
}
