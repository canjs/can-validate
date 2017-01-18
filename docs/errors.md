@typedef {undefined|string|ERROR|array} can-validate/types/errors Errors
@parent can-validate/types

The expected response from a validator if a value fails validation.

@option {undefined|null} Expected when value passes validation.

@option {string} A message explaining the validation failure.

```javascript
"is required"
```

@option {array} Items can be any of the valid [can-validate/types/errors].

```json
["is required", { "message": "is required", "related": ["billingZip", "residenceZip"]}]
```

@option {ERROR} An object used to describe an error message. See [can-validate/types/error].

```json
{ "message": "is required", "related": ["billingZip", "residenceZip"]}
```
