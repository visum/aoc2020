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