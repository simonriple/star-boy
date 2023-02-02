import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection'

export const STATE = {
    camera: {targetFPS: 60, sizeOption: '640 X 480'},
    flags: {},
    modelConfig: {
        maxFaces: 1,
        refineLandmarks: true,
        triangulateMesh: true,
        boundingBox: true,
    },
    model: faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh
  };

  export const VIDEO_SIZE = {
    '640 X 480': {width: 640, height: 480},
    '640 X 360': {width: 640, height: 360},
    '360 X 270': {width: 360, height: 270}
  };