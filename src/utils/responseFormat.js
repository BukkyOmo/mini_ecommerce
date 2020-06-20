class ResponseFormat {
    static SuccessResponseFormat(message, statusCode, status, data, count) {
        return Promise.resolve({
            message, statusCode, status, data, count
        });
    }

    static FailureResponseFormat(message, statusCode, status, error) {
        return Promise.reject({
            message, statusCode, status, error
        });
    }
}

export default ResponseFormat;
