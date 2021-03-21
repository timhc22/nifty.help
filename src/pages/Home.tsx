import React from 'react';
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import {ListItemText} from "@material-ui/core";


export default function Home(): JSX.Element {

  return (
    <section className="container">
      <div>
        <Typography className="homeText">
          WTFlip is an NFT?
        </Typography>
        <Link to="/what-are-nfts" className="enterButton">
          <ListItemText primary="enter!" />
        </Link>
      </div>
    </section>
  );
}
