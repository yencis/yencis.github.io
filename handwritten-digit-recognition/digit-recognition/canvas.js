const canvas = document.getElementById('canvas');
const tempCanvas = document.getElementById('tempCanvas');
const ctx = canvas.getContext('2d');
const tempCtx = tempCanvas.getContext("2d");
//const preview = document.getElementById("preview")
let mouseX, mouseY;
let mouseClicked = false;

canvas.addEventListener('mousedown', mouseDown, false);
canvas.addEventListener('mousemove', mouseMove, false);
window.addEventListener('mouseup', mouseUp, false);
ctx.width  = 28;
ctx.height = 28;
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

function drawPixel(ctx, x, y) {
    //let pixel = ctx.getImageData(x, y, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.beginPath()
    ctx.arc(x,y,10,0,2*Math.PI)
    ctx.fill()
   /* pixel.data[0] = 255;
    pixel.data[1] = 255;
    pixel.data[2] = 255;
    pixel.data[3] = 255;
    ctx.putImageData(pixel, x, y);*/
}

function clearCanvas() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function getMousePos(e) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
}

function mouseDown() {
    mouseClicked = true;
    drawPixel(ctx, mouseX, mouseY);
}

function mouseUp() {
    mouseClicked = false;
}

function mouseMove(e) {
    getMousePos(e);
    if (mouseClicked) drawPixel(ctx, mouseX, mouseY);
}

function exportData() {
    //let data = ctx.getImageData(0,0,canvas.width,canvas.height);
    //console.log(data)
    var im28x28 = new Image()
    im28x28.src = canvas.toDataURL().toString()
    //preview.src = canvas.toDataURL();
   // console.log(im28x28.src)
    im28x28.onload=function() {
        tempCtx.drawImage(im28x28, 0, 0, 28, 28)

        console.log("Image loaded")
    };
    //tempCtx.fillRect(0,0,28,28)
    //tempCtx.scale(0.5,0.5)
    //tempCtx.putImageData(data,0,0)
    console.log("returning data")
    //return data
}
