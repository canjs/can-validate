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
/*can-validate@1.0.0-pre.2#format-errors/format-errors*/
define('can-validate/format-errors/format-errors', function (require, exports, module) {
    var each = require('can-util/js/each/each');
    var helpers = {
        'object': function (errors) {
            var resp = {};
            each(errors.map, function (errorList, key) {
                if (!resp[key]) {
                    resp[key] = [];
                }
                each(errorList, function (error) {
                    resp[key].push(error.message);
                });
            });
            return resp;
        },
        'flat': function (errors) {
            var resp = [];
            each(errors.list, function (error) {
                resp.push(error.message);
            });
            return resp;
        },
        'errors': function (errors) {
            return errors.list;
        }
    };
    var normalizeErrors = function (errors, key) {
        var resp = {
            map: {},
            list: []
        };
        if (!key) {
            key = '0';
        }
        if (typeof errors === 'string') {
            var list = [];
            var errorItem = {
                message: errors,
                related: [key]
            };
            list.push(errorItem);
            resp.map[key] = list;
            resp.list = list;
        } else {
            each(errors, function (error) {
                if (error.related && error.related.length > 0) {
                    each(error.related, function (relatedKey) {
                        if (!resp.map[relatedKey]) {
                            resp.map[relatedKey] = [];
                        }
                        resp.map[relatedKey].push(error);
                        resp.list.push(error);
                    });
                }
            });
        }
        return resp;
    };
    module.exports = function (errors, format) {
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
});
/*can-validate@1.0.0-pre.2#can-validate*/
define('can-validate', function (require, exports, module) {
    var formatErrors = require('can-validate/format-errors/format-errors');
    var validate = {};
    validate.formatErrors = formatErrors;
    module.exports = validate;
});
/*[global-shim-end]*/
(function(){ // jshint ignore:line
	window._define = window.define;
	window.define = window.define.orig;
}
)();
//# sourceMappingURL=can-validate.js.map