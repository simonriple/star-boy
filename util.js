import * as THREE from 'three'

const videoAspectRatio = 1280 / 720
const screenRange = getScreenRanges(videoAspectRatio, 4)

export function flattenFacialLandMarkArray(data) {
    let array = []

    data.forEach((el) => {
        el.x = mapRangetoRange(500 / videoAspectRatio, el.x, screenRange.height) - 1
        el.y = mapRangetoRange(500 / videoAspectRatio, el.y, screenRange.height, true) + 1
        el.z = (el.z / 100) * -1 + 0.5

        array = [...array, ...Object.values(el)]
    })

    return array.filter((el) => typeof el === 'number')
}
export function mapRangetoRange(from, point, range, invert = false) {
    let pointMagnitude = point / from
    if (invert) pointMagnitude = 1 - pointMagnitude
    const targetMagnitude = range.to - range.from
    const pointInRange = targetMagnitude * pointMagnitude + range.from

    return pointInRange
}
export function getScreenRanges(aspectRatio, width) {
    const screenHeight = width / aspectRatio

    const widthStart = 0 - width / 2
    const widthEnd = widthStart + width

    const heihgtStart = 0 - screenHeight / 2
    const heihgtEnd = heihgtStart + screenHeight

    return {
        height: { from: heihgtStart, to: heihgtEnd },
        width: { from: widthStart, to: widthEnd },
    }
}
export function createBufferAttribute(data){
    const positionArray = new Float32Array(data)
    const positionAttribute = new THREE.BufferAttribute(positionArray, 3)
    return positionAttribute
}