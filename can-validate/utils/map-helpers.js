import attr from 'attr';

var initValidation = function () {
    var self = this;
    var validateCache = getValidateFromCache.call(this);
    can.each(this.define, function (props, key) {
        if (props.validate && !validateCache[key]) {
            initProperty.call(self, key, self[key]);
        }
    });
};

var evalComputes = function (itemObj, opts) {
	var processedObj = {};

	// Loop through each validation option
	can.each(opts, function (item, key) {
		var actualOpts = item;
		if (typeof item === 'function') {
			// create compute and add it to computes array
			actualOpts = item(itemObj.value);
		}
		// build the map for the final validations object
		processedObj[key] = actualOpts;
	});
	return processedObj;
};

// Gets properties from the map's define property.
var getPropDefineBehavior = function (behavior, attr, define) {
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

var ValidateCache = can.Construct.extend({
    options: [],
    attr: attr()
});

var getValidateFromCache = function () {
	var validateCacheKey = '__' + config.validateOptionCacheKey;

	// Create cache object in map instance, if it doesn't exist
	if (!this[validateCacheKey]) {
		this[validateCacheKey] = {};
	}

	return this[validateCacheKey];
};



/**
* @function createComputes Create Computes
* @description Allows the ability to pass computes in validation properties,
* this allows for things like making a property required based on the value on
* another property.
*
* Processes validation options, creates computes from functions and adds
* listeners to computes.
* @param {object} itemObj Property to validate
* @param {object} opts Map of validation options
*/
var createComputes = function (itemObj, opts) {
    var processedObj = {};
    var computes = [];
    var self = this;

    // Loop through each validation option
    can.each(opts, function (item, key) {
        processedObj[key] = item;
        if (typeof item === 'function') {
            // create compute and add it to computes array
            var compute = can.compute(can.proxy(item, self));
            computes.push({key: key, compute: compute});
            processedObj[key] = compute;
        }
    });

    // Using the computes array, create necessary listeners
    // We do this afterwards instead of inline so we can have access
    // to the final set of validation options.
    can.each(computes, function (item) {
        item.compute.bind('change', function () {
            itemObj.value = self.attr(itemObj.key);
            self._validateOne(itemObj, processedObj);
        });
    });

    return processedObj;
}

var initProperty = function (key, value) {
	var validateOpts;
	var mapValidateCache;
	var propIniting;

	// Creat shortcut to cache
	mapValidateCache = getValidateFromCache.call(this);

	// If validate options don't exist in cache for current prop, create them
	if (mapValidateCache[key] && !can.isEmptyObject(mapValidateCache[key])) {
		validateOpts = mapValidateCache[key];
		propIniting = false;
	} else {
		// Copy current prop's validation properties to cache
		validateOpts = can.extend({}, getPropDefineBehavior('validate', key, this.define));
		// Need to build computes in the next step
		propIniting = true;
	}

	// Do validate if prop has any validate options
	if (typeof validateOpts !== 'undefined') {
		// Create validation computes only when initing the map
		if (propIniting) {
			validateOpts = can.extend({},
				defaultValidationOpts,
				validateOpts,
				// Find any functions, converts them to computes and returns
				// nice object for shim to use
				createComputes.call(this, {key: key, value: value}, validateOpts)
			);
			mapValidateCache[key] = validateOpts;
		}
		return true;
	}
	return false;
};
