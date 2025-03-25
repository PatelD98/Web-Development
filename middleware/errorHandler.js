const{ constants } = require('../constants');

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Error",
                message: err.message,
                stack: process.env.NODE_ENV === 'production' ? null : err.stack
            });
            break;

        case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stack: process.env.NODE_ENV === 'production' ? null : err.stack
            });
            break;

        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stack: process.env.NODE_ENV === 'production' ? null : err.stack
            });

        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stack: process.env.NODE_ENV === 'production' ? null : err.stack
            });
            break;    

        case constants.SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: err.message,
                stack: process.env.NODE_ENV === 'production' ? null : err.stack
            });
            break;

        default:
            console.log("No error handler found");
            break;
    }
}

module.exports = errorHandler;