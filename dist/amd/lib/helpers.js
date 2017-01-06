/*can-validate@1.0.0-pre.0#lib/helpers*/
define(function (require, exports, module) {
    var each = require('can-util/js/each');
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
//# sourceMappingURL=helpers.js.map