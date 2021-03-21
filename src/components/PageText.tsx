import Typography from "@material-ui/core/Typography";
import React from "react";

// @ts-ignore
export default function PageText({pageText}) {
  return pageText.map((item: any) => {
    return (
      <div key={item.id}>
        <Typography paragraph>
          {item.heading}
        </Typography>
        <Typography>{item.text}</Typography>
      </div>
    );
  });
}
