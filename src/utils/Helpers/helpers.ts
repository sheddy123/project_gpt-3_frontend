export function trimAndConvertToLowerCase(str) {
  // Remove whitespace characters using trim()
  const trimmedStr = str.replace(/\s/g, "");

  // Convert the string to lowercase using toLowerCase()
  const lowercaseStr = trimmedStr.toLowerCase();

  return lowercaseStr;
}

export function getNonEmptyProperty(obj) {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop) && obj[prop] !== "") {
      return prop;
    }
  }
  return null; // Return null if no non-empty property is found
}
