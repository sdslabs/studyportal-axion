import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Tabs, Tab, Typography, Box } from '@material-ui/core';
import 'App.css';
import UserRequestTab from 'admin/pages/userRequestView';

function TabPanelMain(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-main-tabpanel-${index}`}
      aria-labelledby={`vertical-main-tab-${index}`}
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

TabPanelMain.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function TabPanelUR(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-UR-tabpanel-${index}`}
      aria-labelledby={`vertical-UR-tab-${index}`}
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

TabPanelUR.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function TabPanelUU(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-UU-tabpanel-${index}`}
      aria-labelledby={`vertical-UU-tab-${index}`}
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

TabPanelUU.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-UR-tab-${index}`,
    'aria-controls': `vertical-UR-tabpanel-${index}`,
  };
}

function b11yProps(index) {
  return {
    id: `vertical-main-tab-${index}`,
    'aria-controls': `vertical-main-tabpanel-${index}`,
  };
}

function c11yProps(index) {
  return {
    id: `vertical-UU-tab-${index}`,
    'aria-controls': `vertical-UU-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  overrides: {
    MuiTab: {
      wrapper: {
        flexDirection: 'row',
        justifyContent: 'left',
      },
    },
  },
  root: {
    flexGrow: 1,
    backgroundColor: 'theme.palette.background.paper',
    display: 'flex',
    height: '100%',
  },
  tabs: {
    //overflowY: 'scroll',
    marginLeft: '8%',
    background: '#0D2938',
    fontFamily: 'Droid Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: '19px',
    color: '#ffffff',
    width: '22vw',
    alignItems: 'left',
    height: '39vh',
  },
  mainTab: {
    background: '#0D2938',
    fontFamily: 'Droid Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: '19px',
    color: '#ffffff',
    width: '22vw',
    alignItems: 'left',
  },
  tab: {
    textAlign: 'left',
    width: '400px',
    fontSize: '13px',
    borderBottom: '1px solid rgba(56, 167, 222, 0.15)',
    '&:Active': {
      color: '#38A7DE',
      fontWeight: 'bold',
    },
    '&:Hover': {
      color: '#38A7DE',
      fontWeight: 'bold',
    },
  },
  tabF: {
    active: {
      color: '#38A7DE',
      fontWeight: 'bold',
    },
    paddingLeft: '9%',
    textAlign: 'left',
    fontSize: '16px',
    borderBottom: '1px solid rgba(56, 167, 222, 0.15)',
    '&:Active': {
      color: '#38A7DE',
      fontWeight: 'bold',
    },
    '&:Hover': {
      color: '#38A7DE',
      fontWeight: 'bold',
    },
  },
  selected: {
    color: '#38A7DE',
    fontWeight: 'bold',
  },
  main: {
    width: '75%',
    textAlign: '-webkit-center',
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [valueA, setValueA] = React.useState(0);
  const [valueMain, setValueMain] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeUpl = (event, newValueUpl) => {
    setValueA(newValueUpl);
  };

  const handleChangeMain = (event, newValueMain) => {
    setValueMain(newValueMain);
  };

  console.log(value, valueA, valueMain);

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={valueMain}
        onChange={handleChangeMain}
        className={classes.mainTab}
      >
        <Tab label="User Requests" {...b11yProps(0)} className={classes.tabF}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            scrollButtons="off"
            value={value}
            onChange={handleChange}
            className={classes.tabs}
            style={{ width: '80%', paddingLeft: '5%' }}
          >
            <Tab label="Mathematics MAN 001" {...a11yProps(0)} className={classes.tab} />
            <Tab label="Intro to Enviornment CEN- 103" className={classes.tab} {...a11yProps(1)} />
            <Tab label="Psychology HSS-101" {...a11yProps(2)} className={classes.tab}>
              {' '}
            </Tab>
            <Tab
              label="Open Channel Hydralyics  CEN-207"
              {...a11yProps(3)}
              className={classes.tab}
            />
            <Tab
              label="Open Channel Hydralyics  CEN-207"
              {...a11yProps(4)}
              className={classes.tab}
            />
            <Tab
              label="Open Channel Hydralyics  CEN-207"
              {...a11yProps(5)}
              className={classes.tab}
            />
            <Tab
              label="Open Channel Hydralyics  CEN-207"
              {...a11yProps(6)}
              className={classes.tab}
            />
          </Tabs>
        </Tab>
        <Tab label="User Uploads" {...b11yProps(1)} className={classes.tabF}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            scrollButtons="off"
            value={valueA}
            onChange={handleChangeUpl}
            className={classes.tabs}
            style={{ width: '80%', paddingLeft: '5%' }}
          >
            <Tab label="Mathematics MAN 001" {...c11yProps(7)} className={classes.tab} />
            <Tab label="Intro to Enviornment CEN- 103" {...c11yProps(8)} className={classes.tab} />
            <Tab label="Psychology HSS-101" {...c11yProps(9)} className={classes.tab} />
            <Tab
              label="Open Channel Hydralyics  CEN-207"
              {...c11yProps(10)}
              className={classes.tab}
            />
            <Tab
              label="Open Channel Hydralyics  CEN-207"
              {...c11yProps(11)}
              className={classes.tab}
            />
            <Tab
              label="Open Channel Hydralyics  CEN-207"
              {...c11yProps(12)}
              className={classes.tab}
            />
            <Tab
              label="Open Channel Hydralyics  CEN-207"
              {...c11yProps(13)}
              className={classes.tab}
            />
          </Tabs>
        </Tab>
      </Tabs>

      <TabPanelUR className={classes.main} value={value} index={0}>
        <UserRequestTab />
      </TabPanelUR>
      <TabPanelUR value={value} index={1}>
        Item Two UR
      </TabPanelUR>
      <TabPanelUR value={value} index={2}>
        Item Three UR
      </TabPanelUR>
      <TabPanelUR value={value} index={3}>
        Item Four UR
      </TabPanelUR>
      <TabPanelUR value={value} index={4}>
        Item UR
      </TabPanelUR>
      <TabPanelUR value={value} index={5}>
        Item Six UR
      </TabPanelUR>
      <TabPanelUR value={value} index={6}>
        Item Seven UR
      </TabPanelUR>

      <TabPanelUU className={classes.main} value={valueA} index={7}>
        Item one UP
      </TabPanelUU>
      <TabPanelUU value={valueA} index={8}>
        Item Two UP
      </TabPanelUU>
      <TabPanelUU value={valueA} index={9}>
        <UserRequestTab />
      </TabPanelUU>
      <TabPanelUU value={valueA} index={10}>
        Item Four UP
      </TabPanelUU>
      <TabPanelUU value={valueA} index={11}>
        Item Five UP
      </TabPanelUU>
      <TabPanelUU value={valueA} index={12}>
        Item Six UP
      </TabPanelUU>
      <TabPanelUU value={valueA} index={13}>
        Item Seven UP
      </TabPanelUU>
    </div>
  );
}
