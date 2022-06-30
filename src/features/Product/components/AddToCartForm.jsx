import { yupResolver } from '@hookform/resolvers/yup';
import { Button, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import QuantityField from '~/components/forms-control/QuantityField';

const useStyles = makeStyles((theme) => ({}));

function AddToCartForm({ onSubmit = null }) {
  const classes = useStyles();
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required('Please enter quantity')
      .min(1, 'Please enter at least 1')
      .typeError('Please enter number'),
  });
  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <div className={classes.root}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <QuantityField name='quantity' label='Quantity' form={form} className={classes.root} />
        <Button type='submit' variant='contained' color='primary' style={{ width: '250px' }} fullWidth size='large'>
          Add to cart{' '}
        </Button>
      </form>
    </div>
  );
}
AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};
export default AddToCartForm;
