import { useMediaQuery } from '@material-ui/core';
import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { CreateCSSProperties } from '@material-ui/core/styles/withStyles';
import { ADDRESS_1, ADDRESS_2, CITY, COUNT, COUNTRY, DATETIME, DAY_PHONE, DESCRIPTION, DISCOUNTED_PRICE, EMAIL, EVE_PHONE, ID, MOB_PHONE, NAME, POSTALCODE, PRICE, REGION, ROLE, STATUS, USER } from '../tag/tag.model';

/**
 * The minimum screen width required to render desktop layout. Below this limit, the mobile layout is rendered.
 */
export const transitionWidth = 'md';

export function isMediumWidth() {
    return matchScreenWidth(transitionWidth);
}

export function isSmallWidth() {
    return matchScreenWidth('sm');
}

export function matchScreenWidth(width: Breakpoint | number): boolean {
    return useMediaQuery(theme.breakpoints.up(width));
}

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
        MuiCssBaseline: {
            '@global': {
                a: {
                    textDecoration: 'none',
                },
                [`${percyText([
                    DESCRIPTION, NAME, ROLE, EMAIL, ADDRESS_1, ADDRESS_2,
                    COUNTRY, REGION, MOB_PHONE, EVE_PHONE, DAY_PHONE, CITY, POSTALCODE
                ])}`]: percyReplace(),
                [`${percyText([DATETIME])}`]: percyReplace('Sun, Oct 18, 2020, 10:28 AM'),
                [`[data-cy="${ID}"], ${percyText([COUNT])}, [data-cy="${USER}"]`]: percyReplace('1'),
                [`${percyText([PRICE, DISCOUNTED_PRICE])}`]: percyReplace('US $16.99')
            },
        },
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
        },
    }
});

function percyText(tags: string[]) {
    const result = tags.map(e => `[class*="MuiTypography-root"][data-cy*="${e}" i]`).join(', ');

    return result;
}

function percyReplace(text: string = 'Lorem Ipsum'): any {
    const result: CreateCSSProperties<{}> = {
        '@media only percy': {
            fontSize: '0',
            lineHeight: '0',
            '&::after': {
                content: `'${text}'`,
                fontSize: 'initial',
                lineHeight: 'initial',
            }
        }
    };
    return result;
}

export default theme;