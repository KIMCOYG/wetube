// import {videos} from "../db"
import routes from "../routes"
import Video from "../models/Video";

export const home = async(req, res) => { //async, awiat 같이 씀 작업이 끝날 때까지 js가 잠시 기다리게 함
    try{
        const videos = await Video.find({}); //await 끝나기 전까지 밑 부분 실행 안함
        res.render("home", {pageTitle: "Home", videos});
    } catch(error){
        console.log(error);
        res.render("home", {pageTitle: "Home", videos: []});
    }
}; //두 번째 arg는 template에 추가할 정보가 담긴 객체
export const search = (req, res) => {
    const {
        query: {term: searchingBy}
    } = req;
    res.render("search", {pageTitle: "Search", searchingBy, videos});
}
export const getUpload = (req, res) => 
    res.render("upload", {pageTitle: "Upload"});
export const postUpload = async(req, res) => {
    const { 
        body: {file, title, description},
        file: {path}
    } = req;

    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description
    });
    console.log(newVideo);
    // To Do: Upload and save video
    res.redirect(routes.videoDetail(newVideo.id)); //이 부분이 이해안됨
}

export const videoDetail = (req, res) => res.render("videoDetail", {pageTitle: "Video Detail"});
export const editVideo = (req, res) => res.render("editVideo", {pageTitle: "Edit Video"});
export const deleteVideo = (req, res) => res.render("deleteVideo", {pageTitle: "Delete Video"});