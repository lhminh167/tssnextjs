import {
  ButtonBase,
  Grid,
  ImageList,
  ImageListItem,
  Theme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import { useState } from "react";
import ImageComponent from "../../shared/image/image.component";
import { h100, w100 } from "../../shared/layout/layout.style";
import { IProduct } from "../../shared/models/product.model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    w100: w100,
    h100: h100,
  })
);

interface Props {
  data?: IProduct;
}

export default function ProductDetailImageComponent({ data }: Props) {
  const classes = useStyles({});
  const state = [data.image, data.image2, data.thumbnail];
  const [choice, setChoice] = useState<number>(0);

  return (
    <Grid container>
      <Grid item xs={12}>
        <ImageComponent imageName={state[choice]} />
      </Grid>
      <Grid container item xs={12}>
        {
          <ImageList cols={3}>
            {state.map((entry, index) => (
              <ImageListItem key={entry}>
                <ButtonBase onClick={() => setChoice(index)}>
                  <ImageComponent
                    imageName={entry}
                    imageStyles={{
                      height: "100px",
                    }}
                  />
                </ButtonBase>
              </ImageListItem>
            ))}
          </ImageList>
        }
      </Grid>
    </Grid>
  );
}
