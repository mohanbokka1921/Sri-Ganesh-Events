console.log("Flora Events Loaded");

window.addEventListener("scroll", () => {

    const navbar =
    document.querySelector(".navbar");

    if(window.scrollY > 50){
        navbar.style.boxShadow =
        "0 5px 15px rgba(0,0,0,.1)";
    }
    else{
        navbar.style.boxShadow = "none";
    }

});