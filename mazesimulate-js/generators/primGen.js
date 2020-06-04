Maze.prototype.primGen = function () {
    this.setAllWall(); // Prim's starts with full maze of walls

    let cur = this.value[Math.floor(this.getHeight() / 2)][Math.floor(this.getWidth() / 2)];
    let frontier = [];
    for (let frontierCell of this.neighbors(cur.getRow(), cur.getCol(), 2)){
        frontier.push(frontierCell);
    }

    while(frontier.length > 0){
        let pickIndex = Math.floor(Math.random() * frontier.length);
        cur = frontier[pickIndex]; // Pick random frontier cell
        cur.setType(0);
        frontier.splice(pickIndex, 1);

        // Pick a neighbor to connect
        let neighbors = this.neighbors(cur.getRow(), cur.getCol(), 2);
        for (let i = 0; i < neighbors.length; i++){
            if (neighbors[i].getType() !== 1)
                neighbors.splice(i, 1);
        }
        let toconnect = neighbors[Math.floor(Math.random() * neighbors.length)];
        this.connect(cur, toconnect);

        // Add frontier cells of the chosen neighbor to list
        for (let newfrontierCell of this.neighbors(cur.getRow(), cur.getCol(), 2)){
            if (newfrontierCell.getType() === 1)
                frontier.push(newfrontierCell);
        }
    }
};