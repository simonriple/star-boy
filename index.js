const { Camera } = require("./camera");
const { STATE } = require("./config");
const { FaceDetector } = require("./faceDetector");
const { renderScene} = require("./scene")

const app = async () => {
    const camera = await Camera.setupCamera(STATE.camera)
    const detector = new FaceDetector()
    await detector.setupFaceDetector() 
    renderScene(detector,camera.video)
    // console.log(faces)
}

app()