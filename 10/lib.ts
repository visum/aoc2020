const buildAdapterChain = (adapters:number[]) => {
  // sort the adapters, small to large
  const sorted = adapters.slice().sort((a, b) => a - b);
  // Since we are using every adapter in the bag, we won't skip any and sorting should be enough
  // add a 0 at the beginning to represent the outlet
  sorted.unshift(0);
  // Add the last one, always 3 higher than the last one.
  const highest = sorted[sorted.length - 1];
  sorted.push(highest + 3);
  return sorted;
}

const countIntervalTypes = (adapters:number[]) => {
  const intervals = new Map<number, number>();
  for(let i = 0; i < adapters.length - 1; i++){
    const first = adapters[i];
    const second = adapters[i+1];
    const interval = second - first;
    if (interval > 3){
      throw new Error("Interval greater than 0 detected between indexes " + i + (i+1));
    }
    const oldValue = intervals.get(interval) || 0;
    intervals.set(interval, oldValue + 1);
  }
  return intervals;
}

export {buildAdapterChain, countIntervalTypes};