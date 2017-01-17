@module {function} can-validate/methods/formatErrors formatErrors
@parent can-validate/methods

@signature `formatErrors(errors, format)`
Processes `errors` (only items that match the [can-validate/types/errors] type) and
converts items to a structure defined by `format`.

@param {errors} errors A value that matches the [can-validate/types/errors] type.
@param {string} [format] Should be equal to `object`, `flat`, or `errors`.

@return {Array|Object} The errors either flattened into a single array, grouped in
by key in an object, or a single array of [can-validate/types/error] items. If no
`format` is passed, errors will be returned in the raw parsed format.

@body

## Usage

The `errors` value should match the possible [can-validate/types/errors] type.

Given the following...

```javascript
// validate this object
var person = {};
// against these constraints
var constraints = {
    age: {
        required: true,
        number: true
    }
};
// will return some errors
var errors = someValidator(person, constraints);//> ["is required", "must be a number"]
```

We can expect the following responses

### Object Example

If no key exists in the error response, an array like object will be created.

```json
{
    "0": ["is required", "must be a number"]
}
```

### Flat Example

```json
[
    "is required",
    "must be a number"
]
```



### Errors Example

If a key name exists in the error response, then we can expect to see the key name
in `related`.

```json
[
    { "message": "is required", "related": []},
    { "message": "must be a number", "related": []}
]
```
