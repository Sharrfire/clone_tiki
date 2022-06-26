import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import PropTypes from 'prop-types';

function FilterSkeletonList({ length }) {
  return (
    <Box>
      {Array.from(new Array(length)).map((x, index) => (
        <Skeleton key={index} width='100%' />
      ))}
    </Box>
  );
}
FilterSkeletonList.propTypes = {
  length: PropTypes.number,
};
FilterSkeletonList.defaultProps = {
  length: 6,
};
export default FilterSkeletonList;
