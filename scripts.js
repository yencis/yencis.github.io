var flickerStatus = 1;
function update_button(){
    var nButton = document.getElementsByClassName("nav-button")[0];
    var navBar = document.getElementsByClassName("navbar-new")[0];
    if (window.scrollY>300 || navBar.style.width == "10rem"){
        nButton.style.color = "#FFFFFF";
    }else{
        nButton.style.color = "#3264b0";
    }
}

function flicker(){
    if (flickerStatus==0) return;
    var i = parseInt(Math.random()*4);
    document.getElementsByClassName("text")[i].style.color = "#474747";
    document.getElementsByClassName("text")[i].style.animation= "none";
    console.log("hello");

    setTimeout(function() {
        console.log("helo2");
        document.getElementsByClassName("text")[i].style.color = "white";
        document.getElementsByClassName("text")[i].style.animation = "glow 1s ease-in-out infinite alternate";
    }
    ,1000);
}

function toggleFlicker(){
    flickerStatus = 1-flickerStatus;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}