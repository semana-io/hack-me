import React from 'react';
import PropTypes from 'prop-types';

const Button = (
  {
    onClick, label,
  } : {
     onClick: () => void
     label: string
    },
) : JSX.Element => (
  <button onClick={onClick} type="button" className="btn btn-dark" data-testid="button">{label}</button>
);

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,

};

export default Button;
