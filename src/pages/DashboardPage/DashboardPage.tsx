import { Link } from 'react-router-dom';
import axios from 'axios';
import * as THREE from "three";
import ReactDOM from 'react-dom'
import React, { Suspense, useState, useRef, useEffect, useMemo } from 'react'
import { Canvas, extend, useLoader, useThree, useFrame } from 'react-three-fiber'


function Box({url}: any) {
  const [texture]: any = useLoader(THREE.TextureLoader, url);
  const mesh = useRef()
  const [hover, setHover] = useState(false)

  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
      scale={hover ? [1.2, 1, 1.2] : [1, 1, 1]}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}>

      <boxBufferGeometry attach="geometry" args={[1,1,1]} />
      <meshStandardMaterial attach="material" map={texture} transparent={true} />
    </mesh>

  )
}

export default function DashboardPage(): JSX.Element {
  const [imageUrl, setImageUrl] = useState("");
  const apiURL = "https://gc4fvpbabl.execute-api.eu-west-2.amazonaws.com/live";

  useEffect(() => {
    async function fetchImage() {
      const response = await axios.get(apiURL);
      console.log(response);

      let data = JSON.parse(response.data.Payload);
      let imageUrl = `https://${data.body}.ipfs.dweb.link`;
      setImageUrl(imageUrl);
    }
    fetchImage()
  }, [imageUrl, setImageUrl])

  return (
    <section className="container">
      <div>
        <section className="container">
          <h2>Dashboard</h2>
          <Link to="/" className="button">
            Dashboard
          </Link>
        </section>

        <Canvas camera={{ position: [2,2,2]}}>
          <Suspense fallback={null}>
            <Box url={[imageUrl]}/>
          </Suspense>
          <ambientLight />
        </Canvas>

      </div>
    </section>
  );
}
