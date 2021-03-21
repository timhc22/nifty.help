import React from 'react';
import Typography from "@material-ui/core/Typography";

export default function PageFive(): JSX.Element {

  return (
    <section className="container">
      <div>
        <Typography paragraph className="pageText--heading">
          Questions? Yea me too, plenty!
        </Typography>
        <Typography paragraph>
          <br/>I'll add some faqs on here when the hackathon is over (especially about NFTs and Climate change). <br/>Right now, I have 30 mins to get everything in, so catch you later!
        </Typography>
      </div>
    </section>
  );
}
