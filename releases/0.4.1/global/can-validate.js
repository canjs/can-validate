/*[global-shim-start]*/
(function (exports, global){
	var origDefine = global.define;

	var get = function(name){
		var parts = name.split("."),
			cur = global,
			i;
		for(i = 0 ; i < parts.length; i++){
			if(!cur) {
				break;
			}
			cur = cur[parts[i]];
		}
		return cur;
	};
	var modules = (global.define && global.define.modules) ||
		(global._define && global._define.modules) || {};
	var ourDefine = global.define = function(moduleName, deps, callback){
		var module;
		if(typeof deps === "function") {
			callback = deps;
			deps = [];
		}
		var args = [],
			i;
		for(i =0; i < deps.length; i++) {
			args.push( exports[deps[i]] ? get(exports[deps[i]]) : ( modules[deps[i]] || get(deps[i]) )  );
		}
		// CJS has no dependencies but 3 callback arguments
		if(!deps.length && callback.length) {
			module = { exports: {} };
			var require = function(name) {
				return exports[name] ? get(exports[name]) : modules[name];
			};
			args.push(require, module.exports, module);
		}
		// Babel uses the exports and module object.
		else if(!args[0] && deps[0] === "exports") {
			module = { exports: {} };
			args[0] = module.exports;
			if(deps[1] === "module") {
				args[1] = module;
			}
		} else if(!args[0] && deps[0] === "module") {
			args[0] = { id: moduleName };
		}

		global.define = origDefine;
		var result = callback ? callback.apply(null, args) : undefined;
		global.define = ourDefine;

		// Favor CJS module.exports over the return value
		modules[moduleName] = module && module.exports ? module.exports : result;
	};
	global.define.orig = origDefine;
	global.define.modules = modules;
	global.define.amd = true;
	ourDefine("@loader", [], function(){
		// shim for @@global-helpers
		var noop = function(){};
		return {
			get: function(){
				return { prepareGlobal: noop, retrieveGlobal: noop };
			},
			global: global,
			__exec: function(__load){
				eval("(function() { " + __load.source + " \n }).call(global);");
			}
		};
	});
})({},window)
/*can-validate/can-validate*/
define('can-validate/can-validate/can-validate', [
    'exports',
    'module',
    'can'
], function (exports, module, _can) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can2 = _interopRequireDefault(_can);
    var processMapDefine = function processMapDefine(targetMap) {
        var targetDefine = targetMap.define;
        var resp = {
                values: {},
                opts: {}
            };
        _can2['default'].each(targetDefine, function (item, prop) {
            resp.values[prop] = targetMap.attr(prop);
            resp.opts[prop] = item.validate;
        });
        return resp;
    };
    var Validate = _can2['default'].Construct.extend({
            _validatorId: '',
            _validators: {},
            validator: function validator() {
                return this._validators[this._validatorId];
            },
            register: function register(id, validator) {
                this._validatorId = id;
                this._validators[id] = validator;
            },
            isValid: function isValid() {
                return this.validator().isValid.apply(this, arguments);
            },
            once: function once() {
                return this.validator().once.apply(this, arguments);
            },
            validate: function validate() {
                var validateArgs = arguments;
                if (arguments[0] instanceof _can2['default'].Map && arguments[0].define) {
                    var mapOptions = processMapDefine(arguments[0]);
                    validateArgs = [];
                    validateArgs.push(mapOptions.values);
                    validateArgs.push(mapOptions.opts);
                }
                return this.validator().validate.apply(this, validateArgs);
            }
        }, {});
    _can2['default'].validate = Validate;
    module.exports = _can2['default'];
});
/*can-validate@0.4.1#can-validate*/
define('can-validate/can-validate', [
    'exports',
    'module',
    'can'
], function (exports, module, _can) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can2 = _interopRequireDefault(_can);
    var processMapDefine = function processMapDefine(targetMap) {
        var targetDefine = targetMap.define;
        var resp = {
                values: {},
                opts: {}
            };
        _can2['default'].each(targetDefine, function (item, prop) {
            resp.values[prop] = targetMap.attr(prop);
            resp.opts[prop] = item.validate;
        });
        return resp;
    };
    var Validate = _can2['default'].Construct.extend({
            _validatorId: '',
            _validators: {},
            validator: function validator() {
                return this._validators[this._validatorId];
            },
            register: function register(id, validator) {
                this._validatorId = id;
                this._validators[id] = validator;
            },
            isValid: function isValid() {
                return this.validator().isValid.apply(this, arguments);
            },
            once: function once() {
                return this.validator().once.apply(this, arguments);
            },
            validate: function validate() {
                var validateArgs = arguments;
                if (arguments[0] instanceof _can2['default'].Map && arguments[0].define) {
                    var mapOptions = processMapDefine(arguments[0]);
                    validateArgs = [];
                    validateArgs.push(mapOptions.values);
                    validateArgs.push(mapOptions.opts);
                }
                return this.validator().validate.apply(this, validateArgs);
            }
        }, {});
    _can2['default'].validate = Validate;
    module.exports = _can2['default'];
});
/*can-validate/map/validate/validate*/
define('can-validate/can-validate/map/validate/validate', [
    'exports',
    'can',
    'can-validate/can-validate'
], function (exports, _can, _canValidateCanValidate) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can2 = _interopRequireDefault(_can);
    var proto = _can2['default'].Map.prototype;
    var oldSet = proto.__set;
    var ErrorsObj;
    var defaultValidationOpts;
    var processValidateOpts;
    var getPropDefineBehavior = function getPropDefineBehavior(behavior, attr, define) {
        var prop;
        var defaultProp;
        if (define) {
            prop = define[attr];
            defaultProp = define['*'];
            if (prop && prop[behavior] !== undefined) {
                return prop[behavior];
            } else {
                if (defaultProp && defaultProp[behavior] !== undefined) {
                    return defaultProp[behavior];
                }
            }
        }
    };
    ErrorsObj = _can2['default'].Map.extend({}, {
        hasErrors: function hasErrors() {
            return !_can2['default'].isEmptyObject(this.attr());
        }
    });
    defaultValidationOpts = {
        mustValidate: false,
        validateOnInit: false
    };
    processValidateOpts = function (itemObj, opts) {
        var processedObj = {};
        var computes = [];
        var vm = this;
        _can2['default'].each(opts, function (item, key) {
            var actualOpts = item;
            if (typeof item === 'function') {
                var compute = _can2['default'].compute(_can2['default'].proxy(item, vm));
                actualOpts = compute(itemObj.value);
                computes.push({
                    key: key,
                    compute: compute
                });
            }
            processedObj[key] = actualOpts;
        });
        _can2['default'].each(computes, function (item) {
            item.compute.bind('change', function (ev, newVal) {
                processedObj[item.key] = newVal;
                vm._validateOne(itemObj, processedObj);
            });
        });
        return processedObj;
    };
    _can2['default'].extend(_can2['default'].Map.prototype, {
        validate: function validate() {
            var errors = _can2['default'].validate.validate(this);
            this.attr('errors', new ErrorsObj(errors));
            return _can2['default'].isEmptyObject(errors);
        },
        _validateOne: function _validateOne(item, opts) {
            var errors;
            var allowSet = true;
            errors = _can2['default'].validate.once(item.value, _can2['default'].extend({}, opts), item.key);
            if (errors && errors.length > 0) {
                if (!this.attr('errors')) {
                    this.attr('errors', new ErrorsObj({}));
                }
                this.attr('errors').attr(item.key, errors);
                if (opts.mustValidate === true) {
                    allowSet = false;
                }
            } else {
                if (this.attr('errors') && this.attr('errors').attr(item.key)) {
                    this.attr('errors').removeAttr(item.key);
                }
            }
            return allowSet;
        }
    });
    proto.__set = function (prop, value, current, success, error) {
        var allowSet = true;
        var validateOpts = getPropDefineBehavior('validate', prop, this.define);
        var propIniting = this._init && this._init === 1 || false;
        var processedValidateOptions;
        processedValidateOptions = _can2['default'].extend({}, defaultValidationOpts, processValidateOpts.call(this, {
            key: prop,
            value: value
        }, validateOpts));
        if (validateOpts && !propIniting || validateOpts && propIniting && processedValidateOptions.validateOnInit) {
            allowSet = this._validateOne({
                key: prop,
                value: value
            }, processedValidateOptions);
        }
        if (allowSet) {
            oldSet.call(this, prop, value, current, success, error);
        }
    };
});
/*can-validate/shims/validatejs.shim*/
define('can-validate/can-validate/shims/validatejs.shim', [
    'exports',
    'can',
    'validate.js'
], function (exports, _can, _validateJs) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can2 = _interopRequireDefault(_can);
    var _validatejs = _interopRequireDefault(_validateJs);
    function processOptions(opts) {
        if (typeof opts.required !== 'undefined') {
            if (typeof opts.required === 'object' || typeof opts.required === 'boolean') {
                opts.presence = opts.required;
            }
            delete opts.required;
        }
        if (opts.hasOwnProperty('mustValidate')) {
            delete opts.mustValidate;
        }
        if (opts.hasOwnProperty('validateOnInit')) {
            delete opts.validateOnInit;
        }
        return opts;
    }
    ;
    var Shim = _can2['default'].Construct.extend({
            once: function once(value, options, name) {
                var errors = _validatejs['default'].single(value, processOptions(options));
                if (errors && name) {
                    for (var i = 0; i < errors.length; i++) {
                        errors[i] = _can2['default'].capitalize(_can2['default'].camelize(name)) + ' ' + errors[i];
                    }
                }
                return errors;
            },
            isValid: function isValid(value, options) {
                var errors = _validatejs['default'].single(value, processOptions(options)) || [];
                return errors.length === 0;
            },
            validate: function validate(values, options) {
                var valueKeys = Object.keys(values), processedOpts = {};
                for (var i = 0; i < valueKeys.length; i++) {
                    var prop = valueKeys[i];
                    if (options[prop]) {
                        processedOpts[prop] = processOptions(options[prop]);
                    }
                }
                return (0, _validatejs['default'])(values, processedOpts);
            }
        });
    _can2['default'].validate.register('validatejs', new Shim());
});
/*can-validate.build*/
define('can-validate/can-validate.build', function (require, exports, module) {
    var canValidate = require('can-validate/can-validate/can-validate');
    var validate = require('can-validate/can-validate/map/validate/validate');
    var validateJsShim = require('can-validate/can-validate/shims/validatejs.shim');
    module.exports = {
        'can-validate': { 'can-validate': canValidate },
        'map': { validate: validate },
        'shims': { 'validatejs.shim': validateJsShim }
    };
});
/*[global-shim-end]*/
(function (){
	window._define = window.define;
	window.define = window.define.orig;
})();
//# sourceMappingURL=can-validate.build.js.map