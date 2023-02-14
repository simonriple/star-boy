const { STATE } = require("./config");
import * as faceMesh from '@mediapipe/face_mesh'
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection'
import {flattenFacialLandMarkArray, createBufferAttribute} from './util'

export class FaceDetector {

    constructor() {
        this.detector = null
    }
    
    async setupFaceDetector(){
        this.detector = await faceLandmarksDetection.createDetector(STATE.model, {
            runtime: 'mediapipe',
            refineLandmarks: STATE.modelConfig.refineLandmarks,
            maxFaces: STATE.modelConfig.maxFaces,
            solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@${
                faceMesh.VERSION}`
            });
        
        return this.detector
    }

    async detectFace(video){
        if (!this.detector){
            throw new Error('call setupFaceDetector method first on this class before calling this')
        }
        const data = await this.detector.estimateFaces(video,{flipHorizontal: true})
        //TODO use all registered faces
        console.log(data.length)
        const keypoints = data?.[0]?.keypoints
        if (keypoints) {
            const flatData = flattenFacialLandMarkArray(keypoints)
            const facePositions = createBufferAttribute(flatData)
            return facePositions
        }
        return undefined
    }
}