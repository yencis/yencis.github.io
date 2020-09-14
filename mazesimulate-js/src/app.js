canvas = document.getElementById("maze");
ctx = canvas.getContext("2d");

// Defining size of the canvas
const WIDTH = 600;
const HEIGHT = 600;
canvas.width = WIDTH;
canvas.height = HEIGHT;
let maze = null; // Create the maze object, make a new object every time init is run

// Link HTML elements to javascript to run commands
let GENERATE = document.getElementById("generate");
let TYPE = document.getElementById("type");
let ROWS = document.getElementById("rows");
let COLS = document.getElementById("cols");
let SOLVE = document.getElementById("solve");
let SOLVETYPE = document.getElementById("solvetype");

GENERATE.addEventListener("click", function(){
    init();
});

SOLVE.addEventListener("click", function(){
    search();
});


function init(){
    let mazeRows = ROWS.value;
    let mazeCols = COLS.value;
    let mazeType = TYPE.value;

    if (mazeRows%2==0)
        mazeRows=(parseInt(mazeRows)+1).toString()
    if (mazeCols%2==0)
        mazeCols=(parseInt(mazeCols)+1).toString()

    maze = new Maze();
    maze.init(mazeRows, mazeCols);
    maze.generate(mazeType);
    maze.render();
}

function search(){
    let solveAlg = SOLVETYPE.value;
    maze.solve(solveAlg);
}

init();
