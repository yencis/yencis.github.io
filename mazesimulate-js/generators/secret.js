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

        if (this.value[startY][startX].value === 0) {
            startCell = this.value[startY][startX];
            startCell.setType(0);
            //this.value[startY][startX].setType(2);
            break;
        }
    }
    let q = new Queue();
    q.enqueue(startCell);
    let visited = [];
    while(q.size()!==0){
        let curCell = q.dequeue();
        let x = curCell.getCol();
        let y = curCell.getRow();
        /*if (contains(visited,curCell)){
            continue;
        }*/
       // visited.push(curCell);
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
            }else if (contains(visited,this.value[y+dy*2][x+dx*2])){
                iter++;
                continue;
            }else{
                this.value[y+dy][x+dx].setType(0);
                q.enqueue(this.value[y+dy*2][x+dx*2]);
                visited.push(this.value[y+dy*2][x+dx*2]);
                trueIter++;
                continue;
            }
        }
    }
    console.log("Done");
    // Generate start/end positions

   /* while(true) {
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
    }*/
};


function contains(array, value){
    console.log(value);
    for (let i = 0;i<array.length;i++){
        if (value.isSame(array[i])){
            return true;
        }
    }
    return false;
}