import React, { Fragment } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import lazySizes from 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

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
            <img

                data-src={
                    "https://res.cloudinary.com/" +
                    (cloudName ? cloudName : "lhminh167") +
                    "/image/upload/f_auto,w_auto,c_scale,q_auto,dpr_auto/tss/" +
                    imageName.replace(/\.[^/.]+$/, "")
                }

                className={"lazyload cld-responsive" + classes.image}

                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"

            />
        </Fragment>
    );
}

export default Image;
