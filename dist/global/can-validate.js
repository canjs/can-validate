/*[global-shim-start]*/
(function(exports, global, doEval) {
	// jshint ignore:line
	var origDefine = global.define;

	var get = function(name) {
		var parts = name.split("."),
			cur = global,
			i;
		for (i = 0; i < parts.length; i++) {
			if (!cur) {
				break;
			}
			cur = cur[parts[i]];
		}
		return cur;
	};
	var set = function(name, val) {
		var parts = name.split("."),
			cur = global,
			i,
			part,
			next;
		for (i = 0; i < parts.length - 1; i++) {
			part = parts[i];
			next = cur[part];
			if (!next) {
				next = cur[part] = {};
			}
			cur = next;
		}
		part = parts[parts.length - 1];
		cur[part] = val;
	};
	var useDefault = function(mod) {
		if (!mod || !mod.__esModule) return false;
		var esProps = { __esModule: true, default: true };
		for (var p in mod) {
			if (!esProps[p]) return false;
		}
		return true;
	};

	var hasCjsDependencies = function(deps) {
		return (
			deps[0] === "require" && deps[1] === "exports" && deps[2] === "module"
		);
	};

	var modules =
		(global.define && global.define.modules) ||
		(global._define && global._define.modules) ||
		{};
	var ourDefine = (global.define = function(moduleName, deps, callback) {
		var module;
		if (typeof deps === "function") {
			callback = deps;
			deps = [];
		}
		var args = [],
			i;
		for (i = 0; i < deps.length; i++) {
			args.push(
				exports[deps[i]]
					? get(exports[deps[i]])
					: modules[deps[i]] || get(deps[i])
			);
		}
		// CJS has no dependencies but 3 callback arguments
		if (hasCjsDependencies(deps) || (!deps.length && callback.length)) {
			module = { exports: {} };
			args[0] = function(name) {
				return exports[name] ? get(exports[name]) : modules[name];
			};
			args[1] = module.exports;
			args[2] = module;
		} else if (!args[0] && deps[0] === "exports") {
			// Babel uses the exports and module object.
			module = { exports: {} };
			args[0] = module.exports;
			if (deps[1] === "module") {
				args[1] = module;
			}
		} else if (!args[0] && deps[0] === "module") {
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
		if (globalExport && !get(globalExport)) {
			if (useDefault(result)) {
				result = result["default"];
			}
			set(globalExport, result);
		}
	});
	global.define.orig = origDefine;
	global.define.modules = modules;
	global.define.amd = true;
	ourDefine("@loader", [], function() {
		// shim for @@global-helpers
		var noop = function() {};
		return {
			get: function() {
				return { prepareGlobal: noop, retrieveGlobal: noop };
			},
			global: global,
			__exec: function(__load) {
				doEval(__load.source, global);
			}
		};
	});
})(
	{},
	typeof self == "object" && self.Object == Object ? self : window,
	function(__$source__, __$global__) {
		// jshint ignore:line
		eval("(function() { " + __$source__ + " \n }).call(__$global__);");
	}
);

/*can-validate@1.1.3#can-validate*/
define('can-validate', [
    'require',
    'exports',
    'module',
    'can-reflect'
], function (require, exports, module) {
    var canReflect = require('can-reflect');
    var validate = {};
    var helpers = {
        'object': function (normalizedErrors) {
            var errors = normalizedErrors.length > 0 ? {} : undefined;
            canReflect.eachIndex(normalizedErrors, function (error) {
                canReflect.eachIndex(error.related, function (related) {
                    if (!errors[related]) {
                        errors[related] = [];
                    }
                    errors[related].push(error.message);
                });
            });
            return errors;
        },
        'flat': function (normalizedErrors) {
            var errors = normalizedErrors.length > 0 ? [] : undefined;
            canReflect.eachIndex(normalizedErrors, function (error) {
                errors.push(error.message);
            });
            return errors;
        },
        'errors': function (normalizedErrors) {
            return normalizedErrors.length > 0 ? normalizedErrors : undefined;
        },
        'errors-object': function (normalizedErrors) {
            var errors = normalizedErrors.length > 0 ? {} : undefined;
            canReflect.eachIndex(normalizedErrors, function (error) {
                canReflect.eachIndex(error.related, function (related) {
                    if (!errors[related]) {
                        errors[related] = [];
                    }
                    errors[related].push(error);
                });
            });
            return errors;
        }
    };
    var parseErrorItem = function (rawErrors) {
        var errors = [];
        if (typeof rawErrors === 'string') {
            errors.push({
                message: rawErrors,
                related: ['*']
            });
        }
        if (typeof rawErrors === 'object' && !Array.isArray(rawErrors)) {
            if (rawErrors.related) {
                if (!Array.isArray(rawErrors.related)) {
                    rawErrors.related = [rawErrors.related];
                }
            } else {
                rawErrors.related = '*';
            }
            errors.push(rawErrors);
        }
        if (Array.isArray(rawErrors)) {
            canReflect.eachIndex(rawErrors, function (error) {
                [].push.apply(errors, parseErrorItem(error));
            });
        }
        return errors;
    };
    var normalizeErrors = function (rawErrors) {
        var normalizedErrors = [];
        if (typeof rawErrors === 'string' || typeof rawErrors === 'object' && !Array.isArray(rawErrors)) {
            rawErrors = [rawErrors];
        }
        if (rawErrors != null) {
            canReflect.eachIndex(rawErrors, function (error) {
                [].push.apply(normalizedErrors, parseErrorItem(error));
            });
        }
        return normalizedErrors;
    };
    validate.formatErrors = function (errors, format) {
        var normalized = normalizeErrors(errors);
        if (format) {
            if (helpers[format]) {
                return helpers[format](normalized);
            } else {
                return normalized;
            }
        } else {
            return normalized;
        }
    };
    module.exports = validate;
});
/*[global-shim-end]*/
(function(global) { // jshint ignore:line
	global._define = global.define;
	global.define = global.define.orig;
}
)(typeof self == "object" && self.Object == Object ? self : window);
//# sourceMappingURL=can-validate.js.map