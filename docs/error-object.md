@typedef {object} can-validate/types/error Error
@parent can-validate/types

An object that defines a validation failure.

@option {string} message A reason why some value is in an invalid state.

@option {array} [related] An array of related parts for this error.


@body

## Example

```json
{ "message": "is required", "related": ["age"]}
```
