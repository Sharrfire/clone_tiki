import React from 'react';
import PropTypes from 'prop-types';

ProductAdditional.propTypes = {
  product: PropTypes.object,
};

function ProductAdditional({ product = {} }) {
  return <div>Additional </div>;
}

export default ProductAdditional;
