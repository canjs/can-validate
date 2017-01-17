@typedef {undefined|string|ERROR|array} can-validate/types/errors errors
@parent can-validate/types

The expected response from a validator if a value fails validation.

@option {undefined|null} Expected when value passes validation.

@option {string} A message explaining the validation failure.

```javascript
"is required"
```

@option {array} Can be an array of strings or an array of [can-validate/types/error] types.

```javascript
["is required"]
```

@option {ERROR} An object used to describe an error message. See [can-validate/types/error].

```javascript
{ "message": "is required", "related": []}
```
