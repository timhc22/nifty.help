import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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


        <img src={imageUrl} />

      </div>
    </section>
  );
}
