let allBookings = [];

/* LOAD BOOKINGS */

async function loadBookings() {

    try {

        const response =
        await fetch(
        "http://sri-ganesh-events-ap.onrender.com/api/bookings"
        );

        const bookings =
        await response.json();

        console.log(bookings);

        allBookings = bookings;

        renderBookings(bookings);

        updateCounts(bookings);

    }
    catch(error) {

        console.log(error);

    }

}

/* RENDER BOOKINGS */

function renderBookings(bookings){

    const table =
    document.getElementById(
    "bookingsTable"
    );

    table.innerHTML = "";

    bookings.forEach(item => {

        table.innerHTML += `

        <tr>

            <td>
                ${item.customerName}
            </td>

            <td>
                ${item.phone}
            </td>

            <td>
                ${
                    item.eventDate
                    ? new Date(
                        item.eventDate
                    ).toLocaleDateString()
                    : "N/A"
                }
            </td>

            <td>
                ${item.location}
            </td>

            <td>
                ${
                    item.decorationId
                    ? `${item.decorationId.code}
                    - ${item.decorationId.title}`
                    : "N/A"
                }
            </td>

            <td>

                <span class="
                status-${(
                    item.status ||
                    "pending"
                ).toLowerCase()}
                ">

                ${
                    item.status ||
                    "Pending"
                }

                </span>

            </td>

            <td>

                <button
                class="action-btn"
                onclick="openWhatsApp(
                    '${item.customerName}',
                    '${item.phone}'
                )">

                    WhatsApp

                </button>

                <button
                class="accept-btn"
                onclick="updateBookingStatus(
                    '${item._id}',
                    'Confirmed'
                )">

                    Accept

                </button>

                <button
                class="complete-btn"
                onclick="updateBookingStatus(
                    '${item._id}',
                    'Completed'
                )">

                    Complete

                </button>

                <button
                class="delete-btn"
                onclick="deleteBooking(
                    '${item._id}'
                )">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}

/* UPDATE DASHBOARD COUNTS */

function updateCounts(bookings){

    document.getElementById(
    "totalBookings"
    ).innerText =
    bookings.length;

    document.getElementById(
    "pendingBookings"
    ).innerText =
    bookings.filter(
        b =>
        (b.status || "Pending")
        .toLowerCase() ===
        "pending"
    ).length;

    document.getElementById(
    "confirmedBookings"
    ).innerText =
    bookings.filter(
        b =>
        (b.status || "")
        .toLowerCase() ===
        "confirmed"
    ).length;

    document.getElementById(
    "completedBookings"
    ).innerText =
    bookings.filter(
        b =>
        (b.status || "")
        .toLowerCase() ===
        "completed"
    ).length;

}

/* WHATSAPP */

function openWhatsApp(
    name,
    phone
){

    const message =

`Hello ${name},

Thank you for choosing Sri Ganesh Events.

Your booking request has been received.

We will contact you shortly.`;

    const url =

`https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;

    window.open(
        url,
        "_blank"
    );

}

/* ACCEPT / COMPLETE */

async function updateBookingStatus(
    id,
    status
){

    try{

        await fetch(

        `http://sri-ganesh-events-ap.onrender.com/api/bookings/${id}`,

        {

            method:"PUT",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:JSON.stringify({
                status
            })

        });

        loadBookings();

    }
    catch(error){

        console.log(error);

    }

}

/* DELETE */

async function deleteBooking(id){

    const confirmDelete =
    confirm(
    "Delete this booking?"
    );

    if(!confirmDelete)
    return;

    try{

        await fetch(

        `http://sri-ganesh-events-ap.onrender.com/api/bookings/${id}`,

        {
            method:"DELETE"
        }

        );

        loadBookings();

    }
    catch(error){

        console.log(error);

    }

}

/* SEARCH */

document
.getElementById(
"searchBooking"
)
.addEventListener(
"keyup",
function(){

    const value =
    this.value
    .toLowerCase();

    const filtered =
    allBookings.filter(
    item =>

        item.customerName
        .toLowerCase()
        .includes(value)

        ||

        item.phone
        .includes(value)

    );

    renderBookings(
        filtered
    );

});

/* INITIAL LOAD */

loadBookings();