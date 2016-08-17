import can from 'can';
import ErrorsObj from './errors.map';
import {getValidateFromCache, evalComputes} from './map-helpers';

export default {
	/**
	* @function validate Validate
	* @deprecated {1.0} `validate` is deprecated and will be removed in version 1.0.
	* Use `_validate` instead.
	*
	* @description Runs validation on the entire map instance. Actual behavior of
	* "validate all" is defined by the registered shim.
	*/
	validate: function () {
		return this._validate();
	},

	/**
	* @function _validate _Validate
	* @description Runs validation on the entire map instance. Actual behavior of
	* "validate all" is defined by the registered shim (`validate`).
	*/
	_validate: function () {
		var validateOpts = getValidateFromCache.call(this);
		var processedOpts = {};
		var self = this;

		// Loop through validate options
		can.each(this.define, function (value, key) {
			if (value.validate) {
				processedOpts[key] = evalComputes({key: key, value: self.attr(key)}, validateOpts[key]);
			}
		});
		var errors = can.validate.validate(this.serialize(), processedOpts);

		// Process errors if we got them
		// TODO: This creates a new instance every time.
		this.attr('errors', new ErrorsObj(errors));

		return can.isEmptyObject(errors);
	},
	/**
	* @function _validateOne Validate One
	* @description Main method used by `can.Map.define` setter when a property changes.
	*  Runs validation on a property. Actual behavior of "validate one" is defined
	*  by the registered shim (`once`).
	*
	*  It also handles setting the errors property on the map instance and then
	* manages the errors for the current property within the errors object.
	*
	* @param {object} item A key/value object
	* @param {object} opts Object that contains validation config.
	* @return {boolean} True if method found that the property can be saved; if
	*  validation fails and the property must validate (`mustValidate` property),
	*  this will be `false`.
	*/
	_validateOne: function (item, opts) {
		var errors;
		var allowSet = true;

		// run validation
		errors = can.validate.once(item.value, can.extend({}, opts), item.key);

		// Process errors if we got them
		if (errors && errors.length > 0) {
			// Create errors property if doesn't exist
			if (!this.attr('errors')) {
				this.attr('errors', new ErrorsObj({}));
			}

			// Apply error response to observable
			this.attr('errors').attr(item.key, errors);

			// Don't set value if `mustValidate` is true
			if (opts.mustValidate === true) {
				allowSet = false;
			}
		} else {
			// clear errors for this property if they exist
			if (this.attr('errors') && this.attr('errors').attr(item.key)) {
				this.attr('errors').removeAttr(item.key);
			}
		}

		return allowSet;
	}
};
