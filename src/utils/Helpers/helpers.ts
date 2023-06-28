export function trimAndConvertToLowerCase(str) {
    // Remove whitespace characters using trim()
   const trimmedStr = str.replace(/\s/g, '');

  // Convert the string to lowercase using toLowerCase()
  const lowercaseStr = trimmedStr.toLowerCase();

  return lowercaseStr;
}
