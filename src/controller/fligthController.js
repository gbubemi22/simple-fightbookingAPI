import FligthService from "../service/flightService.js";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors/index.js";

const FlightController = {
  addFligth: async (req, res) => {
    const { departureCity, destinationCity, date } = req.body;

    const newFlight = await FligthService.addFlight(
      departureCity,
      destinationCity,
      date
    );

    return res.status(StatusCodes.CREATED).json({
      message: "Flight added",
      newFlight: newFlight,
    });
  },

  getFligthById: async (req, res, next) => {
    const flightId = parseInt(req.params.flightId, 10);

    const flight = await FligthService.findFlightById(flightId);

    if (!flight) throw new CustomError.NotFoundError(`Failed to find flight`);

    return res.status(StatusCodes.OK).json({
      message: "successful",
      flight,
    });
  },

  getAllFlights: async (req, res) => {
    const flights = await FligthService.findAllFlights();

    if (!flights) throw new CustomError.NotFoundError(`Failed to find flights`);

    return res.status(StatusCodes.OK).json({
      message: "successful",
      flights,
    });
  },

  searchFlight: async (req, res) => {
    const { departureCity, destinationCity, date } = req.query;
    
   
    // Call the findFlightsByCriteria function to get matching flights
    const matchingFlights = await FligthService.findFlightsByCriteria(
     departureCity,
     destinationCity,
     date
   );

    // Now, you can work with the array of matching flights
    console.log(matchingFlights);

    res.status(StatusCodes.OK).json({
      data: matchingFlights,
    });
  },
};

export default FlightController;
