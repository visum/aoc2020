const numberIsSumOfNumbers = (testNumber:Number, numbers:number[]):boolean => {
  let isSum = false;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i; j < numbers.length; j++) {
      if (!isSum) {
        console.log(`Testing ${numbers[i]}+${numbers[j]}=${numbers[i] + numbers[j]} against ${testNumber}`)
        isSum = (numbers[i] + numbers[j]) === testNumber;
      }
    }
  }

  return isSum;
}

export {numberIsSumOfNumbers};