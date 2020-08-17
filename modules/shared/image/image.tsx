import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { Fragment } from 'react';
import LazyLoad from 'react-lazyload';
import { w100 } from '../layout/layout.style';
import { getImageUrl } from '../helpers/http.helper';

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
  const image = (
    <img
      src={getImageUrl(imageName, imageUrl, cloudName)}
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
