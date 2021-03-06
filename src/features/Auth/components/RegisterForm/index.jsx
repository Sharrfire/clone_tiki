import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { LockOpenOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

// import InputField from '~/components/forms-control/InputField';
import InputField from '~/components/forms-control/InputField';
import PasswordField from '~/components/forms-control/PasswordField';
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
RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm(props) {
  const classes = useStyles();
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Please enter your full name.')
      .test('Should have at least two words', 'Please enter at least two words', (value) => {
        return value.split(' ').length >= 2;
      }),
    email: yup.string().required('Please enter your email address').email('Please enter your valid email address'),
    password: yup.string().required('Please enter your password').min(6, 'Please enter at least 6 characters.'),
    retypePassword: yup
      .string()
      .required('Please retype your password')
      .oneOf([yup.ref('password')], 'Password does not match '),
  });
  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
    form.reset();
  };

  const { isSubmitting } = form.formState;
  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}

      <Avatar className={classes.avatar}>
        <LockOpenOutlined></LockOpenOutlined>
      </Avatar>
      <Typography className={classes.title} components='h3' variant='h5'>
        Create an account
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name='fullName' label='Full Name' form={form} />
        <InputField name='email' label='Email' form={form} />
        <PasswordField name='password' label='Password' form={form} />
        <PasswordField name='retypePassword' label='Retype Password' form={form} />
        <Button
          disabled={isSubmitting}
          type='submit'
          className={classes.submit}
          variant='contained'
          color='primary'
          fullWidth
          size='large'
        >
          Create an account
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
