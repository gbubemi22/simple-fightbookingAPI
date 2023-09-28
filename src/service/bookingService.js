import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import readData from "../model/Booking.js";
// Get the directory of the current module using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, "../mockData/bookingData.json");

const saveData = async (data) => {
  // Use async function for writeFile
  try {
    const json = JSON.stringify(data, null, 2);
    await fs.writeFile(dataPath, json, "utf8"); // Use fs.promises.writeFile
  } catch (error) {
    console.error("Error writing data:", error);
  }
};

const BookingService = {
  confirmBooking: async (UserId, flightId, paymentStatus) => {
    const bookingDatabase = await readData();

    if (!bookingDatabase.bookings) {
      bookingDatabase.bookings = [];
    }

    const newBooking = {
      id: bookingDatabase.bookings.length + 1,
      UserId,
      flightId,
      status: paymentStatus === 'Payment Successful' ? 'Confirmed' : 'Failed'
    };

    bookingDatabase.bookings.push(newBooking);
    saveData(bookingDatabase);

    return newBooking;
  },

  findBookingById: async (bookingId) => {
     // Use readData to get the bookingDatabase
     const bookingDatabase = await readData();
 
     if (!bookingDatabase.bookings) {
       return null;
     }
 
     return bookingDatabase.bookings.find((booking) => booking.id === bookingId);
   },

   findAllBookings: async () => {
     // Use readData to get the flightDatabase
     const bookingDatabase = await readData();
 
     if (!bookingDatabase.bookings || bookingDatabase.bookings.length === 0) {
       return []; // Return an empty array if there are no flights.
     }
 
     return bookingDatabase.bookings;
   },
};


export default BookingService;
