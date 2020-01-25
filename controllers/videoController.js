// import {videos} from "../db"
import routes from "../routes";
import Video from "../models/Video";

export const home = async(req, res) => { //async, awiat 같이 씀 작업이 끝날 때까지 js가 잠시 기다리게 함
    try{
        const videos = await Video.find({}).sort({_id: -1}); //await 끝나기 전까지 밑 부분 실행 안함
        res.render("home", {pageTitle: "Home", videos});
    } catch(error){
        // console.log(error);
        res.render("home", {pageTitle: "Home", videos: []});
    }
}; //두 번째 arg는 template에 추가할 정보가 담긴 객체

export const search = async(req, res) => {
    const {
        query: {term: searchingBy}
    } = req;
    let videos = [];

    try{
        videos = await Video.find({
            title: {$regex: searchingBy, $options: "i"} //i 의미: 대소문자 구분안함
        });
    } catch(error){
        // console.log(error);
    }
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
        description,
        creator: req.user.id //req 안에 user!!
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    // console.log(newVideo);
    res.redirect(routes.videoDetail(newVideo.id)); //이 부분이 이해안됨
}

export const videoDetail = async(req, res) => { //이해안됨
    const {
        params: {id}
    } = req;
    
    try{
        const video = await Video.findById(id).populate("creator"); //populate is only object
        // console.log(video);
        res.render("videoDetail", {pageTitle: video.title, video});
    } catch(error){
        // console.log(error);
        res.redirect(routes.home);
    }
}

export const getEditVideo = async(req, res) => {
    const {
        params: {id}
    } = req;

    try{
        const video = await Video.findById(id);
        if(video.creator !== req.user.id){
            throw Error();
        } else{
            res.render("editVideo", {pageTitle: `Edit ${video.title}`, video});
        }
    } catch(error){ 
        res.redirect(routes.home);
    }
}

export const postEditVideo = async(req, res) => {
    const {
        params: {id},
        body: {title, description}
    } = req;
    
    try{
        await Video.findOneAndUpdate({_id: id}, {title, description});
        res.redirect(routes.videoDetail(id));
    } catch(error){
        res.redirect(routes.home); //middleware를 통해 error 발생 시 try catch를 실행 가능
    }
};

export const deleteVideo = async(req, res) => {
    const {
        params: {id}
    } = req;

    try{
        const video = await Video.findById(id);
        if(video.creator !== req.user.id){
            throw Error();
        } else{
            await Video.findOneAndRemove({_id: id});
        }
    } catch(error){
        console.log(error);
    }
    res.redirect(routes.home);
};