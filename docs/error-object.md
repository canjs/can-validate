@typedef {object} can-validate/types/error Error
@parent can-validate/types

An object that defines a validation failure.

@option {string} message A reason why value is in an invalid state.

@option {string|array} [related] Key names that are related to triggering the
invalid state of the current value.


@body

## Examples

```json
{ "message": "is required", "related": ["billingZip", "residenceZip"]}
```


```json
{ "message": "is required", "related": "age"}
```


```json
{ "message": "is required"}
```
