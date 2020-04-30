import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { Fragment } from "react";
import LazyLoad from "react-lazyload";
import { w100 } from "../layout/layout.style";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      ...w100,
      objectFit: 'cover'
    }
  })
);

interface Props {
  cloudName?: string;
  imageStyles?: object;
  imageName?: string;
  imageUrl?: string;
}

export default function Image({ cloudName, imageName, imageStyles, imageUrl }: Props) {
  const classes = useStyles(imageStyles);
  const src =
    imageUrl ??
    "https://res.cloudinary.com/" +
    (cloudName ? cloudName : "lhminh167") +
    "/image/upload/f_auto,w_auto,c_scale,q_auto,dpr_auto/tss/" +
    (imageName ? imageName.replace(/\.[^/.]+$/, "") : "placeholder");

  const image = (
    <img
      src={src}
      className={classes.image}
      alt={imageName}
      style={imageStyles}
    />
  );

  return (
    <Fragment>
      <noscript>
        {image}
      </noscript>
      <LazyLoad height={200} once>
        {image}
      </LazyLoad>
    </Fragment>
  );
}
