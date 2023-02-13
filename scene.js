import * as THREE from 'three'
import { Scene, PerspectiveCamera, WebGLRenderer } from 'three'
import PointCloud from './pointCloud'
import * as quotes from './quotes.json'

export const renderScene = (detector,video) => {
    const scene = new Scene()
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    }
    const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.01, 100)
    const renderer = new WebGLRenderer({
        antialias:true,
        alpha:true
    })

    const quoteElement = document.getElementById('quote')

    const container = document.getElementById( 'container' );
    container.appendChild(renderer.domElement)
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.max(window.devicePixelRatio, 2))

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

    const background = new PointCloud("#b1b1b1")
    scene.add(background.cloud)
    const pointCloud = new PointCloud(undefined,50)
    scene.add(pointCloud.cloud)

    // const gridHelper = new THREE.GridHelper(10, 10)
    // scene.add(gridHelper)
    let quoteIndex = 0;
    console.log(quotes)

    const renderText = (faceIsDetected) => {
        const noText = quoteElement.innerText == ""

        if(faceIsDetected && noText){
            quoteElement.innerText = quotes[quoteIndex]
        }else if(!faceIsDetected && !noText){
            quoteElement.innerText = ""
            quoteIndex = (quoteIndex+1) % quotes.length
        }
    }

    const animate = async () => {
        requestAnimationFrame(animate)
        const facePositions = await detector.detectFace(video)
       
        const faceIsDetected = Boolean(facePositions)
        renderText(faceIsDetected)
        
        pointCloud.lerpToPos(facePositions)
        background.cloud.rotateZ(0.001)
        background.cloud.rotateX(0.0001)
        background.flow()
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