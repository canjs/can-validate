/*can-validate.build*/
var canValidate = require('./can-validate/can-validate.js');
var validate = require('./can-validate/map/validate/validate.js');
var validateJsShim = require('./can-validate/shims/validatejs.shim.js');
module.exports = {
    'can-validate': { 'can-validate': canValidate },
    'map': { validate: validate },
    'shims': { 'validatejs.shim': validateJsShim }
};
//# sourceMappingURL=can-validate.build.js.map