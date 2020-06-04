Maze.prototype.bfs = function(){
    let cur = this.getStart();
    let goal = this.getEnd();
    let queue = new Queue();

    cur.setVisited(true);
    queue.enqueue(cur);

    while(queue.size() !== 0){
        cur = queue.dequeue();

        if (cur.isSame(goal)) break;

        if (cur.getVisited() === false) {
            cur.setType("bfs");
            cur.setVisited(true);
        }

        let neighbors = this.neighbors(cur.getRow(), cur.getCol(), 1);
        for (let next of neighbors){
            if (!next.getVisited() && (next.getType() !== 1)){
                    queue.enqueue(next);
            }
        }
    }
    this.render();
    this.reset();
};