const apiErrors = require('./errors');

exports.processErrors = (message, method, endpoint, err, payload) => {
  const errorList = [];

  switch (err.code) {
    // entry already exists
    case '23505':
      errorList.push(apiErrors.errors.ENTRY_ALREADY_EXISTS);
      break;
    // issues with the query
    case '23502':
      errorList.push(apiErrors.errors.MISSING_ENTRY);
      break;
    // issues with the database
    case '42P01':
      errorList.push(apiErrors.errors.SERVER_ERROR);
      break;
    // Check for validation error
    case 'validation':
      errorList.push(apiErrors.errors.INVALID_ENTRY);
      break;
    default:
      errorList.push(apiErrors.errors.UNKNOWN_ERROR);
      break;
  }
  return apiErrors.create(message, method, endpoint, errorList, payload);
};
