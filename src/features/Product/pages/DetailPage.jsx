import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Outlet, Route, Routes, useParams } from 'react-router-dom';
import AddToCartForm from '../components/AddToCartForm';
import ProductDescription from '../components/ProductDescription';
import ProductAdditional from '../components/ProductAdditional';
import ProductReview from '../components/ProductReview';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';
const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '250px',
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },
  right: {
    flex: '1 1 0',
    padding: theme.spacing(1.5),
  },
}));

function DetailPage() {
  const classes = useStyles();
  const { productId } = useParams();
  const { product, loading } = useProductDetail(productId);
  if (loading) {
    return <Box>Loading</Box>;
  }
  const handleAddToCartSubmit = (formValue) => {
    console.log('Form submit', formValue);
  };

  return (
    <Box>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product} />
              <AddToCartForm onSubmit={handleAddToCartSubmit} />
            </Grid>
          </Grid>
        </Paper>
        <ProductMenu />
        <Routes>
          <Route path='description' element={<ProductDescription product={product} />} />
          <Route path='additional' element={<ProductAdditional product={product} />} />
          <Route path='review' element={<ProductReview product={product} />} />
        </Routes>
      </Container>
    </Box>
  );
}
DetailPage.propTypes = {};

export default DetailPage;
