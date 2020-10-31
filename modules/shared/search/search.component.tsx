import { IconButton } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IProductSearchRequest, productUrl } from '../../product/filter/product-filter.model';
import productFilterSlice from '../../product/filter/product-filter.slice';
import { IRootState } from '../../root/root.model';
import theme from '../layout/layout.theme';
import { CLEAR, SEARCH_BOX } from '../tag/tag.model';
import { goTo } from '../helpers/auth.helper';

const searchTheme = createMuiTheme({
    ...theme,
    overrides: {
        MuiOutlinedInput: {
            notchedOutline: {
                border: 'none',
            },
            root: {
                background: '#fce4ec'
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
    const dispatch = useDispatch();
    const choice = useSelector<IRootState, IProductSearchRequest>(
        state => state.productFilter.choice
    );
    const [state, setState] = useState<string>(choice.keyword);
    let typingTimeout = null;

    const change = (e) => {
        if (typingTimeout) clearTimeout(typingTimeout);
        setState(e.target.value);
        typingTimeout = setTimeout(() => {
            changeKeyword(e.target.value);
        }, 1000);
    };

    const submit = (e) => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        changeKeyword(state);
        goTo(productUrl.search({ ...choice, keyword: state }));
    };

    const clear = () => {
        setState('');
        changeKeyword('');
    };

    function changeKeyword(input: string) {
        dispatch(productFilterSlice.actions.changeKeyword(input));
    }

    return (
        <ThemeProvider theme={searchTheme}>
            <TextField
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <SearchIcon
                                color='primary'
                            />
                        </InputAdornment>
                    ),
                    endAdornment: state ? (
                        <InputAdornment position='end'>
                            <IconButton
                                onClick={clear}
                                size='small'
                                data-cy={CLEAR}
                            >
                                <ClearIcon
                                />
                            </IconButton>
                        </InputAdornment>
                    ) : null,
                }}
                variant='outlined'
                margin='dense'
                fullWidth={fullWidth}
                className={className}
                onChange={change}
                value={state}
                onKeyPress={submit}
                placeholder='Search for products...'
                data-cy={SEARCH_BOX}
            />
        </ThemeProvider>
    );
}
