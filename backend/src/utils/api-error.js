class ApiError extends Error{
    constructor(statusCode,message="Somthing went wrong",errors= [],stack="")
    {
    super(message);
    this.success = false;
    this.statusCode = statusCode;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;  

