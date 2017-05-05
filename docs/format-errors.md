@function can-validate.formatErrors formatErrors
@parent can-validate.methods

@signature `formatErrors(errors, format)`
  Processes `errors` (only items that match the [can-validate.errors] type) and
  converts items to a structure defined by `format`.

  ```js
  formatErrors(['is required', {message: 'is invalid'}], 'errors');
  ```

  @param {can-validate.errors} errors A value that matches the [can-validate.errors] type.
  @param {string} [format] Should be equal to `object`, `flat`, or `errors`.

  @return {Array|Object} The errors either flattened into a single array, grouped in
  by key in an object, or a single array of [can-validate.error] items. If no
  `format` is passed, errors will be returned in the raw parsed format.

@body

## Usage

The `errors` value should match the possible [can-validate.errors] type.  `formatErrors` will process any [can-validate.errors] type into the requested format.

```js
// Given a validator returns some errors...
var errors = someValidator(person, constraints);//> ['is required', {message: 'is invalid'}];
formatErrors(errors, 'flat');//> ['is required', 'is invalid']
```



### Example Outputs

If no key exists in the error response, an array like object will be created.

```json
{
	"0": ["is required", "must be a number"]
}
```

**Flattening Errors**

Using `flat`, an array of strings will be returned.

```json
[
	"is required",
	"must be a number"
]
```

**Converting to [can-validate.error-object] type**

Using `errors`, an object of errors formatted using the [can-validate.error-object]
type will be returned.

If a key name exists with the original error, using the [can-validate.error-object]
type will include the key name in the `related` property.

```json
[
	{ "message": "is required", "related": []},
	{ "message": "must be a number", "related": []}
]
```

**Handling errors without `related`**

An error is not required to include a key name.

```json
[
	"is required",
	{"message": "must be a number"},
	{"message": "must be a number", "related": ["zipCode"]}
]
```

Because only one item in the array has a `related` property, the other two items
will be grouped together by assigning them the wildcard (`*`) key. Once processed,
the errors will be normalized internally. The normalized errors are used when
converting errors to the requested format.

```json
[
	{"message": "is required", "related": ["*"]},
	{"message": "must be a number", "related": ["*"]},
	{"message": "must be a number", "related": ["zipCode"]}
]
```
