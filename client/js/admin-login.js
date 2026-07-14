document
.getElementById("loginForm")
.addEventListener(
"submit",
async (e)=>{

e.preventDefault();

const username =
document
.getElementById("username")
.value;

const password =
document
.getElementById("password")
.value;

try{

const response =
await fetch(
"http://sri-ganesh-events-ap.onrender.com/api/admin/login",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({
username,
password
})

}
);

const data =
await response.json();

if(data.token){

localStorage.setItem(
"token",
data.token
);

window.location.href =
"admin-dashboard.html";

}
else{

document
.getElementById("message")
.innerText =
data.message;

}

}
catch(error){

console.log(error);

document
.getElementById("message")
.innerText =
"Server Error";

}

});