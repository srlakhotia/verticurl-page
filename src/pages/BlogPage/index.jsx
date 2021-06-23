import React, { useState, useEffect } from 'react';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Tab,
  Tabs,
  Badge,
  Drawer,
  Hidden,
  Avatar,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Menu,
  MenuItem,
  Backdrop,
  CircularProgress
} from '@material-ui/core';
import { useStyles } from './styles';
import { BlogEditor } from '../../components';
import {
  MailOutlineOutlined,
  SearchOutlined,
  MenuOutlined,
  SettingsOutlined,
  ExitToAppOutlined,
  LaptopMacOutlined,
  DescriptionOutlined,
  ListAltOutlined,
  PermContactCalendarOutlined,
  FiberManualRecord,
  MoreHoriz,
  RotateRightOutlined,
  DeleteOutlineOutlined,
  VisibilityOffOutlined,
  EditOutlined
} from '@material-ui/icons';
import axios from 'axios';
import { GET_ALL_BLOG } from '../../constants/URLs';
import { MONTH_NAMES } from '../../constants/helpers';

const BlogPage = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [optionDrawerEl, setOptionDrawerEl] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [allBlogData, setAllBlogData] = useState([]);
  const [dialogProps, setDialogProps] = useState({
    mode: null,
    data: {},
    isOpen: false
  });

  const classes = useStyles();

  useEffect(() => {
    setIsDataLoading(true);
    axios.get(GET_ALL_BLOG)
      .then(res => {
        setAllBlogData(res.data);
        setIsDataLoading(false);
      })
      .catch(() => {
        setIsDataLoading(false);
      });
  }, []);

  const handleDrawerToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const CELL_TYPE = {
    JOB_TITLE: 'jobTitle',
    IS_ACTIVE: 'isActive',
    POSTED: 'posted',
    APPLICATIONS: 'applications',
    OPTIONS: 'options',
    JOB_ID: 'id'
  }

  const tableColumns = [{
    id: CELL_TYPE.JOB_TITLE,
    minWidth: '20%',
    label: 'JOB TITLE',
  }, {
    id: CELL_TYPE.IS_ACTIVE,
    minWidth: '20%',
    label: 'STATUS',
  }, {
    id: CELL_TYPE.POSTED,
    minWidth: '20%',
    label: 'POSTED',
  }, {
    id: CELL_TYPE.APPLICATIONS,
    minWidth: '20%',
    label: 'APPLICANTS',
  }, {
    id: CELL_TYPE.OPTIONS,
    minWidth: '20%',
    label: 'OPTIONS',
  }];

  const open = Boolean(optionDrawerEl)
  const drawerOptions = [{
    title: 'Edit',
    icon: <EditOutlined />,
    clickHandler: (data) => {
      setDialogProps({
        data,
        mode: 'edit',
        open: true
      });
    },
  }, {
    title: 'Re-post',
    icon: <RotateRightOutlined />,
    clickHandler: () => null
  }, {
    title: 'Delete',
    icon: <DeleteOutlineOutlined />,
    clickHandler: () => null
  }, {
    title: 'Hide',
    icon: <VisibilityOffOutlined />,
    clickHandler: () => null
  }];

  const createRow = (blogData) => {
    return blogData.map(blog => {
      return {
        [`${CELL_TYPE.JOB_TITLE}`]: {
          title: blog.title,
          department: blog.department
        },
        [`${CELL_TYPE.IS_ACTIVE}`]: blog.isActive,
        [`${CELL_TYPE.POSTED}`]: blog.postDate,
        [`${CELL_TYPE.APPLICATIONS}`]: blog.applications,
        [`${CELL_TYPE.OPTIONS}`]: blog.id,
        [`${CELL_TYPE.JOB_ID}`]: blog.id
      }
    });
  };

  const handleOptionsClick = (e) => {
    setOptionDrawerEl(e.currentTarget)
  };
  const handleOptionsClose = () => {
    setOptionDrawerEl(null)
  }

  const renderTableCell = (cellType, cellData, idx) => {
    const cellInput = cellData[cellType];
    const isDraftCell = !cellData[CELL_TYPE.IS_ACTIVE];
    const generateJobTitle = () => {
      return (<div key={idx}>
        <div className={classes.jobTitle}>{cellInput.title}</div>
        <div className={classes.jobDepartment}>{cellInput.department}</div>
      </div>);
    };

    const generateStatus = () => (
      <div
        key={idx}
        className={classes.tableStatus}
      >
        <FiberManualRecord className={cellInput ? classes.tableStatusIconActive : classes.tableStatusIcon} />
        {cellInput ? 'Active' : 'Draft'}
      </div>
    );

    const generatedPostDate = () => {
      const getDate = () => {
        let d = new Date(cellInput);
        return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
      }
      const date = isDraftCell ? '---' : getDate();
      return (<div key={idx} className={classes.postDate}>
        {date}
      </div>)
    };

    const generateApplications = () => {
      if (!cellInput || isDraftCell || !cellInput.length) {
        return <div className={classes.noPost}>---</div>
      }
      return <div className={classes.tableAvatarBlock}>
        {
          cellInput.map((applicant, index) => {
            if (index <= 2) {
              return (
                <Avatar key={`${applicant.id}_${index}`} src={applicant.avatar} className={classes.applicantAvatar} />
              )
            } else if (index === 3) {
              return <span key={`${applicant.id}_${index}`}>{`+${cellInput.length - 3}`}</span>
            } else {
              return null;
            }
          })
        }
      </div>
    };

    const generateOptions = () => {
      return (
        <div>
          <IconButton
            onClick={handleOptionsClick}
            data-blog={JSON.stringify(cellData)}
          >
            <MoreHoriz />
          </IconButton>
        </div>
      )
    }

    switch (cellType) {
      case CELL_TYPE.JOB_TITLE: {
        return generateJobTitle();
      }
      case CELL_TYPE.IS_ACTIVE: {
        return generateStatus();
      }
      case CELL_TYPE.POSTED: {
        return generatedPostDate();
      }
      case CELL_TYPE.APPLICATIONS: {
        return generateApplications();
      }
      case CELL_TYPE.OPTIONS: {
        return generateOptions();
      }
      default: {
        return '';
      }
    }
  };

  const showAddNewJobModal = () => {
    setDialogProps({
      mode: 'add',
      open: true,
      data: {}
    });
  };

  const viewBlog = (e, post) => {
    if (!(e.target.tagName === 'svg')) {
      setDialogProps({
        open: true,
        mode: 'view',
        data: post
      });
    }
  };

  const renderBlogData = () => {
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.pageIntroBar}>
          <div className={classes.pageTitle}>
            Jobs
        </div>
          <Button
            className={classes.pageNavButton}
            variant={'outlined'}
            onClick={showAddNewJobModal}
          >
            Add new job
        </Button>
        </div>
        {<Backdrop className={classes.backdrop} open={isDataLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>}
        <TableContainer className={classes.tableContainer}>
          <Table className={classes.tableMain}>
            <TableHead className={classes.tableHead}>
              <TableRow>
                {tableColumns.map((col, index) => {
                  return (
                    <TableCell
                      key={index}
                      style={{ width: col.minWidth }}
                      align={"left"}
                      className={classes.tableHeadCell}
                    >
                      {col.label}
                    </TableCell>
                  )
                }
                )}
              </TableRow>
            </TableHead>
            {!isDataLoading && (<TableBody>
              {allBlogData.length > 0 && createRow(allBlogData).map((post, index) => {
                return <TableRow
                  className={classes.tableRow}
                  key={index}
                  onClick={(e) => viewBlog(e, post)}
                >
                  {tableColumns.map((col, idx) => {
                    return <TableCell key={idx}>
                      {renderTableCell(col.id, post, idx)}
                    </TableCell>
                  })}
                </TableRow>
              })}
              <Menu
                anchorEl={optionDrawerEl}
                getContentAnchorEl={null}
                keepMounted
                open={open}
                onClose={handleOptionsClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
              >
                {drawerOptions.map((opt, index) => {
                  return (
                    <MenuItem
                      key={index}
                      onClick={handleOptionsClose}
                    >
                      <div onClick={() => opt.clickHandler(JSON.parse(optionDrawerEl.dataset.blog))} className={classes.optionMenuItem}>
                        <div className={classes.optionMenuIcon}>{opt.icon}</div>
                        <div className={classes.optionMenuText}>{opt.title}</div>
                      </div>
                    </MenuItem>
                  )
                })}
              </Menu>
            </TableBody>)}
          </Table>
        </TableContainer>
        <div className={classes.endOfTable}><MoreHoriz /></div>
      </main>);
  };

  const renderDrawer = () => {
    const drawerContent = () => {
      return (
        <div>
          <div className={classes.sidebar}>
            <div className={classes.sidebarItem}>
              <Avatar classes={{
                root: classes.avatarPicture
              }} />
              <div className={classes.avatarDescription}>
                <div className={classes.avatarName}>Devinder Kumar</div>
                <div className={classes.avatarDesignation}>Chief Officer</div>
              </div>
              <Button
                className={classes.avatarButton}
                variant="outlined"
              >
                Update Profile
              </Button>
            </div>
            <div className={classes.sidebarItem}>
              <LaptopMacOutlined className={classes.sidebarListIcons} />
              DashBoard
            </div>
            <div className={classes.activeSidebarItem}>
              <ListAltOutlined className={classes.sidebarListIcons} />
              Jobs
            </div>
            <div className={classes.sidebarItem}>
              <DescriptionOutlined className={classes.sidebarListIcons} />
              SeaDocs
            </div>
            <div className={classes.sidebarItem}>
              <PermContactCalendarOutlined className={classes.sidebarListIcons} />
              Connections
            </div>
          </div>
        </div>
      )
    }
    return (
      <nav className={classes.drawer}>
        <Hidden smUp implementation={'css'}>
          <Drawer
            variant="temporary"
            open={isMobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawerContent()}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          {drawerContent()}
        </Hidden>
      </nav>
    );
  };

  const renderAppHeader = () => {
    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbarContent}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuOutlined />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="open search"
            className={classes.searchButton}
          >
            <SearchOutlined />
          </IconButton>
          <Tabs value={0} onChange={() => null} aria-label="Menu bar" scrollButtons="auto" variant="scrollable">
            <Tab label="Blog" />
            <Tab label="Questions" />
            <Tab label="Company" />
            <Tab label="Contact" />
          </Tabs>
          <div className={classes.barIcons}>
            <SettingsOutlined className={classes.settingsIcon} />
            <Badge badgeContent={4} color="primary" className={classes.mailIcon}>
              <MailOutlineOutlined />
            </Badge>
            <ExitToAppOutlined className={classes.logoutIcon} />
          </div>
        </Toolbar>
      </AppBar>
    );
  };

  const updateBlogData = (newData, isEdit) => {
    setAllBlogData(() => {
      if(isEdit) {
        let tempBlogData = allBlogData;
        tempBlogData.some((data, index) => {
          if(newData.id === data.id) {
            tempBlogData[index] = newData;
            return true;
          };
          return false;
        });
        return [...tempBlogData];
      }
      return [...allBlogData, newData]
    });
  };

  const renderBlogEditor = () => {
    return (
      <div>
        <BlogEditor
          mode={dialogProps.mode}
          setDialogProps={setDialogProps}
          updateBlogData={updateBlogData}
          data={dialogProps.data}
        />
      </div>)
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      {renderAppHeader()}
      {renderDrawer()}
      {renderBlogData()}
      {dialogProps.open && renderBlogEditor()}
    </div>
  )
};

export default BlogPage;