//--------------------------------------------------------------------------------//
//--------------------------- Parse Functions ------------------------------------//
//--------------------------------------------------------------------------------//

const parseFunction = (innerFunction) => {
  return async (request) => {
    try {
      let result = await innerFunction(request);
      if (result == null) {
        result = "ok";
      }
      return result;
    } catch (error) {
      if (global.LOCAL) {
        console.trace(error);
      }
      let message;
      if (error) {
        message = error.message;
      } else {
        message = "Unkown Error";
        request.logger(new Error().stack);
      }
      return message; //throw message;
    }
  };
}

//--------------------------------------------------------------------//
//--------------------------- exports --------------------------------//
//--------------------------------------------------------------------//
exports.parseFunction = parseFunction;
