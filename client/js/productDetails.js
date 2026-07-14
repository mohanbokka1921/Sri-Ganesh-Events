async function loadProduct() {

    const params =
    new URLSearchParams(window.location.search);

    const code =
    params.get("code");

    try {

        const response = await fetch(
            "https://sri-ganesh-events-ap.onrender.com/api/decorations"
        );

        const decorations =
        await response.json();

        const product =
        decorations.find(
            item => item.code === code
        );

        const container =
        document.getElementById(
            "productContainer"
        );

        if (!product) {

            container.innerHTML =
            "<h2>Product Not Found</h2>";

            return;
        }

        container.innerHTML = `
            <img
            src="https://sri-ganesh-events-ap.onrender.com${product.images[0]}"
            width="500">

            <h1>${product.title}</h1>

            <h1>${code.item}

            <h2>₹${product.price}</h2>

            <p>${product.description}</p>

            <h3>Flowers Used</h3>

            <ul>
                ${product.flowersUsed
                .map(f => `<li>${f}</li>`)
                .join("")}
            </ul>

            <h3>Materials Used</h3>

            <ul>
                ${product.materialsUsed
                .map(m => `<li>${m}</li>`)
                .join("")}
            </ul>

            <button id="cartBtn">
                Add To Cart
            </button>

            <button id="bookBtn">
                Book Now
            </button>
        `;

        document
        .getElementById("cartBtn")
        .addEventListener("click", () => {

            let cart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];

            cart.push(product);

            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );

            alert("Added To Cart");
        });

        document
        .getElementById("bookBtn")
        .addEventListener("click", () => {

            window.location.href =
            `booking.html?id=${product._id}`;

        });

    } catch(error) {

        console.error(error);

    }
}

loadProduct();