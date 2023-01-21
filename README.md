# isTruthy

### TL;DR:
```  
npm i istruthy-js  
```  
This function checks if the given data is truthy.  
By default: if an object, array, set, or map contains ANY truthy values, it is truthy.  
By default: the value 0 is considered as truthy.

Package at: https://www.npmjs.com/package/istruthy-js


## Supports the following data types:
 - boolean
 - number
 - string
 - objects
 - arrays
 - nested arrays
 - sets
 - nested sets
 - maps
 - nested maps
 - null
 - undefined
 - NaN

<br>

### Disclaimer
This function is primarily designed for use in frontend applications, where it can be utilized to ensure that rendered elements are truthy and prevent potential crashes in the user interface.  
While it may have additional potential use cases, this is the main purpose of the function.

<br>
<hr>
<br>

## Parameters
- `data` (required): The data, object or array to check.
- `zero` (optional): If this parameter === false, then 0 is also considered falsy.
- `obj` (optional): If this parameter === true, then the function will only allow objects where all values are truthy.

### Returns
- `true` if the data is truthy.
- `false` if the data is falsy.

### Usage
import { isTruthy } from 'isTruthy';

console.log(isTruthy(true)); // true  
console.log(isTruthy(false)); // false   

console.log(isTruthy(0)); // true  
console.log(isTruthy(0, false)); // false

Check the example test script (using Jest) for detailed examples.

## Notes

- The function uses `Object.getOwnPropertyNames(data)` and `Object.getPrototypeOf(data)` to check if the given data is an object and if it is empty or not.
- The function uses `Array.isArray(data)` to check if the given data is an array.
- The function uses `typeof(data)` to check the type of data.
- The function uses `for...of` loop to iterate over sets and maps.
- If `zero` parameter is set to false, the function considers 0 as falsy.
- If `obj` parameter is set to true, the function will only allow objects where all values are truthy.

<hr>

## Currently known constraints
Things the isTruthy function cannot (currently) handle:  
Classes  
Funnctions  
Generators  
Enums  
.. Maybe others I missed?
