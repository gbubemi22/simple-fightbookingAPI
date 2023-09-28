import express from "express";
const router = express.Router();


import FlightController from '../controller/fligthController.js'



router.route("/").post(FlightController.addFligth);


router.route("/:flightId").get(FlightController.getFligthById);


router.route("/").get(FlightController.getAllFlights);


router.route("/search-flight").post(FlightController.searchFlight);


// Add the prefix to all routes
const prefix = "/api/v1/flights";
router.use(prefix, router);

export default router;

