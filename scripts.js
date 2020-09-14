var flickerStatus = 1;

function update_button(...yvals){
    var nButton = document.getElementsByClassName("nav-button")[0];
    var navBar = document.getElementsByClassName("navbar-new")[0];

    for (var i = 0;i<yvals.length;i++) {
        if ((i==yvals.length-1&&window.scrollY>yvals[i]) || (window.scrollY > yvals[i] && window.scrollY < yvals[i+1] && i%2==0) || navBar.style.width == "10rem") {
            nButton.style.color = "#FFFFFF";
            break;
        } else {
            nButton.style.color = "#3264b0";
        }
    }
}


function flicker(){
    if (flickerStatus==0) return;
    var i = parseInt(Math.random()*4);
    document.getElementsByClassName("text")[i].style.color = "#474747";
    //document.getElementsByClassName("text")[i].style.animation= "none";
    document.getElementsByClassName("text")[i].style.textShadow= "none";
    console.log("hello");

    setTimeout(function() {
        console.log("helo2");
        document.getElementsByClassName("text")[i].style.color = "white";
        //document.getElementsByClassName("text")[i].style.animation = "glow 1s ease-in-out infinite alternate";
        document.getElementsByClassName("text")[i].style.textShadow= "0 0 10px #ffffff, 0 0 20px #ffffff, 0 0 30px #ffffff, 0 0 40px #ffffff, 0 0 50px #ffffff, 0 0 60px #ffffff, 0 0 70px #ffffff";
    }
    ,1000);
}

function toggleFlicker(){
    flickerStatus = 1-flickerStatus;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}