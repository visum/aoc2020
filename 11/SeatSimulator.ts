type seat = "floor" | "available" | "occupied";

const charStatusMap = {
  "L": "available",
  ".": "floor",
  "#": "occupied"
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
    const rowLength = rows[0].length;
    const emptyRow = [];
    for(let i = 0; i < rowLength - 1; i++) {
      emptyRow.push(".");
    }
    rows.push(emptyRow.join(""));
    rows.unshift(emptyRow.join(""));

    rows.forEach(row => {
      const rowStatuses = row.split("") as ("L" | "." | "#")[];
      rowStatuses.push(".");
      rowStatuses.unshift(".");
      this.state.push(rowStatuses.map(char => charStatusMap[char] as seat));
    });

  }

  step() {
    const newState = SeatSimulator.cloneState(this.state);
    this.state.forEach((row, rowIndex) => {
      row.forEach((seat, columnIndex) => {
        newState[rowIndex][columnIndex] = this.getNewSeatStatus(rowIndex, columnIndex);
      });
    });
    this.state = newState;
  }

  getNewSeatStatus(row:number, column:number): seat {
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
    for(let i = 1; i <= neighbors.length -1; i++){
      const [row, column] = neighbors[i];
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

  countOccupiedSeats(): number {
    return this.state.reduce((sum, row) => {
      return sum + row.reduce((seatSum, seat) => {
        return seatSum + (seat === "occupied" ? 1 : 0);
      }, 0)
    }, 0);
  }

  runUntilStable() {
    let currentState;
    let changed = true;
    while (changed) {
      console.log(this.countOccupiedSeats());
      currentState = SeatSimulator.cloneState(this.state);
      this.step();
      changed = !SeatSimulator.statesAreSame(currentState, this.state);
    }
  }

}