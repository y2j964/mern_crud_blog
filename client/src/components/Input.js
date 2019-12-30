import React from 'react';
import PropTypes from 'prop-types';

function Input({
  labelText,
  type,
  name,
  isRequired,
  describedBy,
  autoComplete,
  minLength,
  value,
  handleChange,
  children,
}) {
  return (
    <div className="mb-4">
      <label className="font-bold block" htmlFor={name}>
        {labelText}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        autoComplete={autoComplete}
        aria-required={isRequired}
        aria-describedby={describedBy}
        required={isRequired}
        minLength={minLength}
        className="form-input"
        value={value}
        onChange={handleChange}
      />
      {children}
    </div>
  );
}

export const InputText = props => <Input {...props} type="text" />;
export const InputEmail = props => (
  <Input {...props} type="email" autoComplete="email" isRequired />
);
export const InputPassword = props => (
  <Input
    {...props}
    type="password"
    autoComplete="current-password"
    isRequired
  />
);

Input.propTypes = {
  labelText: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isRequired: PropTypes.bool.isRequired,
  describedBy: PropTypes.string,
  autoComplete: PropTypes.string,
  minLength: PropTypes.string,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Input;
