import InputAdornment from '@material-ui/core/InputAdornment';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import theme from '../layout/layout.theme';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

const searchTheme = createMuiTheme({
    ...theme,
    overrides: {
        MuiOutlinedInput: {
            notchedOutline: {
                border: 'none',
            },
            root: {
                background: "#fce4ec"
            }
        },
    },
});

interface IProps {
    className: string;
    fullWidth: boolean;
}

function SearchComponent(props: IProps) {
    const { className, fullWidth } = props;

    return (
        <ThemeProvider theme={searchTheme}>

            <TextField
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon
                                color="primary"
                            />
                        </InputAdornment>
                    ),
                }}
                variant="outlined"
                margin="dense"
                fullWidth={fullWidth}
                className={className}
            />
        </ThemeProvider>

    );
}

export default SearchComponent;