import { ButtonBase, createStyles, Grid, GridList, GridListTile, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { IProduct } from '../../shared/models/product.model';
import { w100, h100 } from '../../shared/layout/layout.style';
import ImageComponent from '../../shared/image/image.component';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        w100: w100,
        h100: h100
    }),
);

interface Props {
    data?: IProduct;
}

export default function ProductDetailImageComponent({
    data
}: Props) {
    const classes = useStyles({});
    const state = [
        data.image,
        data.image2,
        data.thumbnail
    ];
    const [choice, setChoice] = useState<number>(0);

    return (
        <Grid
            container
        >
            <Grid
                item
                xs={12}
            >
                <ImageComponent
                    imageName={state[choice]}


                />
            </Grid>
            <Grid
                container
                item
                xs={12}
            >
                {
                    <GridList
                        cols={3}
                    >
                        {state.map((entry, index) => (
                            <GridListTile
                                key={entry}
                            >
                                <ButtonBase
                                    onClick={() => setChoice(index)}
                                >
                                    <ImageComponent
                                        imageName={entry}
                                        imageStyles={{
                                            height: '100px'
                                        }}
                                    />
                                </ButtonBase>
                            </GridListTile>
                        ))}
                    </GridList>
                }
            </Grid>
        </Grid>
    );
}
