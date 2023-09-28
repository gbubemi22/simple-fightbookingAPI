import express from "express";
const router = express.Router();


import BookingController from '../controller/bookingController.js'





router.route("/:userId").post(BookingController.confirmBooking);


router.route("/:id").get(BookingController.findAllBookingById);


router.route("/").get(BookingController.getAllBookings);






// Add the prefix to all routes
const prefix = "/api/v1/bookings";
router.use(prefix, router);

export default router;