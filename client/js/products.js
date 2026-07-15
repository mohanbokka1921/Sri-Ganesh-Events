let allProducts = [];

const API_URL =
"https://sri-ganesh-events-ap.onrender.com";

async function loadProducts() {

    try {

        const response =
        await fetch(
            `${API_URL}/api/decorations`
        );

        allProducts =
        await response.json();

        displayProducts(allProducts);

    }
    catch(error){

        console.error(
            "Error loading products:",
            error
        );

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

        const imageUrl =

        item.images &&
        item.images.length > 0

        ?

        `${API_URL}${item.images[0]}`

        :

        "assets/images/image.png";

        container.innerHTML += `

        <div class="product-card">

            <img
                src="${imageUrl}"
                alt="${item.title}"
                width="250"
            >

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