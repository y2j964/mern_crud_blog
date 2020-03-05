import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { InputText, InputEmail, InputPassword } from './Input';
import { registerUser } from '../actions/sessionActions';
import { REGISTER_USER } from '../actions/types';
import { clearSessionStatuses } from '../actions/communicationActions';
import WithErrorNotification from './WithErrorNotification';
import WithSuccessNotification from './WithSuccessNotification';
import { AccentButton } from './Button/Button';

function Register({
  handleClose,
  setAuthModalPosition,
  tabIndex,
  // eslint-disable-next-line no-shadow
  registerUser,
  // eslint-disable-next-line no-shadow
  clearSessionStatuses,
  errorMessage,
  sessionSuccess,
}) {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleViewRef = useRef();
  // clear errors so that errors don't persist
  // if you don't also run this on unmount, it won't launch in the event
  // that you logout and attempt to log back in. It will require two
  // clicks to open up the modal again.
  useEffect(() => {
    clearSessionStatuses();
    return () => clearSessionStatuses();
  }, [clearSessionStatuses]);

  // if succeeds, close it
  useEffect(() => {
    if (sessionSuccess !== REGISTER_USER) {
      return;
    }
    const timeoutID = setTimeout(() => handleClose(), 1200);
    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timeoutID);
  }, [sessionSuccess, handleClose]);

  const handleSubmit = e => {
    e.preventDefault();
    setIsSubmitting(true);

    const user = {
      name: nameValue,
      email: emailValue,
      password: passwordValue,
    };
    registerUser(user);
  };

  // if fails, reset button to default state
  useEffect(() => {
    setIsSubmitting(false);
  }, [errorMessage]);

  const toggleView = () => {
    toggleViewRef.current.blur();
    // need to blur so focus can move to active auth view
    setTimeout(() => {
      if (errorMessage) {
        clearSessionStatuses();
      }
    }, 300);
    setAuthModalPosition('login');
  };

  return (
    <React.Fragment>
      <header className="flex items-center mb-6">
        <h2 className="text-3xl text-center w-full font-bold" id="modalHeading">
          Register
        </h2>
      </header>
      <form action="" onSubmit={handleSubmit}>
        <WithSuccessNotification success={sessionSuccess === REGISTER_USER} />
        <WithErrorNotification error={errorMessage} />
        <InputText
          labelText={'Name: '}
          name="registerName"
          autoComplete="name"
          isRequired={true}
          tabIndex={tabIndex}
          value={nameValue}
          handleChange={e => setNameValue(e.target.value)}
        />
        <InputEmail
          labelText={'Email: '}
          name="registerEmail"
          value={emailValue}
          tabIndex={tabIndex}
          handleChange={e => setEmailValue(e.target.value)}
        />
        <InputPassword
          labelText={'Password: '}
          name="registerPassword"
          describedBy="registerPasswordDetails"
          tabIndex={tabIndex}
          value={passwordValue}
          handleChange={e => setPasswordValue(e.target.value)}
        >
          <small
            className="block text-sm text-gray-500 leading-none mt-1"
            id="passwordDetails"
          >
            Passwords must be at least 8 characters long.
          </small>
        </InputPassword>
        <AccentButton
          type="submit"
          additionalClasses="w-full mt-2"
          disabled={isSubmitting || sessionSuccess === REGISTER_USER}
          tabIndex={tabIndex}
          dataTestId="submitRegister"
        >
          {!isSubmitting || sessionSuccess === REGISTER_USER
            ? 'Register'
            : 'Pending . . .'}
        </AccentButton>
      </form>
      <button
        className="text-blue-400 mt-3"
        ref={toggleViewRef}
        onClick={toggleView}
        tabIndex={tabIndex}
        disabled={isSubmitting}
      >
        Already have an account? Log in here.
      </button>
    </React.Fragment>
  );
}

Register.propTypes = {
  handleClose: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  tabIndex: PropTypes.string,
  clearSessionStatuses: PropTypes.func.isRequired,
  setAuthModalPosition: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  sessionSuccess: PropTypes.string,
};

const mapStateToProps = state => ({
  errorMessage: state.communication.session.errorMessage,
  sessionSuccess: state.communication.session.success,
});

export default connect(mapStateToProps, { registerUser, clearSessionStatuses })(
  Register
);
