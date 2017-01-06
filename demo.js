var Validate = require('can-validate');
var validate = new Validate();

// Validations
var requiredValidator = function (val, isRequired) {
  if (typeof val === 'undefined' && isRequired) {
    return 'is required.';
  }
};

var lengthValidator = function (val, length) {
  if (!(val && val.length && val.length >= length)) {
    return 'must have length of ' + length + ' or greater.';
  }
};

validate.registerValidator('required', requiredValidator);
validate.registerValidator('length', lengthValidator);

// Demo
var person = {name: 'Juan', age: '35'};
var constraints = {
  name: {
    required: true,
    length: 10
  }
};

var err = validate.test(person.name, constraints.name);
console.log('isValid', err);
console.log('errors', validate.errors());
