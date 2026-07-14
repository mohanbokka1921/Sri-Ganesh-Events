
const params =
new URLSearchParams(
window.location.search
);

const decorationId =
params.get("id");

document
.getElementById("decorationId")
.value =
decorationId || "";

document
.getElementById("bookingForm")
.addEventListener(
"submit",
async (e) => {

    e.preventDefault();

    const data = {

        customerName:
        document
        .getElementById("customerName")
        .value,



        phone:
        document
        .getElementById("phone")
        .value,

        eventDate:
        document
        .getElementById("eventDate")
        .value,

        location:
        document
        .getElementById("location")
        .value,

        decorationId:
        document
        .getElementById("decorationId")
        .value

    };

    const decorationResponse =
        await fetch(
            "https://sri-ganesh-events-ap.onrender.com/api/decorations"
        );

        const decorations =
        await decorationResponse.json();

        const decoration =
        decorations.find(
       d => d._id === decorationId
    );

    try {

        const response =
        await fetch(
        "https://sri-ganesh-events-ap.onrender.com/api/bookings",
        {
            method: "POST",

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

        if(response.ok){

            document
            .getElementById("message")
            .innerText =
            "Booking Submitted Successfully";

            document
            .getElementById("bookingForm")
            .reset();

            const adminNumber =
            "917013376444"; // country code + phone number

            const message =

            `      ====================
            🌸 New Booking
            =====================

            Name: ${data.customerName}

            Decoration Code:
            ${decoration.code}


            Phone: ${data.phone}

            Date: ${data.eventDate}

            Location: ${data.location}
            =======================`;

            const whatsappURL =

            `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;

            window.open(
                 whatsappURL,
                 "_blank"
            );
        }
        else{

            document
            .getElementById("message")
            .innerText =
            result.message ||
            "Booking Failed";

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

