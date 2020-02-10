import React from 'react';
import PropTypes from 'prop-types';

function InputPrompt() {
  return (
    <span className='text-center block'>Start typing to see results</span>
  )
}

export default function WithInputPrompt({ inputValue, render }) {
  return !inputValue ? <InputPrompt /> : render();
}

WithInputPrompt.propTypes = {
  inputValue: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};