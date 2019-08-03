import { createMuiTheme } from "@material-ui/core/styles";

export const primary = {
    main: "#FFFFFF",
    contrastText: "#F62F5E"
}

export const secondary = {
    main: "#FFFFFF",
    contrastText: "#2196f3"
}

export const uncheckedColor = 'rgba(0, 0, 0, 0.54)';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        primary,
        secondary,
        error: {
            main: '#ef5350'
        },
        background: {
            default: "#F7F7F7"
        }
    },
    overrides: {
        MuiExpansionPanelSummary: {
            root: {
                background: "#FAFAFA"
            }
        },
        MuiExpansionPanelDetails: {
            root: {
                padding: "20px 24px 24px"
            }
        },
        MuiButton: {
            containedPrimary: {
                color: primary.main,
                backgroundColor: primary.contrastText
            },
            containedSecondary: {
                color: secondary.main,
                backgroundColor: secondary.contrastText
            },
            textPrimary: {
                color: primary.contrastText,
                backgroundColor: primary.main
            },
            textSecondary: {
                color: secondary.contrastText,
                backgroundColor: secondary.main
            }

        },
        MuiCircularProgress: {
            colorPrimary: {
                color: primary.contrastText,
            },
            colorSecondary: {
                color: secondary.contrastText,
            }
        },
        MuiCheckbox: {
            root: {
                color: uncheckedColor,
                "&$checked": {
                    color: primary.contrastText,
                }
            },
            colorPrimary: {
                color: uncheckedColor,
                "&$checked": {
                    color: primary.contrastText,
                }
            },
            colorSecondary: {
                color: uncheckedColor,
                "&$checked": {
                    color: secondary.contrastText,
                }
            },
        },
        MuiFab: {
            primary: {
                color: primary.main,
                backgroundColor: primary.contrastText
            },
            secondary: {
                color: secondary.main,
                backgroundColor: secondary.contrastText
            },
        }
    }
});

export default theme;
