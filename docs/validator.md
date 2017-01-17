@typedef {function} can-validate/types/validator validator
@parent can-validate/types

A function that validates a value against predefined constraints and returns validation errors, if any are found.

@signature `validator(value)`

@param {Boolean|String|Number} value A simple value to validate

@return {Array|Error|string|undefined}  Returns undefined if no errors found. Otherwise, will return an error type with the error message.

@body

## Creating a validator

Typically a validator can be created like so

```javascript
var makeValidator = function (constraints) {
    return function (value) {
        var resp;
        // Validate value here, set errors to `resp`
        return resp;
    }
};

```

## Validator Response

The response should match the [can-validate/types/errors] type. The most flexible response
is the [can-validate/types/error] type which describes the error message any value keys that
triggered the error state.
