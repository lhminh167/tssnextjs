import React, { Fragment } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import LazyLoad from 'react-lazyload';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        image: (props: Props) => ({ ...props.imageStyles })
    }),
);

interface Props {
    cloudName?: string;
    imageStyles?: object;
    imageName: string;
}

function Image(props: Props) {
    const { cloudName, imageName } = props;
    const classes = useStyles(props);

    return (
        <Fragment>
            <LazyLoad height={200} once>
                <img

                    src={
                        "https://res.cloudinary.com/" +
                        (cloudName ? cloudName : "lhminh167") +
                        "/image/upload/f_auto,w_auto,c_scale,q_auto,dpr_auto/tss/" +
                        (imageName ? imageName.replace(/\.[^/.]+$/, ""): "placeholder")
                    }

                    className={"cld-responsive" + classes.image}
                />
            </LazyLoad>

        </Fragment>
    );
}

export default Image;
