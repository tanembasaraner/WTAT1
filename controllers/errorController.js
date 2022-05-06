exports.logErrors = (error, req, res, next) => {
 console.error(error.stack); //log error stack
 next(error); //pass the error to the next middleware function
};
