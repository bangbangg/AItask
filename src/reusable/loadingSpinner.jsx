import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import clsx from 'clsx';


function LoadingSpinner({ size, thickness, wholePage }) {

  return (
    <div className={clsx('simple-flex', 'spinner-wrapper', { 'full-height': wholePage })}>
      <CircularProgress size={size} thickness={thickness} />
    </div>
  )
}

LoadingSpinner.propTypes = {
  size: PropTypes.number,
  thickness: PropTypes.number,
  wholePage: PropTypes.bool
};

LoadingSpinner.defaultProps = {
  size: 80,
  thickness: 4.5,
  wholePage: true
};

export default LoadingSpinner;