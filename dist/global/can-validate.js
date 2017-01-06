/*[global-shim-start]*/
(function(exports, global, doEval){ // jshint ignore:line
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
	var set = function(name, val){
		var parts = name.split("."),
			cur = global,
			i, part, next;
		for(i = 0; i < parts.length - 1; i++) {
			part = parts[i];
			next = cur[part];
			if(!next) {
				next = cur[part] = {};
			}
			cur = next;
		}
		part = parts[parts.length - 1];
		cur[part] = val;
	};
	var useDefault = function(mod){
		if(!mod || !mod.__esModule) return false;
		var esProps = { __esModule: true, "default": true };
		for(var p in mod) {
			if(!esProps[p]) return false;
		}
		return true;
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
		result = module && module.exports ? module.exports : result;
		modules[moduleName] = result;

		// Set global exports
		var globalExport = exports[moduleName];
		if(globalExport && !get(globalExport)) {
			if(useDefault(result)) {
				result = result["default"];
			}
			set(globalExport, result);
		}
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
				doEval(__load.source, global);
			}
		};
	});
}
)({},window,function(__$source__, __$global__) { // jshint ignore:line
	eval("(function() { " + __$source__ + " \n }).call(__$global__);");
}
)
/*can-validate@1.0.0-pre.0#lib/helpers*/
define('can-validate/lib/helpers', function (require, exports, module) {
    var each = require('can-util/js/each/each');
    exports.createObject = function (Constructor) {
        if (Object.create) {
            return Object.create(Constructor);
        } else {
            function Temp() {
            }
            ;
            Temp.prototype = Constructor.prototype;
            return new Temp();
        }
    };
    exports.clone = function (obj) {
        var clone = {};
        each(obj, function (val, item) {
            clone[item] = obj[item];
        });
        return clone;
    };
});
/*can-validate@1.0.0-pre.0#lib/validate*/
define('can-validate/lib/validate', function (require, exports, module) {
    var helpers = require('can-validate/lib/helpers');
    var isEmptyObject = require('can-util/js/is-empty-object/is-empty-object');
    var each = require('can-util/js/each/each');
    exports.errorDef = errorDef = {
        error: '',
        related: new Array()
    };
    exports.validateDef = { validate: null };
    var runValidations = function (value, constraints) {
        var errors = [];
        var scope = this;
        each(constraints, function (constraint, key) {
            var err = helpers.clone(errorDef);
            if (scope.validations[key]) {
                var rawError = scope.validations[key](value, constraint);
                if (rawError) {
                    if (typeof rawError === 'string') {
                        err.error = rawError;
                    }
                    if (typeof rawError === 'object') {
                        err.error = rawError.error;
                        err.related = rawError.related;
                    }
                    errors.push(err);
                }
            }
        });
        return errors;
    };
    exports.validateValue = function (value, constraints) {
        var errors = [];
        var library = this.library;
        if (isEmptyObject(library)) {
            errors = runValidations.call(this, value, constraints);
        } else {
            errors = library.shim.test(value, constraints);
        }
        return errors;
    };
});
/*can-validate@1.0.0-pre.0#can-validate*/
define('can-validate', function (require, exports, module) {
    var validate = require('can-validate/lib/validate');
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
});
/*[global-shim-end]*/
(function(){ // jshint ignore:line
	window._define = window.define;
	window.define = window.define.orig;
}
)();
//# sourceMappingURL=can-validate.js.map