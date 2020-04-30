import { createMuiTheme, Theme } from "@material-ui/core/styles";
import withStyles from "@material-ui/styles/withStyles";

/**
 * The minimum screen width required to render desktop layout. Below this limit, the mobile layout is rendered.
 */
export const transitionWidth = 'md';

export const themeColor = {
    primary: "#F62F5E",
    secondaryGrey: "#e0e0e0",
    lightGrey: '#EFEFEF',
    secondary: "#1976d2",
    white: 'white'
};

const theme: Theme = createMuiTheme({
    palette: {
        primary: {
            main: themeColor.primary
        },
        secondary: {
            main: themeColor.secondary
        }
    },
    overrides: {
        MuiAppBar: {
            colorDefault: {
                backgroundColor: "white"
            }
        },
        MuiLink: {
            root: {
                textDecoration: 'none'
            }
        }
    }
});

export const GlobalCss = withStyles({
    // @global is handled by jss-plugin-global.
    '@global': {
        // You should target [class*="MuiButton-root"] instead if you nest themes.
        a: {
            textDecoration: 'none',
        },
    },
})(() => null);

export default theme;