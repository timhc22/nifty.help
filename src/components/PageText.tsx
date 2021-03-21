import Typography from "@material-ui/core/Typography";
import React from "react";

// @ts-ignore
export default function PageText({pageText}) {
  return pageText.map((item: any) => {
    return (
      <div key={item.id}>
        <Typography paragraph className="pageText--heading">
          {item.heading}
        </Typography>
        <Typography className="pageText--body">{item.text}</Typography>
      </div>
    );
  });
}
