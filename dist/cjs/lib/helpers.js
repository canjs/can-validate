/*can-validate@1.0.0-pre.1#lib/helpers*/
var each = require('can-util/js/each/each');
exports.clone = function (obj) {
    var clone = {};
    each(obj, function (val, item) {
        clone[item] = obj[item];
    });
    return clone;
};
//# sourceMappingURL=helpers.js.map