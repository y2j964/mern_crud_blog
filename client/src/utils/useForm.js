// based on formik-esque code from https://www.youtube.com/watch?v=8yo44xN7-nQ
import React from 'react';

function useFormValidation(initialState, loginUser) {
  const [values, setValues] = React.useState(initialState);
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setSubmitting] = React.useState(false);

  // React.useEffect(() => {
  //   if (isSubmitting) {
  //     const noErrors = Object.keys(errors).length === 0;
  //     if (noErrors) {
  //       loginUser(values);
  //       setSubmitting(false);
  //     } else {
  //       setSubmitting(false);
  //     }
  //   }
  // }, [isSubmitting, loginUser, values, errors]);

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  }

  // function handleBlur() {
  //   const validationErrors = validateClient(values);
  //   setErrors(validationErrors);
  // }

  function handleSubmit(event) {
    event.preventDefault();
    // const validationErrors = validateClient(values);
    // setErrors(validationErrors);
    setSubmitting(true);
    const noErrors = Object.keys(errors).length === 0;
    if (noErrors) {
      loginUser(values);
      setSubmitting(false);
    } else {
      setSubmitting(false);
    }
  }

  return {
    handleSubmit,
    handleChange,
    // handleBlur,
    values,
    errors,
    isSubmitting,
  };
}

export default useFormValidation;
