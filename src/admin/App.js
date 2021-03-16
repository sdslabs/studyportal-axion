import {
  getFileRequests,
  approveFileRequest,
  uploadFile,
  rejectFileRequest,
} from './api/fileRequestApi';
import './App.css';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import panelLogo from 'admin/assets/panelLogo.png';
import labsLogo from 'admin/assets/labsLogo.png';
import VerticalTabs from 'admin/components/leftTab';
import { theme } from './theme';
import { ThemeProvider } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  left: {},
  navbar: {
    background: '#38A7DE',
  },
  panelLogo: {
    float: 'left',
    margin: '0.5% 2%',
  },
  labsLogo: {
    float: 'right',
    margin: '0.5% 2%',
  },
}));

function App() {
  getFileRequests();

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Grid container>
          <Grid item md={12} className={classes.navbar}>
            <img src={panelLogo} className={classes.panelLogo}></img>
            <img src={labsLogo} className={classes.labsLogo}></img>
          </Grid>

          <VerticalTabs />
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default App;
