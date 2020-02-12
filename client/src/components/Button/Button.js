import React from 'react';
import PropTypes from 'prop-types';

function Button({
  additionalClasses,
  handleClick,
  type,
  tabIndex,
  disabled,
  dataTestId,
  children,
}) {
  return (
    <button
      className={`btn ${additionalClasses || ''}`}
      onClick={handleClick}
      type={type}
      tabIndex={tabIndex}
      disabled={disabled}
      data-testid={dataTestId}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  handleClick: PropTypes.func,
  additionalClasses: PropTypes.string,
  type: PropTypes.string,
  tabIndex: PropTypes.string,
  disabled: PropTypes.bool,
  dataTestId: PropTypes.string,
  children: PropTypes.node,
};

export const AccentButton = props => (
  <Button
    {...props}
    additionalClasses={`btn--accent ${props.additionalClasses || ''}`}
  />
);
AccentButton.propTypes = {
  additionalClasses: PropTypes.string,
};

export const InverseButton = props => (
  <Button
    {...props}
    additionalClasses={`btn--inverse ${props.additionalClasses || ''}`}
  />
);
InverseButton.propTypes = {
  additionalClasses: PropTypes.string,
};

export const WindowButton = props => (
  <Button
    {...props}
    additionalClasses={`btn--window ${props.additionalClasses || ''}`}
  />
);
WindowButton.propTypes = {
  additionalClasses: PropTypes.string,
};

export const NeutralButton = props => (
  <Button
    {...props}
    additionalClasses={`btn--neutral ${props.additionalClasses || ''}`}
  />
);
NeutralButton.propTypes = {
  additionalClasses: PropTypes.string,
};

export const DangerButton = props => (
  <Button
    {...props}
    additionalClasses={`btn--danger ${props.additionalClasses || ''}`}
  />
);
DangerButton.propTypes = {
  additionalClasses: PropTypes.string,
};
