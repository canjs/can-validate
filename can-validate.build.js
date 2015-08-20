/*can-validate.build*/
module.exports = {
    'can-validate': { 'can-validate': require('./can-validate/can-validate.js') },
    map: { validate: require('./can-validate/map/validate/validate.js') },
    shims: { 'validatejs.shim': require('./can-validate/shims/validatejs.shim.js') },
    demos: {
        'can-validate': require('./can-validate/demo/can-validate.demo.js'),
        validate: require('./can-validate/map/validate/demo/validate.demo.js')
    }
};
//# sourceMappingURL=can-validate.build.js.map