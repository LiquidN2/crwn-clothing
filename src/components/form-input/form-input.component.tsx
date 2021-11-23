import React, { ChangeEventHandler } from 'react';

import { InputGroup, Label, Input } from './form-input.styles';

interface FormInputProps {
  label: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  type: string;
  id?: string;
  name?: string;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  handleChange,
  ...otherProps
}) => (
  <InputGroup>
    <Input onChange={handleChange} {...otherProps} />
    {label ? (
      <Label
        htmlFor={otherProps.id ? otherProps.id : ''}
        className={`${otherProps.value?.length ? 'shrink' : ''}`}
      >
        {label}
      </Label>
    ) : null}
  </InputGroup>
);

export default FormInput;
