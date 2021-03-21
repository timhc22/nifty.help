import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { Suspense, useState, useEffect } from 'react'
import { Canvas } from 'react-three-fiber'
import BoxItem from "../../components/BoxItem";

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
            <BoxItem url={[imageUrl]}/>
          </Suspense>
          <ambientLight />
        </Canvas>

      </div>
    </section>
  );
}
