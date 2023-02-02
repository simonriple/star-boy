import { sizeToSquarishShape } from '@tensorflow/tfjs-core/dist/util'
import * as THREE from 'three'
import gsap, { random } from 'gsap'

const cnt = 478
export default class PointCloud {
    
    constructor() {
        const startPosArray = new Float32Array(cnt*3)
        for(let i = 0; i< cnt*3; i++){
            startPosArray[i] = (Math.random() - 0.5)*5
        }
        console.log(startPosArray)
        this.startPosArray = startPosArray
        this.startpoints = new THREE.BufferAttribute(this.startPosArray,3)
        const startBufferGeometry = new THREE.BufferGeometry()
        startBufferGeometry.setAttribute('position',this.startpoints.clone())

        this.bufferGeometry = startBufferGeometry
        this.material = new THREE.PointsMaterial({
            color: "#FFFFFF",
            size: 0.05,
            map: new THREE.TextureLoader().load(
                "https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp2.png"
              ),
            depthWrite:false,
            transparent:true,
            sizeAttenuation: true,
        })
        this.cloud = new THREE.Points(this.bufferGeometry, this.material)
    }

    lerpToPos(positions) {
        const endArray = positions && positions.array && positions?.array?.length>0 ? positions.array : this.startPosArray 
        
        gsap.to(this.bufferGeometry.attributes.position.array, {
            endArray,
            duration: 3,
            ease: 'power2',
            overwrite:true,
            // Make sure to tell it to update if not using the tick function
            onUpdate: () => {
                this.bufferGeometry.attributes.position.needsUpdate = true;
            },
        })
    }
    
    lerpToDefault(){
        gsap.to(this.bufferGeometry.attributes.position.array, {
            endArray: this.startpoints.array,
            duration: 3,
            ease: 'power2',
            // Make sure to tell it to update if not using the tick function
            onUpdate: () => {
                this.bufferGeometry.attributes.position.needsUpdate = true;
            //   camera.lookAt(particles.position);
            //   renderer.render(scene, camera);
            },
        })
    }
}
