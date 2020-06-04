var Maze = function() {
    this.value = [];
    this.start = null;
    this.end = null;
    this.width = null;
    this.height = null;
};

Maze.prototype.setDimensions = function(height, width){
    this.height = height;
    this.width = width;
};

Maze.prototype.getWidth = function(){
    return this.width;
};

Maze.prototype.getHeight = function(){
    return this.height;
};

Maze.prototype.setStart = function(a){
    a.setType(2);
    this.start = a;
};

Maze.prototype.setEnd = function(a){
    a.setType(3);
    this.end = a;
    console.log(this.end);
};

Maze.prototype.getStart = function(){
    return this.start;
};

Maze.prototype.getEnd = function(){
    return this.end;
};

Maze.prototype.neighbors = function(row, col, distance){
    let output = [];

    if (row - distance >= 0) output.push(this.value[row - distance][col]);
    if (col - distance >= 0) output.push(this.value[row][col - distance]);
    if (row + distance < this.getHeight()) output.push(this.value[row + distance][col]);
    if (col + distance < this.getWidth()) output.push(this.value[row][col + distance]);

    return output;
};

Maze.prototype.connect = function(first, second){
    if (first.getRow() === second.getRow())
        this.value[first.getRow()][(first.getCol() + second.getCol()) / 2].setType(0);
    else
        this.value[(first.getRow() + second.getRow()) / 2][first.getCol()].setType(0);
};

Maze.prototype.init = function(height, width){ // initializes 2D array of empty space and sets locations
    this.setDimensions(height, width);

    for (let i = 0; i < height; i++){
        this.value.push([]);
        for (let j = 0; j < width; j++){
            if (i === 0 || j === 0 || i === (height - 1) || j === (width - 1)){ // Borders are walls automatically
                let cell = new Cell(1);
                cell.setPos(i, j);
                this.value[i].push(cell);
            }
            else{ // Everything else initialize to be a empty cell
                let cell = new Cell(0);
                cell.setPos(i, j);
                this.value[i].push(cell);
            }
        }
    }
};

Maze.prototype.setAllWall = function(){ // This changes all cells to walls
    let height = this.getHeight();
    let width = this.getWidth();

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            this.value[i][j].setType(1);
        }
    }
};

Maze.prototype.generate = function(type){
    if (type === "simple") this.simpleGen();
    else if (type === "prim") this.primGen();
    else if (type === "brick") this.brickGen();
};

Maze.prototype.render = function(){ // Draw the maze
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    let rows = this.getHeight();
    let cols = this.getWidth();
    let cellSize = (WIDTH / cols) > (HEIGHT / rows) ? (HEIGHT / rows) : (WIDTH / cols);

    for (let row = 0; row < rows; row++){
        for (let col = 0; col < cols; col++){
            let cell = this.value[row][col];
            ctx.fillStyle = cell.getColor();

            let posX = col * cellSize;
            let posY = row * cellSize;
            ctx.fillRect(posX, posY, cellSize, cellSize);
        }
    }
};

Maze.prototype.solve = function(solveAlg){
    if (solveAlg === "dfs") this.dfs();
    else if (solveAlg === "bfs") this.bfs();
};

Maze.prototype.reset = function(){
    for (let r = 0; r < this.getHeight(); r++){
        for (let c = 0; c < this.getWidth(); c++){
            if (this.value[r][c].getVisited() && this.value[r][c].getType() !== 2){
                this.value[r][c].setVisited(false);
                this.value[r][c].setType(0);
            }
        }
    }
};