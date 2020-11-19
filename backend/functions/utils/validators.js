// Const
const NOT_EMPTY = "Must not be empty";
const MIN_LENGTH = "At least 6 characters";
const PASSWORD_NOT_MATCH = "Passwords must match";
const INVALID_HANDLE = "Username must contain letters and number only, no space and special character allowed";

// Check if input strig is empty
const isEmpty = (string) => {
  if (string.trim() === "") return true;
  return false;
};

// User name contains letters and nubmer only, no space and other char
const isValidHandle = (string) => {
  const s = string.trim();
  for(let i = 0; i < s.length; i++) {
    let c = s.charAt(i).toUpperCase();
    if(!isValidUpperLetter(c)) {
      return false;
    }
  }
  return true;
}

const isValidUpperLetter = (c) => {
  if((c >= "A" && c <= "Z") || (c >= "0" && c <= "9")) {
    return true;
  }
  return false;
}

// Check if sign up newUser data is validate
exports.validateSignupData = user => {
  let errors = {};

  if (isEmpty(user.email)) errors.email = NOT_EMPTY;
  if (isEmpty(user.password)) errors.password = NOT_EMPTY;
  if (isEmpty(user.handle)) errors.handle = NOT_EMPTY;
  
  if(user.password.length < 6) {
    errors.password = MIN_LENGTH;
  }

  if (user.password !== user.confirmPassword)
    errors.confirmPassword = PASSWORD_NOT_MATCH;

  if (!isValidHandle(user.handle)) errors.handle = INVALID_HANDLE;

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

// Check if login credetials are validate
exports.validateLoginData = user => {
  let errors = {};

  if (isEmpty(user.email)) errors.email = 'Must not be empty';
  if (isEmpty(user.password)) errors.password = 'Must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};
