
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

// User name contains letters and nubmer only, no space and other char
const validateHandle = (string) => {
  const s = string.trim();
  for(let i = 0; i < s.length; i++) {
    let c = s.charAt(i).toUpperCase();
    if(!validUpperChar(c)) {
      return false;
    }
  }
  return true;
}

const validUpperChar = (c) => {
  if((c >= "A" && c <= "Z") || (c >= "0" && c <= "9")) {
    return true;
  }
  return false;
}

// Check if sign up newUser data is validate
exports.validateSignupData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = 'Must not be empty.';
  }
  // else if (!isEmail(data.email)) {
  //   errors.email = 'Must be a valid email address';
  // }

  if (isEmpty(data.password)) errors.password = 'Must not be empty.';
  if(data.password.length < 6) {
    errors.password = 'At least 6 characters.';
  }
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = 'Passwords must match.';
  if (!validateHandle(data.handle)) errors.handle = 'Username must contain letters and number only, no space and special character allowed.';


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
