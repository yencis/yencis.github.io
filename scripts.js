function update_button(){
    var nButton = document.getElementsByClassName("nav-button")[0];
    if (window.scrollY>300){
        nButton.style.color = "#FFFFFF";
    }else{
        nButton.style.color = "#3264b0";
    }
}