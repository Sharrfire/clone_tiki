import { Box, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import categoryApi from '~/api/categoryApi';
import FilterSkeletonList from './FilterSkeletonList';

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(2) },
  menu: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',
    '& > li': {
      marginTop: theme.spacing(1),
      transition: 'all .25s',
      '&:hover': {
        color: theme.palette.primary.dark,
        cursor: 'pointer',
      },
    },
  },
  category: { fontWeight: 'bold' },
}));
FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};
FilterByPrice.propTypes = {};

function FilterByPrice(props) {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  const classes = useStyles();
  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAll();
        setCategoryList(
          list.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );

        console.log(list);
      } catch (error) {
        console.log('Failed to fetch category list', error);
      }
      setLoading(false);
    })();
  }, []);
  const handleCategoryClick = (category) => {
    if (onChange) {
      onChange(category.id);
    }
  };
  return (
    <Box className={classes.root}>
      <Typography variant='subtitle1' className={classes.category}>
        DANH MỤC SẢN PHẨM
      </Typography>
      {loading ? (
        <FilterSkeletonList length={5} />
      ) : (
        <ul className={classes.menu}>
          {categoryList.map((category) => (
            <li key={category.id} onClick={() => handleCategoryClick(category)}>
              <Typography variant='body2'> {category.name}</Typography>
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
}

export default FilterByPrice;
