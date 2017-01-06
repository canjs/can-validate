var validate = require('can-validate/lib/validate');

var Validate = function () {
    if (!(this instanceof Validate)) {
        return new Validate();
    }

    this.validations = {};
    this.library = {};
};

/**
 * Makes it easier to extend Validate class, calls constructor and copies prototype.
 */
Validate.extend = function (Constructor) {
    var TempClass = function () {
        Validate.apply(this, arguments);
        Constructor.apply(this, arguments);
    };

    // Tack on the Validate prototype
    Constructor.prototype = helpers.createObject(Validate.prototype);
    // It is possible for a plugin to add to the prototype
    TempClass.prototype = helpers.createObject(Constructor.prototype);
    return TempClass;
};

Validate.prototype.registerLibrary = function (key, shim) {
    // TODO This check may need improving
    if (key && shim && shim.test) {
        this.library = {
            name: key,
            shim: shim
        };
        return true;
    } else {
        return false;
    }
};

Validate.prototype.registerValidator = function (key, validator) {
  // TODO: Is there a better way to register these?
  // Will overwrite previous validators, is that cool?
  this.validations[key] = validator;
};

// TODO This should be a compute
Validate.prototype.errors = function () {
    return this._errors || [];
};

// Validate.prototype.constraints = function (constraints) {
//   this['_constraints'] = constraints;
// };
//
// Validate.prototype.value = function (value) {
//   this.value = value;
// };

Validate.prototype.constructor = Validate;

Validate.prototype.test = function (value, constraints) {
    this._errors = validate.validateValue.call(this, value, constraints);
    return this.errors().length === 0;
};

module.exports = Validate;
