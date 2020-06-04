//New simpleGen file.

Maze.prototype.simpleGen = function(){

    //Set maze to be a grid.
    let startCell = null;
    for (let r = 1; r < this.getHeight(); r++) {
        for (let c = 0; c < this.getWidth(); c++) {
            let curCell = this.value[r][c];
            if (r % 2 == 0){
                curCell.setType(1);
            }else {
                if (c % 2 == 0) {
                    curCell.setType(1);
                } else if (c % 2 == 1) {
                    curCell.setType(0);
                    if (startCell === null){
                        startCell = curCell;
    }}}}}

    let visited = [];
    let q = new Queue();
    q.enqueue(startCell);
    while(q.size()!==0){
        console.log(visited);
        let curCell = q.dequeue();
        if(contains(visited,curCell)){
            continue;
        };
        visited.push(curCell);
        //Two connections for every cell
        let neighborCells = this.neighbors(curCell.getRow(),curCell.getCol(),2);
        //choice1 = randomInt(neighborCells.length);
        //choice2 = randomInt(neighborCells.length);
        let lastChoice = 5;
        for (let i = 0;i<2;i++){
            let choice = 0; //Filler Value, Never Used
            let selectedCell = curCell; //Filler Value, Never Used
            for (let i = 0;i<10;i++) {
                choice = randomInt(neighborCells.length);
                selectedCell = neighborCells[choice];
                if (contains(visited, selectedCell)) {
                    continue;
                }
                break;
            }
            let connectingCell = this.value[curCell.getRow()+((selectedCell.getRow()-curCell.getRow())/2)][curCell.getCol()+((selectedCell.getCol()-curCell.getCol())/2)];
            lastChoice = choice;
            connectingCell.setType(0);
            q.enqueue(selectedCell);
        }
    }

    while(true) {
        let endX = Math.floor(Math.random() * Math.floor(this.getWidth()));
        //let endY = Math.floor(Math.random() * Math.floor(rows));
        if (this.value[this.getHeight()-2][endX].value === 0){
            this.setEnd(this.value[this.getHeight()-2][endX]);
            break;
        }
    }

    while(true) {
        let startingX = Math.floor(Math.random() * Math.floor(this.getWidth()));
        //let endY = Math.floor(Math.random() * Math.floor(rows));
        if (this.value[1][startingX].value === 0){
            this.setStart(this.value[1][startingX]);
            break;
        }
    }

    console.log("Done");

};

function randomInt(max){
    return Math.floor(Math.random() * Math.floor(max));
};

function contains(array, value){
    for (let i = 0;i<array.length;i++){
        if (value.isSame(array[i])){
            return true;
        }
    }
    return false;
};