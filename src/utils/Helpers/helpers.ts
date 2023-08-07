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

export const validateRequired = (value) => !!value.length;
export const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
export const validateAge = (age) => age >= 18 && age <= 50;