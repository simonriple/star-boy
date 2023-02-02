import * as THREE from 'three'
import { Scene, PerspectiveCamera, WebGLRenderer } from 'three'
import PointCloud from './pointCloud'

export const renderScene = (detector,video) => {
    const scene = new Scene()
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    }
    const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.01, 100)
    const renderer = new WebGLRenderer()

    document.body.appendChild(renderer.domElement)
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.max(window.devicePixelRatio, 2))
    renderer.setClearColor('#031E2F')

    window.addEventListener('resize', () => {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
    // this.renderer.setClearColor(this.rendererBackGround)

    camera.position.z = 3
    camera.position.y = 1
    camera.lookAt(0, 0, 0)
    // const orbitControlsUpdate = this.threeSetUp.applyOrbitControls()

    const pointCloud = new PointCloud()
    scene.add(pointCloud.cloud)

    // const gridHelper = new THREE.GridHelper(10, 10)
    // scene.add(gridHelper)

    const animate = async () => {
        requestAnimationFrame(animate)
        const facePositions = await detector.detectFace(video)
        // console.log(facePositions)
        pointCloud.lerpToPos(facePositions)
        // if(facePositions){
        // }else {
        //     // pointCloud.lerpToDefault()
        // }
        
        // if (this.webcamCanvas.receivingStreem) this.bindFaceDataToPointCloud()
        // this.webcamCanvas.updateFromWebCam()

        // orbitControlsUpdate()
        renderer.render(scene, camera)
    }

    animate()
}