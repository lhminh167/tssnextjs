import { createMuiTheme, Theme } from "@material-ui/core/styles";
import { colors } from "@material-ui/core";

/**
 * The minimum screen width required to render desktop layout. Below this limit, the mobile layout is rendered.
 */
export const transitionWidth = 'sm';

export const themeColor = {
    primary: "#F62F5E",
    secondaryGrey: "#e0e0e0"
};

const theme: Theme = createMuiTheme({
    palette: {
        primary: {
            main: themeColor.primary
        }
    },
    overrides: {
        MuiTypography: {
            root: {
                textDecoration: 'none'
            }
        },
        MuiAppBar: {
            colorDefault: {
                backgroundColor: "white"
            }
        }
    }
});

export default theme;
