var each = require('can-util/js/each/each');

/**
 * @param obj {Object} Object to copy.
 */
exports.clone = function (obj) {
    var clone = {};
    each(obj, function (val, item) {
        clone[item] = obj[item];
    });
    return clone;
};
