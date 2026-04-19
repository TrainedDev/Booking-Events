const appError = (message, status) => {
    const error = Error(message);
    error.statuscode = status;
    return error;
};

module.exports = appError;
