import { createMuiTheme, Theme } from '@material-ui/core/styles';
import withStyles from '@material-ui/styles/withStyles';

/**
 * The minimum screen width required to render desktop layout. Below this limit, the mobile layout is rendered.
 */
export const transitionWidth = 'md';

export const themeColor = {
    primary: '#F62F5E',
    secondaryGrey: '#e0e0e0',
    lightGrey: '#EFEFEF',
    secondary: '#1976d2',
    white: 'white',
    black: 'black'
};

export const boxShadow: string = '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)';

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
                backgroundColor: themeColor.white
            }
        },
        MuiLink: {
            root: {
                textDecoration: 'none'
            }
        },
        MuiTooltip: {
            tooltip: {
                backgroundColor: themeColor.white,
                color: themeColor.black,
                boxShadow: boxShadow
            }
        }
    }
});

export const GlobalCss = withStyles({
    // @global is handled by jss-plugin-global.
    '@global': {
        // You should target [class*='MuiButton-root'] instead if you nest themes.
        a: {
            textDecoration: 'none',
        },
    },
})(() => null);

export default theme;