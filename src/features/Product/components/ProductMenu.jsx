import { Box, Link, makeStyles } from '@material-ui/core';

import { NavLink } from 'react-router-dom';

ProductMenu.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',

    padding: 0,
    listStyleType: 'none',
    '& > li': {
      padding: theme.spacing(2, 4),
    },
    '& > li > a': {
      color: theme.palette.grey[700],
      ' &:hover': {
        color: '#ce0c1b',

        textDecoration: 'none',
      },
    },
    '& > li > a.active': {
      color: '#ce0c1b',
      // textDecoration: 'underline',
    },
  },
}));
function ProductMenu(props) {
  const classes = useStyles();
  return (
    <Box component='ul' className={classes.root}>
      <li>
        <Link component={NavLink} to={'description'} exact='true'>
          {' '}
          Description
        </Link>
      </li>{' '}
      <li>
        <Link component={NavLink} to={`additional`}>
          {' '}
          Additional Information
        </Link>
      </li>{' '}
      <li>
        <Link component={NavLink} to={`review`}>
          {' '}
          Review
        </Link>
      </li>{' '}
    </Box>
  );
}

export default ProductMenu;
