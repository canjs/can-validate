/*can-validate@1.0.0-pre.0#can-validate*/
var validate = require('./lib/validate.js');
var Validate = function () {
    if (!(this instanceof Validate)) {
        return new Validate();
    }
    this.validations = {};
    this.library = {};
};
Validate.extend = function (Constructor) {
    var TempClass = function () {
        Validate.apply(this, arguments);
        Constructor.apply(this, arguments);
    };
    Constructor.prototype = helpers.createObject(Validate.prototype);
    TempClass.prototype = helpers.createObject(Constructor.prototype);
    return TempClass;
};
Validate.prototype.registerLibrary = function (key, shim) {
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
    this.validations[key] = validator;
};
Validate.prototype.errors = function () {
    return this._errors || [];
};
Validate.prototype.constructor = Validate;
Validate.prototype.test = function (value, constraints) {
    this._errors = validate.validateValue.call(this, value, constraints);
    return this.errors().length === 0;
};
module.exports = Validate;
//# sourceMappingURL=can-validate.js.map