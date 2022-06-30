import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '~/constants/index';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '~/ultis';
Product.propTypes = {
  product: PropTypes.object,
};

function Product({ product }) {
  const history = useNavigate();
  const thumbnailUrl = product.thumbnail ? `${STATIC_HOST}${product.thumbnail?.url}` : THUMBNAIL_PLACEHOLDER;
  const handleClick = () => {
    //Navigate to detail page /products/productID
    history(`${product.id}`);
  };
  return (
    <Box padding={1} onClick={handleClick}>
      <Box>
        {/* <img src={`https://api.ezfrontend.com${product.thumbnail?.url}`} alt={product.name} width='100%' /> */}
        <img src={thumbnailUrl} alt={product.name} width='100%' minheight='200px' />
      </Box>
      <Typography variant='body2'>{product.name}</Typography>
      <Typography variant='body2'>
        <Box component='span' fontSize='16px' fontWeight='bold' mr={1}>
          {/* {product.salePrice} */}
          {formatPrice(product.salePrice)}
        </Box>
        {product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ``}
      </Typography>
    </Box>
  );
}

export default Product;
