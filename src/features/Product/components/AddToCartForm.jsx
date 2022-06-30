import { yupResolver } from '@hookform/resolvers/yup';
import { Button, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '~/components/forms-control/InputField';

const useStyles = makeStyles((theme) => ({
  root: { paddingTop: theme.spacing(4), position: 'relative' },
  avatar: {
    margin: '0 auto',
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    margin: theme.spacing(2, 0, 3, 0),
    textAlign: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progress: {
    position: 'absolute',
    top: theme.spacing(1),
    left: 0,
    right: 0,
  },
}));

function AddToCartForm({ onSubmit = null }) {
  const classes = useStyles();
  const schema = yup.object().shape({
    quantity: yup.number().required('Please enter quantity').min(1, 'Please enter at least 1'),
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
        <InputField name='quantity' label='Quantity' form={form} className={classes.root} />
        <Button type='submit' variant='contained' color='primary' fullWidth size='large'>
          Mua
        </Button>
      </form>
    </div>
  );
}
AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};
export default AddToCartForm;
