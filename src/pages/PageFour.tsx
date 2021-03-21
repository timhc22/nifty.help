import React from 'react';
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import {Container, Divider, ListItemText} from "@material-ui/core";
import PageText from "../components/PageText";

export default function PageFour(): JSX.Element {

  return (
    <section className="container">
    <div>
      <Container maxWidth="sm">

        <Typography paragraph className="pageText--heading">
          Get Involved
        </Typography>
        <Typography className="pageText--body">
          Being part of a community is important.
          During this hackathon, I built an SDK for the team over at <a href="https://rarible.com/" target="_blank">Rarible</a>. Check out their docs to learn how to create your first NFT!
        </Typography>
        <br/>
        <Typography className="pageText--body">
          If you are a coder, you can help by contributing to projects like these by making pull requests on Github: <a href="https://github.com/unegma/rarible-sdk" target="_blank">https://github.com/unegma/rarible-sdk</a>.
          <br/>
          <br/>
          Or just forking/downloading the projects and playing around and learning about what everything does. Trust me, we ALL have a lot to learn, and develop. The sky is the limit!
        </Typography>

      <Link to="/faqs" className="pagePagination--link">
        <ListItemText primary="FAQs ->" />
      </Link>
      </Container>
    </div>
  </section>
  );
}
