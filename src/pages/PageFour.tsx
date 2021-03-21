import React from 'react';
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import {ListItemText} from "@material-ui/core";

export default function PageFour(): JSX.Element {

  return (
    <section className="container">
      <div>
        <Typography paragraph>
          Hi2
        </Typography>
        <Link to="/faqs" className="pagePagination--link">
          <ListItemText primary="FAQs ->" />
        </Link>
      </div>
    </section>
  );
}
