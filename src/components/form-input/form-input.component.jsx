import React from 'react';
import PropTypes from 'prop-types';

import './form-input.styles.scss';

const FormInput = ({ handleChange, label, id, ...rest }) => {
  return (
    <div className="group">
      <input className="form-input" onChange={handleChange} id={id} {...rest} />
      {label ? (
        <label
          className={`${rest.value.length ? 'shrink' : ''} form-input-label`}
          htmlFor={id}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
};

FormInput.propTypes = {
  handleChange: PropTypes.func,
  label: PropTypes.string,
  id: PropTypes.string,
};

export default FormInput;
