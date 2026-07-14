let editId = null;

// Check Login
const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "admin-login.html";
}

// Logout
document
.getElementById("logoutBtn")
.addEventListener("click", () => {

    localStorage.removeItem("token");

    window.location.href =
    "admin-login.html";

});

// Add / Update Decoration
document
.getElementById("decorationForm")
.addEventListener(
"submit",
async (e) => {

    e.preventDefault();

    try {

        // Upload Image
        const imageFile =
        document.getElementById("imageFile")
        .files[0];

        let uploadedImages = [];

        if(imageFile){

            const formData =
            new FormData();

            formData.append(
                "images",
                imageFile
            );

            const uploadResponse =
            await fetch(
                "https://sri-ganesh-events-ap.onrender.com/api/upload",
                {
                    method: "POST",
                    body: formData
                }
            );

            uploadedImages =
            await uploadResponse.json();
        }

        const data = {

            code:
            document.getElementById("code").value,

            title:
            document.getElementById("title").value,

            category:
            document.getElementById("category").value,

            price:
            Number(
                document.getElementById("price").value
            ),

            description:
            document.getElementById("description").value,

            flowersUsed:
            document
            .getElementById("flowersUsed")
            .value
            .split(",")
            .map(item => item.trim())
            .filter(item => item),

            materialsUsed:
            document
            .getElementById("materialsUsed")
            .value
            .split(",")
            .map(item => item.trim())
            .filter(item => item),

            images:
            uploadedImages

        };

        let url =
        "https://sri-ganesh-events-ap.onrender.com/api/decorations";

        let method =
        "POST";

        if(editId){

            url =
            `https://sri-ganesh-events-ap.onrender.com/api/decorations/${editId}`;

            method =
            "PUT";
        }

        const response =
        await fetch(url, {

            method,

            headers: {
                "Content-Type":
                "application/json"
            },

            body:
            JSON.stringify(data)

        });

        const result =
        await response.json();

        console.log(result);

        document
        .getElementById("message")
        .innerText =
        editId
        ? "Decoration Updated Successfully"
        : "Decoration Added Successfully";

        editId = null;

        document
        .getElementById("saveBtn")
        .innerText =
        "Save Decoration";

        document
        .getElementById("decorationForm")
        .reset();

        loadDecorations();

    }
    catch(error){

        console.log(error);

        document
        .getElementById("message")
        .innerText =
        "Error Saving Decoration";

    }

});

// Load Decorations
async function loadDecorations() {

    try {

        const response =
        await fetch(
        "https://sri-ganesh-events-ap.onrender.com/api/decorations"
        );

        const decorations =
        await response.json();

        console.log(decorations);

        const table =
        document.getElementById(
        "decorationsTable"
        );

        table.innerHTML = "";

        decorations.forEach(item => {

            table.innerHTML += `

            <tr>

                <td>${item.code}</td>

                <td>${item.title}</td>

                <td>${item.category}</td>

                <td>₹${item.price}</td>

                <td>

                    <button
                    onclick="editDecoration('${item._id}')">
                    Edit
                    </button>

                    <button
                    onclick="deleteDecoration('${item._id}')">
                    Delete
                    </button>

                </td>

            </tr>

            `;

        });

    }
    catch(error){

        console.log(error);

    }

}

// Delete Decoration
async function deleteDecoration(id) {

    const confirmDelete =
    confirm(
    "Delete Decoration?"
    );

    if(!confirmDelete)
    return;

    try {

        await fetch(

        `https://sri-ganesh-events-ap.onrender.com/api/decorations/${id}`,

        {
            method:"DELETE"
        }

        );

        loadDecorations();

    }
    catch(error){

        console.log(error);

    }

}

// Edit Decoration
async function editDecoration(id) {

    try {

        const response =
        await fetch(
        "https://sri-ganesh-events-ap.onrender.com/api/decorations"
        );

        const decorations =
        await response.json();

        const item =
        decorations.find(
        d => d._id === id
        );

        if(!item) return;

        editId = id;

        document.getElementById("code").value =
        item.code;

        document.getElementById("title").value =
        item.title;

        document.getElementById("category").value =
        item.category;

        document.getElementById("price").value =
        item.price;

        document.getElementById("description").value =
        item.description || "";

        document.getElementById("flowersUsed").value =
        item.flowersUsed
        ? item.flowersUsed.join(",")
        : "";

        document.getElementById("materialsUsed").value =
        item.materialsUsed
        ? item.materialsUsed.join(",")
        : "";

        document
        .getElementById("saveBtn")
        .innerText =
        "Update Decoration";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
    catch(error){

        console.log(error);

    }

}

// Initial Load
loadDecorations();