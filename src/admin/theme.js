import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#38A7DE',
    },
    primary: {
      main: '#0D2938',
    },
  },
  props: {
    MuiTab: {
      disableRipple: true,
      color: '#2B2A28',
    },
  },
  overrides: {
    MuiTab: {
      wrapper: {
        flexDirection: 'row',
        justifyContent: 'left',
      },
    },
  },
});
