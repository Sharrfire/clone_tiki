import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useEffect, useState } from 'react';
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
  const [pagination, setPagination] = useState({
    limit: 12,
    total: 15,
    page: 1,
  });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 12,
  });

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(filters);
        setProductlist(data);
        setPagination(pagination);
        console.log({ data, pagination });
      } catch (error) {
        console.log('Failed to get all products', error);
      }
      setLoading(false);
    })();
  }, [filters]);
  const handlePageChange = (e, page) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      _page: page,
    }));
  };
  return (
    <Box>
      <Container className={classes.root}>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>Left collum</Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              {loading ? <ProductSkeletonList length={12} /> : <ProductList data={productlist} />}
              <Pagination
                count={Math.ceil(pagination.total / pagination.limit)}
                color='primary'
                page={pagination.page}
                onChange={handlePageChange}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
ListPage.propTypes = {};

export default ListPage;
