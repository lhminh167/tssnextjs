import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import { Theme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { makeStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import BrandComponent from "../brand/brand.component";
import SearchComponent from "../search/search.component";
import SideBarComponent from "../sidebar/sidebar.component";
import { GO_BACK, MENU } from "../tag/tag.model";
// import LazyHydrate from "react-lazy-hydration";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sectionMobile: {
      display: "flex",
    },
    grow: {
      flexGrow: 1,
    },
  })
);

const MobileNavbarComponent = () => {
  const classes = useStyles({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = (isOpen: boolean) => () => {
    setIsSidebarOpen(isOpen);
  };

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <Fragment>
      <AppBar className={classes.sectionMobile} color="default">
        <Toolbar>
          <IconButton
            onClick={() => {
              router.back();
            }}
            color="primary"
            edge="start"
            data-cy={GO_BACK}
            size="large"
          >
            <ArrowBackIcon />
          </IconButton>

          <div className={classes.grow} />

          {!trigger && <BrandComponent className={""} />}

          {trigger && <SearchComponent className={""} fullWidth={true} />}

          <div className={classes.grow} />
          <IconButton
            onClick={toggleSidebar(true)}
            color="primary"
            edge="end"
            data-cy={MENU}
            size="large"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
        {!trigger && (
          <Toolbar>
            <SearchComponent className={""} fullWidth={true} />
          </Toolbar>
        )}
      </AppBar>
      {/* <LazyHydrate whenVisible> */}
      <SideBarComponent open={isSidebarOpen} onClose={toggleSidebar(false)} />
      {/* </LazyHydrate> */}
    </Fragment>
  );
};

export default MobileNavbarComponent;
