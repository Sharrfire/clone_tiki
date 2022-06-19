import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import productApi from '~/api/productApi';

ProductListPage.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {},
  left: { width: '250px' },
  right: { flex: '1 1 auto' },
}));
function ProductListPage(props) {
  const classes = useStyles();
  useEffect(() => {
    (async () => {
      const response = await productApi.getAll({ _page: 1, _limit: 10 });
      console.log({ response });
    })();
  }, []);
  return (
    <Box>
      <Container className={classes.root}>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>Left collum</Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>Right collum</Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductListPage;
