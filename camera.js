const { VIDEO_SIZE } = require("./config");

export class Camera {
    constructor() {
      this.video = document.getElementById('video');
    }
  
    /**
     * Initiate a Camera instance and wait for the camera stream to be ready.
     * @param cameraParam From app `STATE.camera`.
     */
    static async setupCamera(cameraParam) {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(
            'Browser API navigator.mediaDevices.getUserMedia not available');
      }
  
      const {targetFPS, sizeOption} = cameraParam;
      const $size = VIDEO_SIZE[sizeOption];
      console.log($size)
      const videoConfig = {
        'audio': false,
        'video': {
          facingMode: 'user',
          // Only setting the video to a specified size for large screen, on
          // mobile devices accept the default size.
          width:  $size.width,
          height:  $size.height,
          frameRate: {
            ideal: targetFPS,
          },
        },
      };
  
      const stream = await navigator.mediaDevices.getUserMedia(videoConfig);
      console.log('Stream active:',stream.active)
  
      const camera = new Camera();
      camera.video.srcObject = stream;
  
      await new Promise((resolve) => {
        camera.video.onloadedmetadata = () => {
          resolve(video);
        };
      });
  
      console.log(camera.video)
      camera.video.play();
      camera.video.hidden = true;
      console.log(camera.video)
  
      const videoWidth = camera.video.videoWidth;
      const videoHeight = camera.video.videoHeight;
      // Must set below two lines, otherwise video element doesn't show.
    //   camera.video.width = videoWidth;
    //   camera.video.height = videoHeight;
  
  
      return camera;
    }
  
    // drawCtx() {
    //   this.ctx.drawImage(
    //       this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);
    // }
  
    // drawResults(faces, triangulateMesh, boundingBox) {
    //   drawResults(this.ctx, faces, triangulateMesh, boundingBox);
    // }
  }