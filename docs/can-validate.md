@module {Object} can-validate
@parent can-data-validation
@collection can-ecosystem
@group can-validate.methods 1 Methods
@group can-validate.types 2 Types
@package ../package.json

Shared utilities and type definitions to process validation errors.

@type {Object}

The `can-validate` module exports helpful methods used for validation and also describes
the different types used during validation.

```javascript
var validate = require('my-validator');
var utils = require('can-validate');

// Normalize errors into a flat structure
var errors = utils.formatErrors(validate(obj, constraints), 'flat');
```

@body

## Usage

The [can-validate.formatErrors] method can be used to convert errors into something more useful.

```javascript
var formatErrors = require('can-validate').formatErrors;
var errors = [
    'is required',
    {
        message: 'must be a number',
        related: 'age'
    }
];

formatErrors(errors, 'object');
//=> [{'*': ['is required']}, {'age': ['must be a number']}]

formatErrors(errors, 'flat');
//=> ['is required', 'must be a number']

formatErrors(errors, 'errors');
//=> [{message: 'is required', related: '*'}, {'age': ['must be a number']}]
```

## Types

Core definitions of types used in validation.

- [can-validate.error] A flexible typedef that describes a validation error.
- [can-validate.errors] Different error types understood by `can-validate`.
- [can-validate.validator] A function that validates a given value against registered constraints.
