import { IconButton } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IProductSearchRequest, productUrl } from '../../product/filter/product-filter.model';
import productFilterSlice from '../../product/filter/product-filter.slice';
import { IRootState } from '../../root/root.model';
import theme from '../layout/layout.theme';
import { CLEAR, SEARCH_BOX } from '../tag/tag.model';

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
    const router = useRouter();
    const dispatch = useDispatch();
    const choice = useSelector<IRootState, IProductSearchRequest>(
        state => state.productFilter.choice
    );
    const [state, setState] = useState(choice.keyword);

    const change = (e) => {
        setState(e.target.value);
    };

    const submit = (e) => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        dispatch(productFilterSlice.actions.changeKeyword(
            state
        ));
        router.push({
            pathname: productUrl.product,
            query: {
                ...choice,
                keyword: state
            }
        });
    };

    const clear = () => {
        setState('');
    };

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
