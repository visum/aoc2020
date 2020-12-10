const numberIsSumOfNumbers = (testNumber:Number, numbers:number[]):boolean => {
  let isSum = false;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i; j < numbers.length; j++) {
      if(i === j) {
        continue;
      }
      if (!isSum) {
        // console.log(`Testing ${numbers[i]}+${numbers[j]}=${numbers[i] + numbers[j]} against ${testNumber}`)
        isSum = (numbers[i] + numbers[j]) === testNumber;
      }
    }
  }

  return isSum;
}

const findInvalidEntries = (lookbackSize:number, entries:number[]) => {
  let testNumberIndex = lookbackSize + 1;
  let invalidEntries = [];
  while (testNumberIndex < entries.length) {
    const numbers = entries.slice(testNumberIndex - lookbackSize, testNumberIndex);
    const testNumber = entries[testNumberIndex];
    const isValid = numberIsSumOfNumbers(testNumber, numbers);
    if (!isValid) {
      invalidEntries.push(testNumber);
    }
    testNumberIndex += 1;
  }

  return invalidEntries;
};

const findContiguousNumbersThatEqualNumber = (testNumber:number, entries:number[]) => {
  let lowerBound = 0;
  let upperBound = 1;
  // Raise the upper bound until we reach or exceed the test number
  // when we exceed the test number, raise the lower bound until we reach or go below the test number
  while(lowerBound < entries.length - 2 && upperBound < entries.length - 1){
    const range = entries.slice(lowerBound, upperBound+1);
    const sum = range.reduce((sum, current) => sum + current, 0);
    if (sum === testNumber){
      return range;
    }
    if (sum < testNumber){
      upperBound += 1;
    }
    if (sum > testNumber) {
      lowerBound += 1;
    }
  }

  console.log("No matching range of numbers was found");
  return null;
};

export {numberIsSumOfNumbers, findInvalidEntries, findContiguousNumbersThatEqualNumber};