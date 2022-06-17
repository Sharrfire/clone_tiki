import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm';
// import { register } from '../../../../easy-frond-end/features/Auth/components/userSlice';
import { register } from '~/features/Auth/components/userSlice';
import PropTypes from 'prop-types';
Register.propTypes = {
  closeDialog: PropTypes.func,
};

function Register(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (values) => {
    try {
      //auto set username = email
      values.username = values.email;
      const action = register(values);
      const resultAction = await dispatch(action);
      //==  const resultAction = await dispatch(register(values));
      const user = unwrapResult(resultAction);
      //close dialog
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }
      console.log('New user:', user);
      enqueueSnackbar('Register successfully!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });

      // console.log('Failed to register', error);
    }
  };
  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
