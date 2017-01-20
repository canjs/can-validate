@module {Object} can-validate
@parent can-ecosystem
@group can-validate/methods Methods
@group can-validate/types Types
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

The [can-validate/methods/formatErrors] method can be used to convert errors into something more useful.

```javascript
var formatErrors = require('can-validate').formatErrors;
var errors = [
    'is required',
    {
        message: 'must be a number',
        related: 'age'
    }
];

// Will return [{'*': ['is required']}, {'age': ['must be a number']}]
formatErrors(errors, 'object');
// Will return ['is required', 'must be a number']
formatErrors(errors, 'flat');
// Will return [{message: 'is required', related: '*'}, {'age': ['must be a number']}]
formatErrors(errors, 'errors');
```

## Types

Core definitions of types used in validation.

- [can-validate/types/error] A flexible typedef that describes a validation error.
- [can-validate/types/errors] Different error types understood by `can-validate`.
- [can-validate/types/validator] A function that validate a given value against registered constraints.
