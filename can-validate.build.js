module.exports = {
	'can-validate': require('./can-validate/can-validate'),
	demo: require('./can-validate/demo/can-validate.demo'),
	map: {
		validate: require('./can-validate/map/validate/validate')
		// ,
		// demo: {
		// 	'validate.demo': require('./can-validate/map/validate/demo/validate.demo')
		// }
	},
	shims: {
		'validatejs.shim': require('./can-validate/shims/validatejs.shim')
	}
};
