function test(){
    console.log("Working");
}

function nav_button(){
    var navBar = document.getElementsByClassName("navbar-new")[0];
    if (navBar.style.width!="10rem"){
        display_nav(0);
        navBar.style.width="10rem";
    }else{
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
