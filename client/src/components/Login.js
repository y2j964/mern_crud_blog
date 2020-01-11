/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { InputEmail, InputPassword } from './Input';
import { loginUser } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';

function Login({
  handleClose,
  loginUser,
  clearErrors,
  isAuthenticated,
  errorMsg,
}) {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // clear errors so that errors don't persist
  useEffect(() => {
    clearErrors();
  }, [clearErrors]);

  useEffect(() => {
    if (isAuthenticated) {
      handleClose();
    }
  }, [isAuthenticated, handleClose]);

  const onSubmit = e => {
    e.preventDefault();
    setIsSubmitting(true);

    const user = {
      email: emailValue,
      password: passwordValue,
    };

    loginUser(user);
    setIsSubmitting(false);
  };

  return (
    <React.Fragment>
      <header className="flex items-center mb-6">
        <h2 className="text-3xl text-center w-full font-bold" id="modalHeading">
          Log In
        </h2>
      </header>
      <form action="" onSubmit={onSubmit}>
        {errorMsg && (
          <div
            className="bg-red-200 mb-3 p-3 rounded-sm flex items-center"
            role="alert"
          >
            <p className="text-sm text-red-800 font-bold">{errorMsg}</p>
          </div>
        )}
        <InputEmail
          labelText={'Email: '}
          name="accountEmail"
          value={emailValue}
          handleChange={e => setEmailValue(e.target.value)}
          // handleBlur={handleBlur}
        />
        <InputPassword
          labelText={'Password: '}
          name="accountPassword"
          describedBy="passwordDetails"
          value={passwordValue}
          handleChange={e => setPasswordValue(e.target.value)}
          // handleBlur={handleBlur}
        >
          <small
            className="text-sm text-gray-500 leading-none"
            id="passwordDetails"
          >
            Passwords must be at least 8 characters long.
          </small>
        </InputPassword>
        <button
          type="submit"
          className="accent-btn accent-btn--is-glowing w-full mt-2"
          disable={`${isSubmitting}`}
        >
          Log In
        </button>
      </form>
    </React.Fragment>
  );
}

Login.propTypes = {
  handleClose: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errorMsg: state.error.msg,
});

export default connect(mapStateToProps, { loginUser, clearErrors })(Login);
// import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { InputEmail, InputPassword } from './Input';
// import { loginUser } from '../actions/authActions';
// import { clearErrors } from '../actions/errorActions';
// import useFormValidation from '../utilityFunctions/useForm';

// const initialState = {
//   email: '',
//   password: '',
// };

// // eslint-disable-next-line no-shadow
// function Login({
//   handleClose,
//   loginUser,
//   clearErrors,
//   isAuthenticated,
//   errorMsg,
// }) {
//   // const [emailValue, setEmailValue] = useState('');
//   // const [passwordValue, setPasswordValue] = useState('');
//   const {
//     handleSubmit,
//     handleChange,
//     handleBlur,
//     values,
//     isSubmitting,
//   } = useFormValidation(initialState, loginUser);

//   // clear errors on unmount so that they don't persist if user reopens modal
//   useEffect(() => {
//     return () => {
//       clearErrors();
//     };
//   }, [clearErrors]);

//   useEffect(() => {
//     if (isAuthenticated) {
//       handleClose();
//     }
//   }, [isAuthenticated, handleClose]);

//   // const onSubmit = e => {
//   //   e.preventDefault();
//   //   const user = {
//   //     email: emailValue,
//   //     password: passwordValue,
//   //   };
//   //   loginUser(user);
//   // };

//   return (
//     <React.Fragment>
//       <header className="flex items-center mb-6">
//         <h2 className="text-3xl text-center w-full font-bold" id="modalHeading">
//           Log In
//         </h2>
//       </header>
//       <form action="" onSubmit={handleSubmit}>
//         <InputEmail
//           labelText={'Email: '}
//           name="email"
//           value={values.email}
//           handleChange={handleChange}
//           // handleBlur={handleBlur}
//         />
//         <InputPassword
//           labelText={'Password: '}
//           name="password"
//           describedBy="passwordDetails"
//           value={values.password}
//           handleChange={handleChange}
//           // handleBlur={handleBlur}
//         >
//           <small
//             className="text-sm text-gray-500 leading-none"
//             id="passwordDetails"
//           >
//             Passwords must be at least 8 characters long.
//           </small>
//         </InputPassword>
//         {errorMsg && <p>{errorMsg}</p>}
//         <button
//           type="submit"
//           className="accent-btn accent-btn--is-glowing w-full mt-2"
//           disable={`${isSubmitting}`}
//         >
//           Log In
//         </button>
//       </form>
//     </React.Fragment>
//   );
// }

// Login.propTypes = {
//   handleClose: PropTypes.func.isRequired,
//   loginUser: PropTypes.func.isRequired,
//   clearErrors: PropTypes.func.isRequired,
//   isAuthenticated: PropTypes.bool.isRequired,
//   errorMsg: PropTypes.string,
// };

// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.isAuthenticated,
//   errorMsg: state.error.msg,
// });

// export default connect(mapStateToProps, { loginUser, clearErrors })(Login);
