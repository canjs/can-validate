var each = require('can-util/js/each/each');
var isArray = require('can-util/js/is-array/is-array');

var helpers = {
    'object': function (errors) {
        var resp = {};
        var addToRelated = function (key, msg) {
            if (!resp[key]) {
                resp[key] = [];
            }
            resp[key].push(msg);
        };

        each(errors, function (error) {
            // If related exists, use that as the key
            if (error.related) {
                // Check if there are many related keys
                if (isArray(error.related)) {
                    // Copy error for each related key
                    each(error.related, function (related) {
                        addToRelated(related, error.message);
                    });
                } else {
                    // Only one related key
                    addToRelated(error.related, error.message);
                }
            } else {
                // No key specified so put it with the catch all
                addToRelated('*', error.message);
            }
        });
        return resp;
    },
    'flat': function (errors) {
        var resp = [];
        each(errors, function (error) {
            resp.push(error.message);
        });
        return resp;
    },
    'errors': function (errors) {
        return errors;
    },
};

var parseErrorItem = function (errors) {
    var resp = [];
    if (typeof errors === 'string') {
        resp.push({message: errors});
    }
    if (typeof errors === 'object' && !isArray(errors)) {
        // This should match the Error typedef
        resp.push(errors);
    }
    if (isArray(errors)) {
        each(errors, function (error, key) {
            resp = resp.concat(parseErrorItem(error));
        });
    }

    return resp;
};

// Takes errors and normalizes them
var normalizeErrors = function (errors, key) {
    var resp = [];
    if (typeof errors === 'string' || (typeof errors === 'object' && !isArray(errors))) {
        // Only one error set, which we can assume was for a single property
        errors = [errors];
    }
    each(errors, function (error) {
        resp = resp.concat(parseErrorItem(error));
    });

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
