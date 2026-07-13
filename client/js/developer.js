const text = [

"Full Stack Developer",

"AI Enthusiast",

"Prompt Engineer",

"Web Application Builder"

];

let index = 0;

setInterval(() => {

document.getElementById(
"typing"
).innerText = text[index];

index++;

if(index >= text.length){

index = 0;

}

},2000);

const counters =
document.querySelectorAll(
".counter"
);

counters.forEach(counter=>{

let start = 0;

const end =
counter.getAttribute(
"data-target"
);

const timer =
setInterval(()=>{

start++;

counter.innerText =
start;

if(start >= end){

clearInterval(timer);

}

},5);

});

window.addEventListener(
"scroll",
()=>{

document
.querySelectorAll("section")
.forEach(sec=>{

const pos =
sec.getBoundingClientRect()
.top;

if(pos < 700){

sec.classList.add(
"active"
);

}

});

});