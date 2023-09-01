// Sample room data
const rooms = [
    { name: "Room A", bookings: [] },
    { name: "Room B", bookings: [] },
    // Add more rooms here
];

// Sample user bookings
const userBookings = [];

// Function to display available rooms
function displayRooms() {
    const availableRoomsList = document.getElementById("available-rooms");

    // Clear any existing list items
    availableRoomsList.innerHTML = "";

    rooms.forEach(room => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${room.name}</strong>`;

        // Display booking status
        const bookingStatus = room.bookings.length > 0 ? "Booked" : "Available";
        listItem.innerHTML += ` - Status: ${bookingStatus}`;

        // Add a button to book the room
        const bookButton = document.createElement("button");
        bookButton.textContent = "Book";
        bookButton.addEventListener("click", () => bookRoom(room));
        listItem.appendChild(bookButton);

        availableRoomsList.appendChild(listItem);
    });
}

// Function to book a room
function bookRoom(room) {
    const timeSlot = prompt("Enter the desired time slot (e.g., 9:00-9:30):");
    if (!timeSlot) return; // User canceled

    // Check for conflicts
    if (isTimeSlotAvailable(room, timeSlot)) {
        room.bookings.push(timeSlot);
        userBookings.push({ room, timeSlot });

        // Refresh the UI
        displayRooms();
        displayUserBookings();
    } else {
        alert("This time slot is already booked. Please choose another.");
    }
}

// Function to check if a time slot is available for booking
function isTimeSlotAvailable(room, timeSlot) {
    return !room.bookings.includes(timeSlot);
}

// Function to display user bookings
function displayUserBookings() {
    const userBookingsList = document.getElementById("user-bookings");

    // Clear any existing list items
    userBookingsList.innerHTML = "";

    userBookings.forEach(booking => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${booking.room.name}</strong>`;
        listItem.innerHTML += ` - Time Slot: ${booking.timeSlot}`;

        // Add buttons for editing and canceling
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editBooking(booking));
        listItem.appendChild(editButton);

        const cancelButton = document.createElement("button");
        cancelButton.textContent = "Cancel";
        cancelButton.addEventListener("click", () => cancelBooking(booking));
        listItem.appendChild(cancelButton);

        userBookingsList.appendChild(listItem);
    });
}

// Function to edit a booking
function editBooking(booking) {
    const newTimeSlot = prompt("Enter the new time slot (e.g., 10:00-10:30):");
    if (!newTimeSlot) return; // User canceled

    // Check for conflicts
    if (isTimeSlotAvailable(booking.room, newTimeSlot)) {
        const index = userBookings.indexOf(booking);
        if (index !== -1) {
            // Update the booking
            booking.timeSlot = newTimeSlot;

            // Refresh the UI
            displayUserBookings();
        }
    } else {
        alert("This time slot is already booked. Please choose another.");
    }
}

// Function to cancel a booking
function cancelBooking(booking) {
    const index = userBookings.indexOf(booking);
    if (index !== -1) {
        userBookings.splice(index, 1);

        // Remove the booking from the room's bookings
        const roomIndex = booking.room.bookings.indexOf(booking.timeSlot);
        if (roomIndex !== -1) {
            booking.room.bookings.splice(roomIndex, 1);
        }

        // Refresh the UI
        displayUserBookings();
        displayRooms();
    }
}

// Initialize the UI
displayRooms();
displayUserBookings();
