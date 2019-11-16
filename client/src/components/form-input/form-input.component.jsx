import React from 'react';
import PropTypes from 'prop-types';

// STYLES
import {
  GroupContainer,
  StyledFormInputLabel,
  StyledFormInput,
} from './form-input.styles';

const FormInput = ({ label, id, ...rest }) => {
  return (
    <GroupContainer>
      <StyledFormInput id={id} {...rest} />
      {label ? (
        <StyledFormInputLabel shrink={rest.value.length} htmlFor={id}>
          {label}
        </StyledFormInputLabel>
      ) : null}
    </GroupContainer>
  );
};

FormInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
};

export default FormInput;
