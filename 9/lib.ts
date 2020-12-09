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
  let testNumberIndex = entries[lookbackSize + 1];
  let invalidEntries = [];
  while (testNumberIndex < entries.length) {
    const numbers = entries.slice(testNumberIndex - lookbackSize, testNumberIndex);
    const testNumber = entries[testNumberIndex];
    const isValid = numberIsSumOfNumbers(testNumber, numbers);
    console.log(`Testing ${testNumber} against ${numbers.join(",")}. valid: ${isValid}`);
    if (isValid) {
      invalidEntries.push(testNumber);
    }
    testNumberIndex += 1;
  }

  return invalidEntries;
};

export {numberIsSumOfNumbers, findInvalidEntries};