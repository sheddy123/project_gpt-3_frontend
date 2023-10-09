import { brandData } from "../Constants/ComponentsConstants/constants";

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

export function getFeedback(grade) {
  if (grade === 0) {
    return "Your effort is acknowledged, but there's room for improvement. Consider reaching out for assistance and diving deeper into the course materials. Your dedication will lead to a comprehensive grasp of the subject.";
  } else if (grade < 3) {
    return "You're on the right track, but more effort is required to excel. Take the time to review the course materials, ask questions, and engage with the subject more actively. Keep going, and you'll see progress!";
  } else if (grade === 3) {
    return "Well done! You've met the expectations for this assessment. Continue your commitment to learning, and consider exploring additional resources to enhance your understanding even further.";
  } else if (grade > 3 && grade < 5) {
    return "Great job! Your hard work is paying off. To push beyond, consider exploring advanced topics, discussing concepts with peers, or attempting additional challenges. Keep up the good work!";
  } else if (grade === 5) {
    return "Congratulations on your outstanding performance! Your dedication, understanding, and effort shine through. Keep exploring, stay curious, and keep up the excellent work!";
  } else {
    return "Invalid grade";
  }
}

// Calculate student progress
export function calculateStudentProgress(courses) {
  let totalQuestions = 0;
  let totalQuestionsTaken = 0;

  // Simulated data
  // const courses = [
  //   {
  //     name: 'Course 1',
  //     levels: ['Easy', 'Medium', 'Hard'],
  //     questionsPerLevel: 5,
  //     questionsTaken: {
  //       Easy: 5,
  //       Medium: 5,
  //       Hard: 5,
  //     },
  //   },
  //   // Add more courses...
  // ];
  // Calculate the total number of questions and questions taken
  courses.forEach((course) => {
    course.levels.forEach((level) => {
      const questionsTaken = course.questionsTaken[level] || 0;
      totalQuestions += course.questionsPerLevel;
      totalQuestionsTaken += questionsTaken;
    });
  });

  // Calculate progress percentage
  const progress = (totalQuestionsTaken / totalQuestions) * 100;
  return progress.toFixed(2); // Round to 2 decimal places
}

export function convertMillisecondsToTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  return formattedTime;
}

export function convertMillisecondsToTimeToString(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedTime = `${hours}h ${minutes}min ${seconds}sec`;
  return formattedTime;
}

export function getInitials(fullName) {
  const words = fullName.split(" ");
  const initials = words.map((word) => word.charAt(0).toUpperCase()).join(".");
  return `(${initials})`;
}

export function getImageURLForBrand(brand: string): string | undefined {
  let firstWord = brand.split(" ")[0].toLowerCase();
  if (firstWord === "c#") firstWord = "csharp";
  else if (firstWord === "c++") firstWord = "cpp";
  else if (firstWord === "javascript") firstWord = "js3";
  else if (firstWord === "operating") firstWord = "os";

  for (const imgUrl of brandData.img) {
    const fileName = imgUrl.split("/").pop();
    if (fileName && fileName.toLowerCase().includes(firstWord)) {
      return imgUrl;
    }
  }

  return undefined; // Brand not found
}

export function truncateString(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
}

export const moveSelectOneToTop = (options) => {
  if (options) {
    const selectOneIndex = options.findIndex((item) => item.id === 0);

    if (selectOneIndex !== -1) {
      const selectOneOption = options.splice(selectOneIndex, 1)[0];
      options.unshift(selectOneOption);
    }

    return options;
  }
  return options;
};

export const removeObjectById = (array, id) => {
  if (!array) return;
  return array.filter((item) => item.id !== id);
};

export function getArraysForFields(data) {
  const arrays = {};

  data?.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (
        key.endsWith("Id") &&
        item[key] !== null &&
        item[key.replace("Id", "Value")] !== null
      ) {
        const fieldName = key.replace("Id", "");
        if (!arrays[fieldName]) {
          arrays[fieldName] = [];
        }
        arrays[fieldName].push({
          id: item[key],
          value: item[key.replace("Id", "Value")],
        });
      }
    });
  });

  return arrays;
}

export function assignValue(inputString, comparisonValue, defaultValue) {
  const number = parseFloat(inputString);
  const value = parseFloat(comparisonValue);
  const defaultNumber = parseFloat(defaultValue);

  if (!isNaN(number) && number <= value) {
    return number;
  } else {
    return defaultNumber;
  }
}


 export function containsSentenceWithPrefix(inputString, targetString) {
  if(inputString.includes(targetString)){
    return true;
  }
   // Define an array of delimiters to split targetString
   const delimiters = ['@@', ';'];

   // Iterate through each delimiter and split targetString
   for (const delimiter of delimiters) {
     const parts = inputString.split(delimiter);
     // Iterate through the parts and check if any of them matches the inputString
     for (const part of parts) {
      //console.log(part, "<==>", targetString, part.trim() === targetString);
       if (part.trim() === targetString.trim()) {
         return true;
       }
     }
   }
   
   return false;
}