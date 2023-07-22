export function createFormErrorsFromJoiDetails(joiErrorDetails) {
    const myErrors = {};
  
    joiErrorDetails.forEach((errorData) => {
      myErrors[errorData.context.key] = errorData.message;
    });
  
    return myErrors;
  }
  