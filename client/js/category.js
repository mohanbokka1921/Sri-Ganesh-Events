async function loadCategoryProducts(){

    const params =
    new URLSearchParams(
    window.location.search
    );

    const category =
    params.get("type");

    document
    .getElementById("categoryTitle")
    .innerText =
    category + " Decorations";

    try{

        const response =
        await fetch(
        "https://sri-ganesh-events-ap.onrender.com/api/decorations"
        );

        const decorations =
        await response.json();

        const filtered =
        decorations.filter(item =>

            item.category
            .toLowerCase() ===
            category.toLowerCase()

        );

        const container =
        document.getElementById(
        "productsContainer"
        );

        container.innerHTML = "";

        if(filtered.length === 0){

            container.innerHTML =
            "<h2>No Decorations Found</h2>";

            return;

        }

        filtered.forEach(item => {

            container.innerHTML += `

            <div class="product-card">

                <img
                src="https://sri-ganesh-events-ap.onrender.com${item.images[0]}"
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
    catch(error){

        console.log(error);

    }

}

loadCategoryProducts();