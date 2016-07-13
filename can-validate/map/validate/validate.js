/**
* @module {?} can.Map.validate Map Plugin
* @parent can-validate
*
* @description The can.Map plugin will works alongside can.Map.define to add validation
* to properties on a can.Map. Importing the plugin, validation library, and a shim will
* allow the ability to dynamically check values against validation configuration. errors
* are stored on the can.Map instance and are observable.
*
* @body
*
* ## Initialization
* Import the validation library, validate plugin and a shim to immediately use the
* can.Map.validate plugin.
* ```js
* import 'validatejs';
* import 'can-validate/map/validate';
* import 'can-validate/shims/validatejs.shim';
*```
*
* ## Usage
*
* Using can-validate Map plugin only requires two extra actions,
*
* - add a validate object to the desired property
* - add a check in the view for the errors object
*
* The validate object depends on the desired valdiation library. The examples
* below use ValidateJS.
*
*```js
* var ViewModel = can.Map.extend({
*   define: {
*     name: {
*       value: '',
*       validate: {
*         required: true
*       }
*     }
*   }
* });
* var viewModel = new ViewModel({});
* viewModel.validate();
* // `errors` will have an error because the `name` value is empty
* //  and required is true.
* viewModel.attr('errors');
* viewModel.attr('name', 'Juan');
* viewModel.attr('errors'); // => Errors is now empty!
*```
*
* ## Demo
* @demo ./can-validate/map/validate/demo.html
*
*
*/

import can from 'can';
import 'can-validate/can-validate';
// Default Map for errors object. Useful to add instance helpers
import ErrorsObj from 'can-validate/utils/errors.map';
// Default validation options to extend passed options from
import defaultValidationOpts from 'can-validate/utils/default-validate-opts';
import mapHelpers from 'can-validate/utils/map-methods';

var proto = can.Map.prototype;
var oldSet = proto.__set;
var config = {
	errorKeyName: 'errors',
	validateOptionCacheKey: 'validateOptions'
};

// add method to prototype that validates entire map
var oldSetup = proto.setup;
var oldInit = proto.init;
proto.setup = function () {
	this._initValidate = true;
	oldSetup.apply(this, arguments);
};
proto.init = function () {
	initValidation.call(this);
	this._initValidate = false;

	if (oldInit) {
		oldInit.apply(this, arguments);
	}
};
can.extend(can.Map.prototype, mapHelpers);

// Override the prototype's __set with a more validate-y one.
proto.__set = function (prop, value, current, success, error) {
	// allowSet is changed only if validation options exist and validation returns errors
	var allowSet = true;
	var hasValidateProps = Boolean(getPropDefineBehavior('validate', prop, this.define));
	var mapIniting = this._initValidate;
	var validateOpts;

	if (hasValidateProps) {
		// will initialize validation properties, if not already done
		initProperty.call(this, prop, value);
		// Get processed validation properties
		validateOpts = getValidateFromCache.call(this)[prop];
		validateOpts = resolveComputes({key: prop, value: value}, validateOpts);
		// If validate opts are set and not initing then validate properties
		// If validate opts are set and initing, validate properties only if validateOnInit is true
		if ((validateOpts && !mapIniting) || (validateOpts && mapIniting && validateOpts.validateOnInit)) {
			// Validate item
			allowSet = this._validateOne({key: prop, value: value}, validateOpts);
		}
	}

	// Call old __set, in most cases, this will be the define plugin's set.
	if (allowSet) {
		oldSet.call(this, prop, value, current, success, error);
	}
};
