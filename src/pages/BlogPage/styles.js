import { makeStyles } from '@material-ui/core';

const drawerWidth = 250;
const colors = {
  grey: '#6f6f6f',
  white: '#fff',
  blue: '#2958AD',
  red: '#f00',
  textBlue: '#008FE0',
  lightGrey: '#d0d0d0',
  skyBlue: '#31ADF3',
  sideBarInactive: '#AEBCDA',
  sideBarActiveBg: '#1C4C9E',
  green: '#66B930',
  table: {
    headBg: '#D8E2E7',
    headText: '#6B7D92',

  }
};

const getMenuButtons = (theme) => ({
  marginRight: theme.spacing(2),
  color: colors.grey,
});

const topBarIcons = () => ({
  color: colors.lightGrey,
  cursor: 'pointer'
});

const buttonLayout = () => ({
  borderRadius: '20px',
  textTransform: 'none'
});

const sidebarItem = () => ({
  display: 'flex',
  justifyContent: 'center',
  flexFlow: 'column',
  alignItems: 'center',
  width: '100%',
  color: colors.sideBarInactive,
  cursor: 'pointer'
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    backgroundColor: colors.blue,
    height: '100vh'
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: colors.blue
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      boxShadow: 'unset'
    },
    backgroundColor: colors.white,
    color: colors.grey,
  },
  menuButton: {
    ...getMenuButtons(theme),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  searchButton: {
    ...getMenuButtons(theme),
  },
  // necessary for content to be below app bar
  toolbar: {
    ...theme.mixins.toolbar,

  },
  toolbarContent: {
    justifyContent: 'space-between'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    maxHeight: '100vh',
    overflow: 'auto'
  },
  barIcons: {
    display: 'flex',
    flexDirection: 'row'
  },
  mailIcon: {
    ...topBarIcons(),
    verticalAlign: 'top'
  },
  settingsIcon: {
    ...topBarIcons()
  },
  logoutIcon: {
    ...topBarIcons()
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    minHeight: '100vh',
    margin: '0 auto'
  },
  sidebarItem: {
    ...sidebarItem()
  },
  activeSidebarItem: {
    ...sidebarItem(),
    color: colors.white,
    boxSizing: 'border-box',
    backgroundColor: colors.sideBarActiveBg,
    borderLeft: `5px solid ${colors.skyBlue}`,
    width: 'calc(100% - 5px)'
  },
  avatarPicture: {
    width: '150px',
    height: '150px'
  },
  avatarButton: {
    ...buttonLayout(),
    marginTop: '20px',
    color: colors.white,
    borderColor: colors.skyBlue,
  },
  avatarDescription: {
    marginTop: '20px'
  },
  avatarName: {
    textAlign: 'center',
    color: colors.white,
    fontWeight: 'bold'
  },
  avatarDesignation: {
    textAlign: 'center',
    color: colors.skyBlue,
    fontSize: '0.8rem'
  },
  sidebarListIcons: {
    fontSize: '2.5em'
  },
  pageIntroBar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px'
  },
  pageNavButton: {
    ...buttonLayout(),
    backgroundColor: colors.green,
    borderColor: 'transparent',
    color: colors.white,
    '&:hover': {
      backgroundColor: colors.green,
      color: colors.white
    }
  },
  pageTitle: {
    fontSize: '1.3rem'
  },
  tableStatus: {
    textTransform: 'capitalize',
    padding: '5px 20px',
    border: `1px solid ${colors.lightGrey}`,
    borderRadius: '23px',
    display: 'inline-block',
    width: '108px',
    color: colors.grey
  },
  tableStatusIconActive: {
    color: colors.green,
    verticalAlign: 'text-bottom',
    fontSize: '0.95rem',
    marginRight: '5px'
  },
  tableStatusIcon: {
    color: colors.red,
    verticalAlign: 'text-bottom',
    fontSize: '0.95rem',
    marginRight: '5px'
  },
  tableAvatarBlock: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '85%',
    color: colors.textBlue
  },
  optionMenu: {},
  optionMenuItem: {
    display: 'flex',
    width: '100%',
    padding: '1px 0',
    color: colors.grey,
    fontSize: '0.8rem'
  },
  optionMenuIcon: {
    color: colors.textBlue,
    marginRight: '5px',
    '& > svg': {
      fontSize: '1rem'
    }
  },
  optionMenuText: {
    verticalAlign: 'text-bottom'
  },
  tableHead: {
    backgroundColor: colors.table.headBg,
  },
  tableRow: {
    cursor: 'pointer',
    '&:hover': {
      boxShadow: `0 0 11px 1px ${colors.grey}`
    }
  },
  tableHeadCell: {
    color: colors.table.headText,
    fontWeight: 'bold'
  },
  jobTitle: {
    color: colors.textBlue
  },
  jobDepartment: {
    color: colors.grey,
    fontSize: '0.8rem'
  },
  postDate: {
    color: colors.grey
  },
  noPost: {
    color: colors.grey
  }
}));

export {
  useStyles
};