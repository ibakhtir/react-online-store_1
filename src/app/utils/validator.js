export function validator(data, config) {
  const errors = {};

  function validate(method, data, config) {
    let statusValidate;

    switch (method) {
      case "isRequired": {
        if (typeof data === "boolean") {
          statusValidate = !data;
        } else {
          statusValidate = data.trim() === "";
        }
        break;
      }

      case "isEmail": {
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        statusValidate = !emailRegExp.test(data);
        break;
      }

      case "isCapitalSymbol": {
        const capitalRegExp = /[A-Z]+/g;
        statusValidate = !capitalRegExp.test(data);
        break;
      }

      case "isDigit": {
        const digitRegExp = /\d+/g;
        statusValidate = !digitRegExp.test(data);
        break;
      }

      case "isMinLength": {
        statusValidate = data.length < config.value;
        break;
      }

      default:
        break;
    }

    if (statusValidate) return config.message;
  }

  for (const fieldName in data) {
    for (const method in config[fieldName]) {
      const error = validate(
        method,
        data[fieldName],
        config[fieldName][method]
      );

      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}
