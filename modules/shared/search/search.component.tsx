import InputAdornment from '@material-ui/core/InputAdornment';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import throttle from "lodash/throttle";
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import productFilterSlice from '../../product/filter/product-filter.slice';
import { IRootState } from '../../root/root.model';
import theme from '../layout/layout.theme';
import { useRouter } from 'next/router';
import { defaultProductSearchRequest } from '../../product/filter/product-filter.model';
import ClearIcon from '@material-ui/icons/Clear';
import { IconButton } from '@material-ui/core';

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
        MuiIconButton: {
            root: {
                opacity: 0.5
            }
        }
    },
});

interface IProps {
    className: string;
    fullWidth: boolean;
}

export default function SearchComponent({
    className,
    fullWidth
}: IProps) {
    const router = useRouter();
    const dispatch = useDispatch();
    const keyword = useSelector<IRootState, string>(
        state => state.productFilter.choice.keyword
    );
    const [state, setState] = useState(keyword);
    const doThrottle = useCallback(
        throttle((q: any) => changeKeyword(q), 1000)
        , []);
    const changeKeyword = (input: string) => {
        dispatch(productFilterSlice.actions.changeKeyword(
            input
        ));
    };

    const change = (e) => {
        setState(e.target.value);
        doThrottle(e.target.value);
    };

    const submit = (e) => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        router.push({
            pathname: '/',
            query: {
                ...defaultProductSearchRequest,
                keyword
            }
        });
    };

    const clear = () => {
        setState('');
        doThrottle('e.target.value');
    };

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
                    endAdornment: state ? (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={clear}
                                size="small"
                            >
                                <ClearIcon
                                />
                            </IconButton>
                        </InputAdornment>
                    ) : null,
                }}
                variant="outlined"
                margin="dense"
                fullWidth={fullWidth}
                className={className}
                onChange={change}
                value={state}
                onKeyPress={submit}
                placeholder='Search for products...'
            />
        </ThemeProvider>
    );
}
