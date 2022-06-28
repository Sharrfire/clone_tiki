import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import productApi from '~/api/productApi';
import FilterViewer from '../components/FilterViewer';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';
import { useMemo } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {},
  left: { width: '250px' },
  right: { flex: '1 1 0' },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row nowrap',
    marginTop: '30px',
    paddingBottom: '20px',
  },
}));
function ListPage(props) {
  const classes = useStyles();
  const history = useNavigate();
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 12,
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    };
  }, [location.search]);

  const [loading, setLoading] = useState(true);
  const [productlist, setProductlist] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 12,
    total: 15,
    page: 1,
  });

  // const [filters, setFilters] = useState(() => ({
  //   ...queryParams,
  //   _page: Number.parseInt(queryParams._page) || 1,
  //   _limit: Number.parseInt(queryParams._limit) || 12,
  //   _sort: queryParams._sort || 'salePrice:ASC',
  // }));
  // useEffect(() => {
  //   // console.log({ history, filters, location });
  // history({
  //   pathname: location.pathname,
  //   search: queryString.stringify(filters),
  // });
  // }, [history, filters, location.pathname]);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setProductlist(data);
        setPagination(pagination);
        console.log({ data, pagination });
      } catch (error) {
        console.log('Failed to get all products', error);
      }
      setLoading(false);
    })();
  }, [queryParams]);

  const handlePageChange = (e, page) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   _page: page,
    // }));
    const filters = {
      ...queryParams,
      _page: page,
    };
    history({
      pathname: location.pathname,
      search: queryString.stringify(filters),
    });
  };
  const handleSortChange = (newSortValue) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   _sort: newSortValue,
    // }));
    const filters = {
      ...queryParams,
      _sort: newSortValue,
    };
    history({
      pathname: location.pathname,
      search: queryString.stringify(filters),
    });
  };
  const handleFiltersChange = (newFilters) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   ...newFilters,
    // }));
    const filters = {
      ...queryParams,
      ...newFilters,
    };
    history({
      pathname: location.pathname,
      search: queryString.stringify(filters),
    });
  };
  const setNewFilters = (newFilters) => {
    // setFilters(newFilters);
    history({
      pathname: location.pathname,
      search: queryString.stringify(newFilters),
    });
  };

  return (
    <Box>
      <Container className={classes.root}>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilters filters={queryParams} onChange={handleFiltersChange} />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />
              <FilterViewer filters={queryParams} onChange={setNewFilters} />

              {loading ? <ProductSkeletonList length={12} /> : <ProductList data={productlist} />}
              <Box className={classes.pagination}>
                <Pagination
                  count={Math.ceil(pagination.total / pagination.limit)}
                  color='primary'
                  page={pagination.page}
                  onChange={handlePageChange}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
ListPage.propTypes = {};

export default ListPage;
