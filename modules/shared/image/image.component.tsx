import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import { Fragment } from "react";
import { getImageUrl } from "../helpers/http.helper";
import { w100 } from "../layout/layout.style";
import { IMAGE } from "../tag/tag.model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      ...w100,
      objectFit: "cover",
      "@media only percy": {
        content:
          'url("https://res.cloudinary.com/lhminh167/image/upload/f_auto,w_auto,c_scale,q_auto,dpr_auto/tss/liberian-elephant-thumbnail")',
      },
    },
  })
);

export interface ImageComponentProps {
  cloudName?: string;
  imageStyles?: object;
  imageName?: string;
  imageUrl?: string;
}

export default function ImageComponent({
  cloudName,
  imageName,
  imageStyles,
  imageUrl,
}: ImageComponentProps) {
  const classes = useStyles(imageStyles);

  const url = getImageUrl(imageName, imageUrl, cloudName);

  const image = (
    <img
      src={url}
      className={classes.image}
      alt={imageName}
      style={imageStyles}
      data-cy={IMAGE}
      loading="lazy"
    />
  );

  return (
    <Fragment>
      <noscript>{image}</noscript>
      {image}
    </Fragment>
  );
}
