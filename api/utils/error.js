export const errorHandler = (statusCode, message) => {
  const error = new Error(); //error constructor from javascript
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
