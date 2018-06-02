/**
 * Maintains all error codes
 * You may externalize this file and read it as JSON data at the time of initialization
 */
exports.errors = {
  // This is a catch all error
  // Ideally this should never be thrown
  UNKNOWN_ERROR: {
    code: 5000,
    text: 'Unknown error !!!',
    hints: ["Please contact development team with information on 'how to reproduce this error'. Thank you for your help and support."],
  },
  // All required/missing entry errors start with number 7

  ENTRY_ALREADY_EXISTS: {
    code: 7000,
    text: 'Entry with the provided payload already exist',
    hints: ['Please use PUT/PATCH for update instead of POST'],
  },

  ENTRY_DOES_NOT_EXIST: {
    code: 7001,
    text: 'Entry with the provided payload already exist',
    hints: ['Please use PUT/PATCH for update instead of POST'],
  },


  MISSING_ENTRY: {
    code: 7002,
    text: 'Incomplete Request Parameter',
    hints: ['Please check that user has provided the right payload for the endpoint'],
  },

  INVALID_ENTRY: {
    code: 7003,
    text: 'Invalid Request Parameter',
    hints: ['Please check that user has provided the right payload for the endpoint', 'Go throught the documentation to know the appropriate payload to be sent to this endpoint'],
  },
  // All server errors start with number 8

  SERVER_ERROR: {
    code: 8000,
    text: 'This issue is from us, we apologize',
    hints: ["Please contact development team with information on 'how to reproduce this error'. Thank you for your help and support."],
  },
};

// Creates the error response body

exports.create = (message, httpMethod, endpointInformation, errorList, receivedPayload) => ({
  // Meant for the developer
  message,
  // Current timestamp of the error
  timestamp: new Date(),
  // POST, GET ....
  method: httpMethod,
  // Endpoint information
  endpoint: endpointInformation,
  // An array of all errors
  errors: errorList,
  // OPTIONAL - Use only during development
  payload: receivedPayload,
});

