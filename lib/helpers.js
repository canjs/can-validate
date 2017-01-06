var each = require('can-util/js/each/each');

exports.createObject = function (Constructor) {
    if (Object.create) {
        return Object.create(Constructor);
    } else {
        function Temp() {};
        Temp.prototype = Constructor.prototype;
        return new Temp();
    }
};

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
