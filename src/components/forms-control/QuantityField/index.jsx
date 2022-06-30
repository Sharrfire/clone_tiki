import { Box, FormHelperText, IconButton, Typography, makeStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};
const useStyles = makeStyles(() => ({
  root: { padding: 0 },
  box: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    maxWidth: '150px',
  },
}));
function QuantityField(props) {
  const { form, name, label, disabled } = props;
  const { errors, setValue } = form;
  const hasError = errors[name];
  const classes = useStyles();

  return (
    <FormControl fullWidth margin='normal' variant='outlined' size='small' className={classes.root}>
      <Typography variant='h5'>{label}</Typography>
      <Controller
        name={name}
        control={form.control}
        render={({ onChange, onBlur, value, name }) => (
          <Box className={classes.box}>
            <IconButton onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1)}>
              <RemoveCircleOutline />
            </IconButton>
            <OutlinedInput
              id={name}
              type='number'
              disabled={disabled}
              // error={!!hasError}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
            <IconButton onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)}>
              <AddCircleOutline />
            </IconButton>
          </Box>
        )}
      />
      <FormHelperText error={!!hasError}>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

export default QuantityField;
