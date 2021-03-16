import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../theme';
import UrRow from 'admin/components/UrRow';
import { AppBar, Box, Tabs, Tab, ThemeProvider, Grid, Typography } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  ltab: {
    justifyContent: 'center',
    borderRight: '1px solid rgba(43, 42, 40, 0.4)',
  },
  headingRow: {
    fontFamily: 'Sansation',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    color: '#2B2A28',
    paddingTop: '24px',
    paddingBottom: '14px',
    borderTop: '1px solid rgba(65, 64, 66, 0.2)',
    fontWeight: 'bold',
  },
  filesBox: {
    overflowY: 'scroll',
    height: '78vh',
  },
}));

export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar position="static" color="transparent" elevation={0}>
          <Tabs centered={true} variant="fullWidth" value={value} onChange={handleChange}>
            <LinkTab label="All" href="/all" {...a11yProps(0)} className={classes.ltab} />
            <LinkTab label="Tutorial" href="/tutorial" {...a11yProps(1)} className={classes.ltab} />
            <LinkTab label="Books" href="/books" {...a11yProps(2)} className={classes.ltab} />
            <LinkTab label="Notes" href="/notes" {...a11yProps(3)} className={classes.ltab} />
            <LinkTab label="Examination Papers" href="/papers" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} className={classes.filesBox} dir={theme.direction}>
            <Grid container>
              {/*Headings*/}
              <Grid item xs={8} className={classes.headingRow} style={{ textAlign: 'left' }}>
                Name
              </Grid>
              <Grid item xs={2} className={classes.headingRow}>
                Upload
              </Grid>
              <Grid item xs={2} className={classes.headingRow}>
                Reject
              </Grid>
            </Grid>
            <UrRow name="Tutorial 1" />
            <UrRow name="Tutorial 2" />
            <UrRow name="Tutorial 5" />
            <UrRow name="Tutorial 8" />
            <UrRow name="Tutorial 9" />
            <UrRow name="Tutorial 8" />
            <UrRow name="Tutorial 4" />
            <UrRow name="Tutorial 6" />
            <UrRow name="Tutorial 3" />
            <UrRow name="Tutorial 11" />
            <UrRow name="Tutorial 13" />
            <UrRow name="Tutorial 1" />
            <UrRow name="RD Sharma PDF" />
            <UrRow name="RK Sharma PDF" />
            <UrRow name="RK Jain PDF" />
            <UrRow name="Manas Chanda" />
            <UrRow name="RD Sharma PDF" />
            <UrRow name="Chapter 5 Notes" />
            <UrRow name="Vector Notes" />
            <UrRow name="Polynomial Notes" />
            <UrRow name="3D Geometry Notes" />
            <UrRow name="ETE 2019" />
            <UrRow name="MTE 2017" />
            <UrRow name="ETE 2016" />
            <UrRow name="MTE 2020" />
            <UrRow name="MTE 2017" />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction} className={classes.filesBox}>
            <Grid container>
              {/*Headings*/}
              <Grid item xs={8} className={classes.headingRow} style={{ textAlign: 'left' }}>
                Name
              </Grid>
              <Grid item xs={2} className={classes.headingRow}>
                Upload
              </Grid>
              <Grid item xs={2} className={classes.headingRow}>
                Reject
              </Grid>
            </Grid>
            <UrRow name="Tutorial 1" />
            <UrRow name="Tutorial 2" />
            <UrRow name="Tutorial 5" />
            <UrRow name="Tutorial 8" />
            <UrRow name="Tutorial 9" />
            <UrRow name="Tutorial 8" />
            <UrRow name="Tutorial 4" />
            <UrRow name="Tutorial 6" />
            <UrRow name="Tutorial 3" />
            <UrRow name="Tutorial 11" />
            <UrRow name="Tutorial 13" />
            <UrRow name="Tutorial 1" />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction} className={classes.filesBox}>
            <Grid container>
              {/*Headings*/}
              <Grid item xs={8} className={classes.headingRow} style={{ textAlign: 'left' }}>
                Name
              </Grid>
              <Grid item xs={2} className={classes.headingRow}>
                Upload
              </Grid>
              <Grid item xs={2} className={classes.headingRow}>
                Reject
              </Grid>
            </Grid>
            <UrRow name="RD Sharma PDF" />
            <UrRow name="RK Sharma PDF" />
            <UrRow name="RK Jain PDF" />
            <UrRow name="Manas Chanda" />
            <UrRow name="RD Sharma PDF" />
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction} className={classes.filesBox}>
            <Grid container>
              {/*Headings*/}
              <Grid item xs={8} className={classes.headingRow} style={{ textAlign: 'left' }}>
                Name
              </Grid>
              <Grid item xs={2} className={classes.headingRow}>
                Upload
              </Grid>
              <Grid item xs={2} className={classes.headingRow}>
                Reject
              </Grid>
            </Grid>
            <UrRow name="Chapter 5 Notes" />
            <UrRow name="Vector Notes" />
            <UrRow name="Polynomial Notes" />
            <UrRow name="3D Geometry Notes" />
          </TabPanel>
          <TabPanel value={value} index={4} dir={theme.direction} className={classes.filesBox}>
            <Grid container>
              {/*Headings*/}
              <Grid item xs={8} className={classes.headingRow} style={{ textAlign: 'left' }}>
                Name
              </Grid>
              <Grid item xs={2} className={classes.headingRow}>
                Upload
              </Grid>
              <Grid item xs={2} className={classes.headingRow}>
                Reject
              </Grid>
            </Grid>
            <UrRow name="ETE 2019" />
            <UrRow name="MTE 2017" />
            <UrRow name="ETE 2016" />
            <UrRow name="MTE 2020" />
            <UrRow name="MTE 2017" />
          </TabPanel>
        </SwipeableViews>
      </ThemeProvider>
    </div>
  );
}
