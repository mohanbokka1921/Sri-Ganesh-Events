let allProducts = [];

async function loadProducts() {

    try {

        const response =
        await fetch(
        "https://sri-ganesh-events-ap.onrender.com/api/decorations"
        );

        allProducts =
        await response.json();

        displayProducts(allProducts);

    }
    catch(error){

        console.error(error);

    }

}

function displayProducts(products){

    const container =
    document.getElementById(
    "productsContainer"
    );

    container.innerHTML = "";

    if(products.length === 0){

        container.innerHTML =
        "<h2>No Decorations Found</h2>";

        return;

    }

    products.forEach(item => {

        container.innerHTML += `

        <div class="product-card">

            <img
            src="http://localhost:5000${item.images[0]}"
            alt="${item.title}"
            width="250">

            <h3>${item.title}</h3>

            <p>Code: ${item.code}</p>

            <p>₹${item.price}</p>

            <p>${item.category}</p>

            <a href="product.html?code=${item.code}">
                <button>
                    View Details
                </button>
            </a>

        </div>

        `;

    });

}

document
.getElementById("searchInput")
.addEventListener(
"input",
(e)=>{

    const search =
    e.target.value
    .toLowerCase()
    .trim();

    const filtered =
    allProducts.filter(item =>

        item.title
        .toLowerCase()
        .includes(search)

        ||

        item.category
        .toLowerCase()
        .includes(search)

        ||

        item.code
        .toLowerCase()
        .includes(search)

    );

    displayProducts(filtered);

});

loadProducts();