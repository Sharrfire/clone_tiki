import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '~/features/Auth/components/LoginForm';
import { login } from '~/features/Auth/components/userSlice';
import PropTypes from 'prop-types';
Login.propTypes = {
  closeDialog: PropTypes.func,
};

function Login(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (values) => {
    try {
      //auto set username = email
      const action = login(values);
      const resultAction = await dispatch(action);
      //==  const resultAction = await dispatch(Login(values));
      const user = unwrapResult(resultAction);
      //close dialog
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });

      // console.log('Failed to Login', error);
    }
  };
  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
