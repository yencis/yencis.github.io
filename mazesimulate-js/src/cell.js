// Define cells using attributes: type, location (row/col)
var Cell = function(cellType){ // 0 = space, 1 = wall; 2 = start; 3 = finish; bfs, dfs
    this.value = cellType;
    this.row = null;
    this.col = null;
    this.visited = false;
};

Cell.prototype.getColor = function(){
    if (this.value === 0) return "#FFFFFF";
    else if (this.value === 1) return "#000000";
    else if (this.value === 2) return "#44db44";
    else if (this.value === 3) return "#d40002";
    else if (this.value === "bfs") return "#e8c566";
    else if (this.value === "dfs") return "#fff300";
};

Cell.prototype.setPos = function(row, col){
    this.row = row;
    this.col = col;
};

Cell.prototype.getRow = function(){
    return this.row;
};

Cell.prototype.getCol = function(){
    return this.col;
};

Cell.prototype.setType = function(type){
    this.value = type;
};

Cell.prototype.getType = function(){
    return this.value;
};

Cell.prototype.setVisited = function(state){
    this.visited = state;
};

Cell.prototype.getVisited = function(){
    return this.visited;
};

Cell.prototype.isSame = function(a){
    return ((a.getRow() === this.getRow()) && (a.getCol() === this.getCol()));
};