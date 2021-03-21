import React, { useRef } from "react";
import { useLoader} from "react-three-fiber";
import * as THREE from "three";

export default function Box({url}: any) {
  const [texture]: any = useLoader(THREE.TextureLoader, url);
  const mesh = useRef()

  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}>

      <boxBufferGeometry attach="geometry" args={[1,1,1]} />
      <meshStandardMaterial attach="material" map={texture} transparent={true} />
    </mesh>
  )
}
