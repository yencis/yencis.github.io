function update_font(){
    var projectP = document.getElementsByClassName("project-content")[0];

    console.log(projectP.style.opacity=(toString(2000/window.scrollY)+"%"));
}