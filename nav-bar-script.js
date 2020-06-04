function test(){
    console.log("Working");
}

function nav_button(){
    var navBar = document.getElementsByClassName("navbar-new")[0];
    var navButton = document.getElementsByClassName("nav-button")[0];
    if (navBar.style.width!="10rem"){
        navButton.style.color = "white";
        display_nav(0);
        navBar.style.width="10rem";
    }else{
        update_button();
        display_nav(1);
        navBar.style.width="0rem";
    }


}

function display_nav(i){
    var navBar = document.getElementsByClassName("navbar-nav-new")[0];
    if (i==0)
        navBar.style.display = "block";
    else
        navBar.style.display="none";
}

function info_button(i){
    var navItem = document.getElementsByClassName("the-link")[i];
    var infoBox = document.getElementsByClassName("info-box")[i];
    console.log("pressed button")
    if (infoBox.style.height=="0rem"||infoBox.style.height==0){
        navItem.style.display = "none";
        infoBox.style.height = "15rem"
    }else{
        infoBox.style.height = "0rem";
        navItem.style.display= "block";
    }

}