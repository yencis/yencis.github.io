function update_button(){
    var nButton = document.getElementsByClassName("nav-button")[0];
    var navBar = document.getElementsByClassName("navbar-new")[0];
    if (window.scrollY>300 || navBar.style.width == "10rem"){
        nButton.style.color = "#FFFFFF";
    }else{
        nButton.style.color = "#3264b0";
    }
}