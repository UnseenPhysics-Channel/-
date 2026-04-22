// HEADER INTELIGENTE
const header = document.getElementById("header");

window.addEventListener("scroll", () => {

if(window.scrollY > 50){
header.classList.add("active");
}else{
header.classList.remove("active");
}

});


// HERO → POSTS TRANSITION
const hero = document.getElementById("hero");
const posts = document.getElementById("posts");

window.addEventListener("scroll", () => {

if(window.scrollY > 150){
hero.classList.add("shrink");
posts.classList.add("show");
}

});


// STARS BACKGROUND
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

for(let i=0;i<120;i++){
stars.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*2
});
}

function animate(){
ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="white";

stars.forEach(star=>{
ctx.beginPath();
ctx.arc(star.x,star.y,star.size,0,Math.PI*2);
ctx.fill();

star.y+=0.2;

if(star.y>canvas.height){
star.y=0;
}
});

requestAnimationFrame(animate);
}

animate();

const header = document.querySelector("header");
const hero = document.querySelector(".hero");
const posts = document.querySelector(".posts-section");

window.addEventListener("scroll", () => {

let scroll = window.scrollY;

/* HEADER INTELIGENTE */
if(scroll > 50){
header.classList.add("scrolled");
}else{
header.classList.remove("scrolled");
}

/* HERO CINEMÁTICO */
if(scroll > 120){
hero.classList.add("shrink");
}else{
hero.classList.remove("shrink");
}

/* FADE DOS POSTS */
if(scroll > 350){
posts.classList.add("show");
}

});