import axios from 'axios';
import React, { Suspense, useState, useEffect } from 'react';
import { Canvas, useThree } from 'react-three-fiber';
import BoxItem from "../../components/BoxItem";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(
    () => {
      const controls = new OrbitControls(camera, gl.domElement);

      controls.minDistance = 1;
      controls.maxDistance = 20;
      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );
  return null;
};

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
          <h2>3D Display</h2>
          {/*<Link to="/" className="button">*/}
          {/*  Dashboard*/}
          {/*</Link>*/}
        </section>

        <Canvas camera={{ position: [0.4,2,1]}}>
          <CameraController />
          <ambientLight />
          <Suspense fallback={null}>
            <BoxItem url={[imageUrl]}/>
          </Suspense>
        </Canvas>

      </div>
    </section>
  );
}
