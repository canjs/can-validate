/*can-validate@1.0.1#lib/helpers*/
define(function (require, exports, module) {
    var each = require('can-util/js/each');
    exports.clone = function (obj) {
        var clone = {};
        each(obj, function (val, item) {
            clone[item] = obj[item];
        });
        return clone;
    };
});
//# sourceMappingURL=helpers.js.map