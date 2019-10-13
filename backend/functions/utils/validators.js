
// Check if input email is valid email format
// const isEmail = (email) => {
//   const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   if (email.match(regEx)) return true;
//   return false;
// };

// Check if input strig is empty
const isEmpty = (string) => {
  if (string.trim() === '') return true;
  return false;
};

// Check if sign up newUser data is validate
exports.validateSignupData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = 'Must not be empty';
  }
  // else if (!isEmail(data.email)) {
  //   errors.email = 'Must be a valid email address';
  // }

  if (isEmpty(data.password)) errors.password = 'Must not be empty';
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = 'Passwords must match';
  if (isEmpty(data.handle)) errors.handle = 'Must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

// Check if login credetials are validate
exports.validateLoginData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = 'Must not be empty';
  if (isEmpty(data.password)) errors.password = 'Must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};
