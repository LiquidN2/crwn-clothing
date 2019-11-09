import React from 'react';
import PropTypes from 'prop-types';

// STYLES
import {
  GroupContainer,
  StyledFormInputLabel,
  StyledFormInput,
} from './form-input.styles';

const FormInput = ({ handleChange, label, id, ...rest }) => {
  return (
    <GroupContainer>
      <StyledFormInput onChange={handleChange} id={id} {...rest} />
      {label ? (
        <StyledFormInputLabel shrink={rest.value.length} htmlFor={id}>
          {label}
        </StyledFormInputLabel>
      ) : null}
    </GroupContainer>
  );
};

FormInput.propTypes = {
  handleChange: PropTypes.func,
  label: PropTypes.string,
  id: PropTypes.string,
};

export default FormInput;
