// part one things
export function getNextDepartureAfter(interval: number, startTime: number) {
  const previousDeparture = Math.floor(startTime / interval);
  return (previousDeparture + 1) * interval;
}

export function getNextRoute(routes: number[], startTime: number) {
  const startTimes = routes
    .map(route => [route, getNextDepartureAfter(route, startTime)])
    .sort(([, departureA], [, departureB]) => departureA - departureB);
  return startTimes[0][0];
}

export function parseSchedule(schedule: string) {
  const [startTimeString, routesString] = schedule.split("\n");

  return { 
    startTime: parseInt(startTimeString, 10),
    routes: routesString.split(",").map(i => parseInt(i, 10)).filter(i => !isNaN(i))
  }
}

// Part two things. Not much overlap today
export function findPartTwoSolution(routes:string, startAt = 0) {
  const routePositions: [number, number][] = routes.split(",").reduce((accumulator, current, index) => {
    const routeNumber = parseInt(current, 10);
    if (!isNaN(routeNumber)) {
      const entry = [index, routeNumber] as [number, number];
      accumulator.push(entry);
    }
    return accumulator;
  }, [] as [number, number][]);

  let [,testTimestamp] = routePositions[0];
  const multiplier = testTimestamp;

  if (startAt > 0) {
    testTimestamp = (Math.floor(startAt / testTimestamp) + 1) * testTimestamp;
  }

  let passed = false;
  let feedbackTimer = 0;

  outerLoop:
  while(!passed) {
    feedbackTimer++;
    if (feedbackTimer > 50000000) {
      feedbackTimer = 0;
      console.log(`Testing ${testTimestamp}`);
    }
    for (let i = 1; i < routePositions.length; i++) {
      const [offset, route] = routePositions[i];
      if ((testTimestamp + offset) % route !== 0) {
        testTimestamp = testTimestamp + multiplier;
        continue outerLoop;
      }
    }
    passed = true;
  }
  return testTimestamp;
}