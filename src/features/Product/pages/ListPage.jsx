import { Box, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import productApi from '~/api/productApi';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';

const useStyles = makeStyles((theme) => ({
  root: {},
  left: { width: '250px' },
  right: { flex: '1 1 0' },
}));
function ListPage(props) {
  const classes = useStyles();
  const [productlist, setProductlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await productApi.getAll({ _page: 1, _limit: 10 });
        console.log({ data });
        setProductlist(data);
      } catch (error) {
        console.log('Failed to get all products', error);
      }
      setLoading(false);
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
            <Paper elevation={0}>{loading ? <ProductSkeletonList /> : <ProductList data={productlist} />}</Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
ListPage.propTypes = {};

export default ListPage;
