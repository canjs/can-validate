@module {Object} can-validate
@parent can-ecosystem
@group can-validate.core 1 can-validate Core
@package ./package.json

@description A plugin for CanJS that wraps any validation library or custom validations.
**Can-Validate doesn't do any validation of its own** but instead provides some abstraction to your chosen validations.

@type {Object}

```javascript
var Validate = require('can-validate');
var validate = new Validate();

// Set up validations
var requiredValidator = function (val, isRequired) {
  if (typeof val === 'undefined' && isRequired) {
    return 'is required.';
  }
};

validate.registerValidator('required', requiredValidator);

var err = validate.test('', {required: true}); //> false
validate.errors(); //> ['is required.']
```

@body

Easily check a value's validity by using the test method.

## Registering a Validation

A validator is a simple function that returns a string or an object.

```javascript
var requiredValidator = function (val, isRequired) {
  if (typeof val === 'undefined' && isRequired) {
    return 'is required.';
  }
};

validate.registerValidator('required', requiredValidator);
```

If the validator responds with an object, it should follow the error type structure

```json
{
    "error": "Error message",
    "related": []
}
```

The `related` property helps define properties that relate to the current property and why validation possibly failed.

## Registering a Library

It is a best practice to create a module that wraps can-validate and the chosen library.

```javascript
// Let's call this file can-validate-custom for brevity
var OldValidate = require('can-validate');
var library = require('my-awesome-validation-library');

// Shim should handle normalizing responses from library for can-validate
var shim = {
    test: function () {
        // library's `single` method returns errors array, so no need to massage
        // response at all. If we did, we just need to make sure this method
        // returns an array of errors. Preferably, each error item would match
        // the error typedef but can-validate does not enforce this.
        return library.single.apply(library, arguments);
    }
};

var NewValidate = OldValidate.extend(function () {
    this.registerLibrary('my-awesome-validation-library', shim);
});
module.exports = NewValidate;
```

Then, in the application

```javascript
var Validate = require('can-validate-custom');
var validate = new Validate();

// This will now call library validation methods instead
var err = validate.test('', {required: true}); //> false
```
