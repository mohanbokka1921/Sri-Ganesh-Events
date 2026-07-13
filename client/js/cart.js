const cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

const container =
document.getElementById(
"cartContainer"
);

function renderCart(){

container.innerHTML = "";

cart.forEach((item,index)=>{

container.innerHTML +=

`
<div class="product-card">

<img
src="${item.image}"
width="250">

<h3>
${item.title}
</h3>

<p>
${item.code}
</p>

<p>
₹${item.price}
</p>

<button
onclick="removeItem(${index})">

Remove

</button>

</div>
`;

});

}

function removeItem(index){

cart.splice(index,1);

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

renderCart();

}

renderCart();

document
.getElementById("bookingBtn")
.addEventListener("click",()=>{

window.location.href =
"booking.html";

});