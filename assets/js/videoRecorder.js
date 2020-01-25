const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;

const handleVideoData = (event) => {
    console.log(event);
}

const startRecording = () => {
    // console.log(streamObject);
    const videoRecorder = new MediaRecorder(streamObject);
    videoRecorder.start();
    // console.log(videoRecorder);
    videoRecorder.addEventListener("dataavailable", handleVideoData);
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
        recordBtn.removeEventListener("click", getVideo);
    }
}

function init(){
    recordBtn.addEventListener("click", getVideo);
    // recordBtn.onclick = getVideo; //오직 하나의 이벤트만 가능, = null은 모든 걸 상쇄시킴
}

if(recorderContainer){
    init();
}