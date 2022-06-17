import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LockOpenOutlined } from '@material-ui/icons';
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import PasswordField from '~/components/forms-control/PasswordField';
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
LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm(props) {
  const classes = useStyles();
  const schema = yup.object().shape({
    identifier: yup.string().required('Please enter your email address').email('Please enter your valid email address'),
    password: yup.string().required('Please enter your password'),
  });
  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
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
        Sign in
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name='identifier' label='Email' form={form} />
        <PasswordField name='password' label='Password' form={form} />
        <Button
          disabled={isSubmitting}
          type='submit'
          className={classes.submit}
          variant='contained'
          color='primary'
          fullWidth
          size='large'
        >
          Sign in
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
