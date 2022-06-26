import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useState } from 'react';
// import FilterSkeletonList from './FilterSkeletonList';
const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(2), borderTop: `1px solid ${theme.palette.grey[300]}` },
  range: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '& > span': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
  rangeLabel: { fontWeight: 'bold' },
  button: {
    ' &:hover': {
      backgroundColor: '#3f51b5',
      color: '#fff',
    },
  },
}));

function FilterByPrice({ onChange }) {
  const classes = useStyles();

  const [values, setValues] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    //Dung de luu tru bien  e.target.name va e.target.value tranh khoi bi xoa khi ham goi lai
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(values);
    if (onChange) onChange(values);
    setValues({ salePrice_gte: 0, salePrice_lte: 0 });
  };
  return (
    <Box className={classes.root}>
      <Typography variant='subtitle1' className={classes.rangeLabel}>
        CHỌN KHOẢNG GIÁ
      </Typography>
      <Box className={classes.range}>
        <TextField name='salePrice_gte' value={values.salePrice_gte} onChange={handleChange} />
        <span>-</span>
        <TextField name='salePrice_lte' value={values.salePrice_lte} onChange={handleChange} />
      </Box>
      <Button className={classes.button} variant='outlined' color='primary' size='small' onClick={handleSubmit}>
        Áp dụng
      </Button>
    </Box>
  );
}

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

export default FilterByPrice;
