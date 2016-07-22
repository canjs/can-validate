/**
* @module {can.Construct} validatejs-shim ValidateJS Shim
* @parent can-validate-shims
* @description
* This shim requires ValidateJS in the consuming app's package.json. It processes
* the passed in options so they can be properly used by the ValidateJS libarary.
* @body
*
* ## Initialization
* Import ValidateJS, validate plugin and this shim to immediately use the
* ValidateJS in a CanJS project plugin.
* ```js
* import 'validatejs';
* import 'can-validate/can-validate';
* import 'can-validate/shims/validatejs.shim';
*```
*
*/

import can from 'can-validate/can-validate';
import validatejs from 'validate.js';

var processOptions = function (opts) {
	// check required
	if (typeof opts.required !== 'undefined') {
		opts.presence = opts.required;
		delete opts.required;
	}

	if (opts.hasOwnProperty('mustValidate')) {
		delete opts.mustValidate;
	}

	if (opts.hasOwnProperty('validateOnInit')) {
		delete opts.validateOnInit;
	}

	return opts;
};

var Shim = can.Construct.extend({

	/**
	* @function once Once
	* @description Validates a single property using provided validation options
	* @param {*} value Some value to validate against.
	* @param {Object} options Raw validation options. They will be processed since
	* not all options are valid for ValidateJS.
	* @param {string} name The key name of the value to validate. Used to prepend to
	* error messages, if any.
	* @return {undefined|array} Returns undefined if no errors, otherwise returns
	* a list of errors.
	*/
	once: function (value, options, name, otherItems) {
		var errors = [];
		var opts = [];
		var validationOpts = [];

		// Check if name was passed, determines which validate method to use
		if (name) {
			// Since name exists, use the main validate method but just pass one
			// property to it. Need to structure the objects it expects first.
			opts = can.extend({}, otherItems);
			opts[name] = value;
			validationOpts[name] = processOptions(options);

			// Use main validate method, gives us better handling of custom messages
			// and key path name prepending.
			errors = validatejs(opts, validationOpts);

			// can.Map.define expects an array of strings, but main validate method
			// returns an object.
			if (errors) {
				errors = errors[name];
			}
		} else {
			errors = validatejs.single(value, processOptions(options));
		}

		return errors;
	},

	/**
	* @function isValid Is Valid
	* @description Simply checks if the property value will validate or not, this
	* method will not set errors, it is meant to check validity *before* a property
	* is set.
	* @param {*} value Some value to validate against.
	* @param {Object} options Raw validation options. They will be processed since
	* not all options are valid for ValidateJS.
	* @return {boolean} True if valid, otherwise returns false
	*/
	isValid: function (value, options) {
		var errors = validatejs.single(value, processOptions(options)) || [];

		return errors.length === 0;
	},

	/**
	* @function validate Validate
	* @description
	* @param {Object} values A map of properties to validate
	* @param {Object} options Raw validation options. They will be processed since
	* not all options are valid for ValidateJS. It should be a map of property keys
	* which contain the respective validation properties.
	* @return {undefined|array} Returns undefined if no errors, otherwise returns
	* a list of errors.
	*/
	validate: function (values, options) {
		// <ie9 solution?
		var valueKeys = Object.keys(values);
		var processedOpts = {};

		// process options for each value
		for (var i = 0; i < valueKeys.length; i++) {
			var prop = valueKeys[i];
			if (options[prop]) {
				processedOpts[prop] = processOptions(options[prop]);
			}
		}

		return validatejs(values, processedOpts);
	}
});

// Register the shim
can.validate.register('validatejs', new Shim());
