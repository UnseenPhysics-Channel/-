const hero = document.getElementById("hero");
const posts = document.getElementById("posts");

window.addEventListener("scroll", () => {

let scrollY = window.scrollY;

if(scrollY > 150){
    hero.classList.add("shrink");
    posts.classList.add("show");
}else{
    hero.classList.remove("shrink");
    posts.classList.remove("show");
}

});