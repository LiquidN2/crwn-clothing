import './form-input.styles.scss';
import React, { ChangeEventHandler } from 'react';

interface FormInputProps {
  label: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
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
  <div className="group">
    <input className="form-input" onChange={handleChange} {...otherProps} />
    {label ? (
      <label
        htmlFor={otherProps.id ? otherProps.id : ''}
        className={`${
          Object.entries(otherProps).length ? 'shrink' : ''
        } form-input-label`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
