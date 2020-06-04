Maze.prototype.dfs = function(){
    let cur = this.getStart();
    let goal = this.getEnd();
    let stack = new Stack();

    cur.setVisited(true);
    stack.push(cur);

    while(stack.size() !== 0){
        cur = stack.pop();

        if (cur.isSame(goal)) break;

        if (!cur.getVisited()){
            cur.setType("dfs");
            cur.setVisited(true);
        }

        let neighbors = this.neighbors(cur.getRow(), cur.getCol(), 1);
        for (let next of neighbors){
            if (!next.getVisited() && (next.getType() !== 1)){
                stack.push(next);
            }
        }
    }
    this.render();
    this.reset();
};