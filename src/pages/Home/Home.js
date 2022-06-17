import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, Close } from '@material-ui/icons';
import CodeIcon from '@material-ui/icons/Code';
import { Box, IconButton, makeStyles, MenuItem, Menu } from '@material-ui/core';

import Login from '~/features/Auth/components/Login';
import Register from '~/features/Auth/components/Register';
import { logout } from '~/features/Auth/components/userSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 1,
  },
}));
const MODE = { LOGIN: 'login', REGISTER: 'register' };
function Home() {
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loginUser.id;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <CodeIcon className={classes.menuButton} />
          <Typography variant='h6' className={classes.title}>
            <Link className={classes.link} to='/'>
              GAMING SHOP
            </Link>
          </Typography>
          <NavLink to='/news' className={classes.link}>
            <Button color='inherit'>News</Button>
          </NavLink>{' '}
          <NavLink to='/Contact' className={classes.link}>
            <Button color='inherit'>Contact</Button>
          </NavLink>{' '}
          <NavLink to='/Text' className={classes.link}>
            <Button color='inherit'>Text</Button>
          </NavLink>{' '}
          <NavLink to='/Todo' className={classes.link}>
            <Button color='inherit'>Todo</Button>
          </NavLink>{' '}
          <NavLink to='/album' className={classes.link}>
            <Button color='inherit'>Album</Button>
          </NavLink>{' '}
          {!isLoggedIn && (
            <Button color='inherit' onClick={handleClickOpen}>
              Login
            </Button>
          )}
          {isLoggedIn && (
            <IconButton color='inherit' onClick={handleUserClick}>
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>

      <Dialog
        disableEscapeKeyDown
        onClose={(_, reason) => {
          if (reason !== 'backdropClick') {
            handleClose();
          }
        }}
        open={open}
        // onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <Close />
        </IconButton>

        <DialogContent>
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose} />
              <Box textAlign='center'>
                <Button
                  color='primary'
                  onClick={() => {
                    setMode(MODE.LOGIN);
                  }}
                >
                  Already have an account? Login here
                </Button>
              </Box>
            </>
          )}{' '}
          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />
              <Box textAlign='center'>
                <Button
                  color='primary'
                  onClick={() => {
                    setMode(MODE.REGISTER);
                  }}
                >
                  Dont have an account? Register here
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default Home;
