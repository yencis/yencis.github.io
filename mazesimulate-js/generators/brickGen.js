

//this file is a lost cause

Maze.prototype.brickGen = function(){
    let rows = this.getHeight();
    let cols = this.getWidth();

    for (let r = 1; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let curCell = this.value[r][c];
            if (r % 2 == 0){
                curCell.setType(1);
            }else {
                if (c % 2 == 0) {
                    curCell.setType(1);
                } else if (c % 2 == 1) {
                    curCell.setType(0);
                }
            }
        }
    }
    let startCell = null;
    while(true){ //get a valid start position
        let startX = Math.floor(Math.random() * Math.floor(cols));
        let startY = Math.floor(Math.random() * Math.floor(rows));

        startCell = new Cell(2);
        startCell.setPos(startY,startX);
        if (this.value[startY][startX].value === 0) {
            //this.value[startY][startX].setType(2);
            break;
        }
    }
    this.start = startCell;
    var q = [];
    q.push(startCell);
    var visited = [];
    console.log("Start Cell");
    console.log(startCell);
    while(!(q.length === 0)){
        let curCell = q.pop();
        let x = curCell.col;
        let y = curCell.row;
        let iter= 0;
        let trueIter = 0;
        while(true){
            //change in x
            let dx = 0;
            let dy = 0;
            //Getting neighbors
            if (iter === 10)break;
            if (trueIter === 2)break;
            let i = Math.floor(Math.random() * Math.floor(4));
            switch(i){
                case 0: dy = -1; break;
                case 1: dx = 1; break;
                case 2: dy = 1; break;
                case 3: dx = -1; break;
            }

            if (y+dy*2>=rows||x+dx*2>=cols||y+dy*2<0||x+dx*2<0||y+dy>=rows||x+dx>=cols||y+dy<0||x+dx<0){
                iter++;
                continue;
            }

            if (this.value[y+dy][x+dx].value === 0) {
                iter++;
                continue;
            }else if (contains(visited,((y+dy*2)+" "+(x+dx*2)))){
                iter++;
                continue;
            }else{
                this.value[y+dy][x+dx].setType(0);
                q.push(this.value[y+dy*2][x+dx*2]);
                visited.push((y+dy*2)+" "+(x+dx*2));
                trueIter++;
                continue;
            }
        }
    }

    // Generate start/end positions

   while(true) {
        let endX = Math.floor(Math.random() * Math.floor(cols));
        //let endY = Math.floor(Math.random() * Math.floor(rows));
        if (this.value[rows-2][endX].value === 0){
            this.setEnd(this.value[rows-2][endX]);
            break;
        }
    }

    while(true) {
        let startingX = Math.floor(Math.random() * Math.floor(cols));
        //let endY = Math.floor(Math.random() * Math.floor(rows));
        if (this.value[1][startingX].value === 0){
            this.setStart(this.value[1][startingX]);
            break;
        }
    }
};


function contains(array, value){
    for (let i = 0;i<array.length;i++){
        if (value === array[i]){
            return true;
        }
    }
    return false;
}

