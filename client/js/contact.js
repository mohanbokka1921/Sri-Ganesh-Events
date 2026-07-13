document
.getElementById("contactForm")
.addEventListener(
"submit",
(e)=>{

    e.preventDefault();

    document
    .getElementById("status")
    .innerText =
    "Thank you for contacting Sri Ganesh Events. We will get back to you soon.";

    document
    .getElementById("contactForm")
    .reset();

});