type seat = "floor" | "available" | "occupied";
type strategies = "nextVisible" | "adjacent";

const charStatusMap = {
  "L": "available",
  ".": "floor",
  "#": "occupied"
};

const statusCharMap = {
  "available": "L",
  "floor": ".",
  "occupied": "#"
};

type seatState = seat[][];

export default class SeatSimulator {
  static cloneState(inputState: seatState): seatState {
    const copy:seatState = [];
    inputState.forEach(row => {
      copy.push(row.slice());
    });
    return copy;
  }

  static statesAreSame(a:seatState, b:seatState): boolean {
    return a.every((row, rowIndex) => 
      row.every((seat, seatIndex) => 
        seat === b[rowIndex][seatIndex]));
  }

  state: seatState = [];

  loadLayout(layout: string) {
    this.state = [];
    const rows = layout.split("\n");
    rows.forEach(row => {
      const rowStatuses = row.split("") as ("L" | "." | "#")[];
      this.state.push(rowStatuses.map(char => charStatusMap[char] as seat));
    });

  }

  step(strategy: strategies) {
    const newState = SeatSimulator.cloneState(this.state);
    this.state.forEach((row, rowIndex) => {
      row.forEach((seat, columnIndex) => {
        newState[rowIndex][columnIndex] = this.getNewSeatStatus(rowIndex, columnIndex, strategy);
      });
    });
    this.state = newState;
  }

  adjacentSeatStrategy(row: number, column: number): seat {
    const seat = this.state[row][column];

    if (seat === "floor") {
      return "floor";
    }

    let neighbors = [ 
      [row - 1, column - 1], [row - 1, column], [row - 1, column + 1],
       [row, column - 1],      /*this seat*/      [row, column + 1],
      [row + 1, column - 1], [row + 1, column], [row + 1, column + 1]
    ];
    let occupiedNeighbors = 0;
    
    for(let i = 0; i <= neighbors.length - 1; i++){
      const [row, column] = neighbors[i];
      if (!this.seatIsInBounds([row, column])) {
        continue;
      }
      occupiedNeighbors += this.state[row][column] === "occupied" ? 1 : 0;
    }

    if (seat === "occupied" && occupiedNeighbors >= 4) {
      return "available";
    }

    if (seat === "available" && occupiedNeighbors === 0) {
      return "occupied";
    }

    return seat;
  }

  seatIsInBounds([row, column] : [number, number]) {
    const rowMax = this.state.length - 1;
    const columnMax = this.state[0].length - 1;
    return row >= 0 && row <= rowMax && column >= 0 && column <= columnMax;
  }

  findSeatInDirection = (start: [number, number], direction: [number, number]): seat | null => {
    let theSeat = null;
    let checkSpot = start;
    while(theSeat !== "occupied" && theSeat !== "available" && theSeat !== undefined) {
      checkSpot[0] += direction[0];
      checkSpot[1] += direction[1];
      if (!this.seatIsInBounds(checkSpot)) {
        return null;
      }
      theSeat = this.state[checkSpot[0]][checkSpot[1]];
    }

    return theSeat;
  };

  nextVisibleSeatStrategy(row: number, column: number): seat {
    const thisSeat = this.state[row][column];
    if (thisSeat === "floor") {
      return "floor";
    }

    const directions: [number,number][] = [
      [-1,-1], [-1,0], [-1,1],
      [0,-1], [0,1],
      [1,-1], [1,0], [1,1]
    ];

    const numOccupiedNeighbors = directions.reduce((sum, direction) => {
      if (this.findSeatInDirection([row, column], direction) === "occupied") {
        return sum + 1;
      }
      return sum;
    }, 0);

    if(thisSeat === "occupied" && numOccupiedNeighbors >= 5) {
      return "available";
    }

    if(thisSeat === "available" && numOccupiedNeighbors === 0) {
      return "occupied";
    }

    return thisSeat;
  }

  getNewSeatStatus(row:number, column:number, strategy: strategies): seat {
    if (strategy === "nextVisible"){
      return this.nextVisibleSeatStrategy(row, column);
    } else {
      return this.adjacentSeatStrategy(row, column);
    }
  }

  countSeatsWithStatus(status:seat): number {
    return this.state.reduce((sum, row) => {
      return sum + row.reduce((seatSum, seat) => {
        return seatSum + (seat === status ? 1 : 0);
      }, 0)
    }, 0);
  }

  runUntilStable(strategy: strategies) {
    let currentState;
    let changed = true;
    while (changed) {
      currentState = SeatSimulator.cloneState(this.state);
      this.step(strategy);
      changed = !SeatSimulator.statesAreSame(currentState, this.state);
    }
  }

  serialize() {
    return this.state.map(row => row.map(seat => statusCharMap[seat]).join("")).join("\n");
  }

}