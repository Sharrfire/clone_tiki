import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import { Outlet } from 'react-router-dom';

ProductFeature.propTypes = {};
const useStyles = makeStyles((theme) => ({
  container: { paddingTop: '32px' },
}));
function ProductFeature(props) {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Outlet />
    </Box>
  );
}

export default ProductFeature;
