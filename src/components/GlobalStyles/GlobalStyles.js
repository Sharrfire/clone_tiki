import React from 'react';
import PropTypes from 'prop-types';
import './GlobalStyles.scss';

GlobalStyles.propTypes = {
  children: PropTypes.node.isRequired,
};

function GlobalStyles({ children }) {
  return children;
}

export default GlobalStyles;
