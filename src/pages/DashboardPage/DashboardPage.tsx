import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function DashboardPage(): JSX.Element {

  const [image, setImage] = useState(null);
  const apiURL = "https://gc4fvpbabl.execute-api.eu-west-2.amazonaws.com/live";

  const fetchData = async () => {
    const response = await axios.get(apiURL);
    console.log(response);

    let data = JSON.parse(response.data.Payload);
    setImage(data.body);
  }

  return (
    <section className="container">
      <div>
        <section className="container">
          <h2>Dashboard</h2>
          <Link to="/" className="button">
            Dashboard
          </Link>
        </section>

        <button className="fetch-button" onClick={fetchData}>
          Fetch Data
        </button>


        Image: {image}

      </div>
    </section>
  );
}
