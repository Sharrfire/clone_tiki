import { Paper } from '@material-ui/core';
import DOMPurify from 'dompurify';
ProductDescription.propTypes = {};

function ProductDescription({ product }) {
  const safeDescription = DOMPurify.sanitize(product.description);
  return (
    <Paper elevation={0} style={{ padding: '15px', listStyleType: 'none' }}>
      <div dangerouslySetInnerHTML={{ __html: safeDescription }} />;
    </Paper>
  );
}

export default ProductDescription;
