const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let videoRecorder;

const handleVideoData = event => {
    // console.log(event);
    const {data: videoFile} = event;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(videoFile);
    link.download = "recored.webm";
    document.body.appendChild(link);
    link.click();
}

const startRecording = () => {
    // console.log(streamObject);
    videoRecorder = new MediaRecorder(streamObject);
    videoRecorder.start();
    // console.log(videoRecorder);
    videoRecorder.addEventListener("dataavailable", handleVideoData);
    // setTimeout(() => videoRecorder.stop(), 5000);
    recordBtn.addEventListener("click", stopRecording);
};

const stopRecording = () => {
    videoRecorder.stop();
    recordBtn.removeEventListener("click", stopRecording);
    recordBtn.addEventListener("click", getVideo); //stopRecording에서도 getVideo가 실행되나??
    recordBtn.innerHTML = "Start recording"
    streamObject.getVideoTracks()[0].stop();
}

const getVideo = async() => {
    try{
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: {width:1280, height: 720}
        });
        // console.log(stream);
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.play();
        recordBtn.innerHTML = "Stop recording"
        streamObject = stream;
        startRecording();
    } catch(error){
        recordBtn.innerHTML = "Can't record";
    } finally{
        recordBtn.removeEventListener("click", getVideo); //reference
    }
}

function init(){
    recordBtn.addEventListener("click", getVideo);
    // recordBtn.onclick = getVideo; //오직 하나의 이벤트만 가능, = null은 모든 걸 상쇄시킴
}

if(recorderContainer){
    init();
}