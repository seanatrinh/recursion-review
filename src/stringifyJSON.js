// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
/*
I
- object/array
O
- string
C
-
E
- primitive value types should have an outcome of their own (either throw an error or do something else)

ex: [1, {a: 1, b: 2}, 2]

*/
var stringifyJSON = function(obj) {
  // create result string
  var result = "";
  // is the input an object
  // undefined, null, number, boolean, string,
  // case if primitve
  // return stringified version of primitive

  if (typeof obj === 'undefined') {
    result += 'undefined'
  } else if (typeof obj === 'string') {
    result += '"' + obj + '"'
  } else if (typeof obj === 'number') {
    result += obj
  } else if (obj === null) {
    return 'null'
  } else if (typeof obj === 'boolean') {
    result += obj
  }

  // case if array
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      // result += '['
      result += '['
      // loop through the array
      for (var i = 0; i < obj.length; i++) {
        // result += stringifyJSON(array[index])
        result += stringifyJSON(obj[i])
        if (i !== obj.length - 1) {
          result += ','
        }
      }
      result += ']'
    } else {
      result += '{'
      var keys = Object.keys(obj);
      for (var i = 0; i < keys.length; i++) {
        console.log(typeof keys[i] === 'function');
        if (typeof obj[keys[i]] === 'function' || obj[keys[i]] === undefined) {
          continue;
        }
        // if function do something else
        result += '"' + keys[i] + '":' + stringifyJSON(obj[keys[i]]);
        if (i !== keys.length - 1) {
          result += ','
        }
      }
      result += '}'
    }
  }
  // console.log(result)
  return result
};

console.log(JSON.stringify({ x: 5, y: 6 }));
// expected output: "{"x":5,"y":6}"