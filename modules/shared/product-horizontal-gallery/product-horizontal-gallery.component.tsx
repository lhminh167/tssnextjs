import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import {
  adaptV4Theme,
  createTheme,
  Fab,
  Grid,
  ImageList,
  ImageListItem,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import { ElementType, useEffect } from "react";
import { PaginatedList } from "../crud/crud.model";
import GalleryHeaderComponent from "../gallery-header/gallery-header.component";
import theme, { isSmallWidth } from "../layout/layout.theme";
import { IProduct } from "../models/product.model";
import ProductCardComponent from "../product-card/product-card.component";
import { GALLERY, NEXT, PREVIOUS } from "../tag/tag.model";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

export const horizontalGalleryTheme = createTheme(
  adaptV4Theme({
    ...theme,
    overrides: {
      MuiButtonBase: {
        root: {
          "&$disabled": {
            pointerEvents: "unset",
          },
        },
      },
      MuiFab: {
        root: {
          position: "absolute",
          zIndex: theme.zIndex.speedDial,
          backgroundColor: "rgba(0,0,0,.7)",
        },
      },
    },
  })
);

export const usehorizontalGalleryStyles = makeStyles((theme: Theme) =>
  createStyles({
    previous: {
      left: 0,
    },
    next: {
      right: 0,
    },
    container: {
      position: "relative",
    },
    gridList: {
      width: "101%",
      //   marginTop: theme.spacing(3),
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: "translateZ(0)",
    },
    gridListTile: {
      // boxShadow:
      //   '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)'
    },
    last: {
      // paddingRight: '0 !important'
    },
  })
);

interface Props {
  data: PaginatedList<IProduct>;
  output: any;
  title?: any;
  titleIcon?: any;
  seeMore?: any;
  CardElement?: ElementType<{ data: IProduct }>;
  fixedPageSize?: number;
  customTitle?: any;
  galleryTestId?: string;
}

export default function ProductHorizontalGallery({
  data,
  output,
  title,
  titleIcon,
  seeMore,
  CardElement,
  fixedPageSize,
  customTitle,
  galleryTestId,
}: Props) {
  const classes = usehorizontalGalleryStyles({});
  const matches = isSmallWidth();
  const pageSize = fixedPageSize ? fixedPageSize : matches ? 4 : 2;
  const items = data.items.slice(0, pageSize).filter((e) => e);

  useEffect(() => {
    if (pageSize > data.pageSize)
      output({
        pageIndex: 0,
        pageSize,
      });
  }, [pageSize]);

  const toPreviousPage = () => {
    output({
      pageIndex: data.pageIndex - 1,
      pageSize,
    });
  };

  const toNextPage = () => {
    output({
      pageIndex: data.pageIndex + 1,
      pageSize,
    });
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={horizontalGalleryTheme}>
        <Grid container component="article" data-cy={galleryTestId ?? GALLERY}>
          <GalleryHeaderComponent
            title={title}
            titleIcon={titleIcon}
            seeMore={seeMore}
            customTitle={customTitle}
          />
          <Grid
            container
            item
            className={classes.container}
            alignItems="center"
          >
            <Fab
              className={classes.previous}
              onClick={toPreviousPage}
              disabled={data.pageIndex === 0}
              size="medium"
              data-cy={PREVIOUS}
            >
              <ArrowBackIosRoundedIcon />
            </Fab>
            <ImageList
              rowHeight={"auto"}
              cols={pageSize}
              className={classes.gridList}
              component="div"
            >
              {items.map((entry, index) => (
                <ImageListItem
                  component="section"
                  key={entry.productId}
                  classes={{
                    tile: classes.gridListTile,
                    root: index === items.length - 1 ? classes.last : "",
                  }}
                >
                  {CardElement ? (
                    <CardElement data={entry} />
                  ) : (
                    <ProductCardComponent data={entry} />
                  )}
                </ImageListItem>
              ))}
            </ImageList>
            <Fab
              className={classes.next}
              disabled={data.pageIndex >= Math.ceil(data.count / pageSize) - 1}
              onClick={toNextPage}
              size="medium"
              data-cy={NEXT}
            >
              <ArrowForwardIosRoundedIcon />
            </Fab>
          </Grid>
        </Grid>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
