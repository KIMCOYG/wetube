export const home = (req, res) => res.render("home", {pageTitle: "Home"}); //두 번째 arg는 template에 추가할 정보가 담긴 객체
export const search = (req, res) => res.render("search", {pageTitle: "Search"});
export const upload = (req, res) => res.render("upload", {pageTitle: "Upload"});
export const videoDetail = (req, res) => res.render("videoDetail", {pageTitle: "Video Detail"});
export const editVideo = (req, res) => res.render("editVideo", {pageTitle: "Edit Video"});
export const deleteVideo = (req, res) => res.render("deleteVideo", {pageTitle: "Delete Video"});