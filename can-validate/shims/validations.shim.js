// add shim
steal('can-construct', 'can-validate/validations', 'can-validate', 'can/observe', function (Construct, Validations, canValidate) {
	//var validate = new Validations();
	var Shim = Construct.extend({
		once: function (value, options) {
			return Validations.validate(value, options);
		},
		isValid: function (value, options) {
			return Validations.validate(value, options);
		},
		validate: function (values, options) {
			return Validations.validate(values, options);
		}
	});

	canValidate.register('validations', new Shim());
});
