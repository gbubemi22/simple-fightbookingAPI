import { StatusCodes } from "http-status-codes";
import CustomError from "../errors/index.js";
import BookingService from "../service/bookingService.js";
import PaymentService from "../service/paymentService.js";
import FligthService from "../service/flightService.js";
const BookingController = {
  confirmBooking: async (req, res) => {
    const { flightId, status } = req.body;
    const userId = parseInt(req.params.userId, 10);
  
    try {
      const checkFlightId = await FligthService.findFlightById(flightId);
  
      if (!checkFlightId) {
        throw new CustomError.NotFoundError(`Flight not found`);
      }
  
      const booking = await BookingService.confirmBooking(userId, flightId,status);

  
      const payment = PaymentService.getPaymentStatus(status);
      if (payment && payment.paymentStatus === 'Payment Successful') {
        booking.status = 'Confirmed';
        res.json({ message: 'Booking confirmed', booking });
      } else {
        booking.status = 'Failed';
        res.status(400).json({ message: 'Booking failed', booking });
      }
  
     
    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "An error occurred" });
    }
  },
  
  
  findAllBookingById: async (req, res) => {
    const bookingId = parseInt(req.params.bookingId, 10);

    const booking = await BookingService.findBookingById(bookingId);

    if (!booking || booking === 0) throw new CustomError.NotFoundError(`Failed to find flight`);

    return res.status(StatusCodes.OK).json({
      message: "successful",
      booking,
    });
  },

  getAllBookings: async (req, res) => {
    const bookings = await BookingService.findAllBookings();

    if (!bookings)
      throw new CustomError.NotFoundError(`Failed to find flights`);

    return res.status(StatusCodes.OK).json({
      message: "successful",
      bookings,
    });
  },
};

export default BookingController;
