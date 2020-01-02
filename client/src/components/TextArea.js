import React from 'react';
import PropTypes from 'prop-types';

function TextArea({
  labelText,
  name,
  isRequired,
  describedBy,
  rows,
  value,
  handleChange,
}) {
  return (
    <div className="mb-4">
      <label className="font-bold block" htmlFor={name}>
        {labelText}
      </label>
      <textarea
        name={name}
        id={name}
        aria-required={isRequired}
        required={isRequired}
        aria-describedby={describedBy}
        rows={rows || 5}
        className="form-input"
        value={value}
        onChange={handleChange}
      ></textarea>
    </div>
  );
}

TextArea.propTypes = {
  labelText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isRequired: PropTypes.bool.isRequired,
  describedBy: PropTypes.string,
  rows: PropTypes.number,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default TextArea;
