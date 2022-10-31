import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { adaptV4Theme, IconButton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import {
  createTheme,
  StyledEngineProvider,
  Theme,
  ThemeProvider,
} from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IProductSearchRequest,
  productUrl,
} from "../../product/filter/product-filter.model";
import productFilterSlice from "../../product/filter/product-filter.slice";
import { IRootState } from "../../root/root.model";
import { goTo } from "../helpers/auth.helper";
import theme from "../layout/layout.theme";
import { CLEAR, SEARCH_BOX } from "../tag/tag.model";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const searchTheme = createTheme(
  adaptV4Theme({
    ...theme,
    overrides: {
      MuiOutlinedInput: {
        notchedOutline: {
          border: "none",
        },
        root: {
          background: "#fce4ec",
        },
      },
      MuiIconButton: {
        root: {
          opacity: 0.5,
        },
      },
    },
  })
);

interface IProps {
  className: string;
  fullWidth: boolean;
}

export default function SearchComponent({ className, fullWidth }: IProps) {
  const dispatch = useDispatch();
  const choice = useSelector<IRootState, IProductSearchRequest>(
    (state) => state.productFilter.choice
  );
  const [state, setState] = useState<string>(choice.keyword);
  let typingTimeout: NodeJS.Timeout = null;

  const change = (e) => {
    if (typingTimeout) clearTimeout(typingTimeout);
    setState(e.target.value);
    typingTimeout = setTimeout(() => {
      changeKeyword(e.target.value);
    }, 1000);
  };

  const submit = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    changeKeyword(state);
    goTo(productUrl.search({ ...choice, keyword: state }), "", "");
  };

  const clear = () => {
    setState("");
    changeKeyword("");
  };

  function changeKeyword(input: string) {
    dispatch(productFilterSlice.actions.changeKeyword(input));
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={searchTheme}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
            endAdornment: state ? (
              <InputAdornment position="end">
                <IconButton onClick={clear} size="small" data-cy={CLEAR}>
                  <ClearIcon />
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
          placeholder="Search for products..."
          data-cy={SEARCH_BOX}
        />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
