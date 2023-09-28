import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import readData from "../model/Flight.js";
// Get the directory of the current module using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define dataPath using the 'path' module to ensure it's a valid path
const dataPath = path.join(__dirname, "../mockData/flightData.json");

const saveData = async (data) => {
  // Use async function for writeFile
  try {
    const json = JSON.stringify(data, null, 2);
    await fs.writeFile(dataPath, json, "utf8"); // Use fs.promises.writeFile
  } catch (error) {
    console.error("Error writing data:", error);
  }
};

const FligthService = {
  addFlight: async (departureCity, destinationCity, date) => {
    const flightDatabase = await readData();

    if (!flightDatabase.flights) {
      flightDatabase.flights = [];
    }

    const newFligth = {
      id: flightDatabase.flights.length + 1,
      departureCity,
      destinationCity,
      date,
    };

    flightDatabase.flights.push(newFligth);
    saveData(flightDatabase);

    return newFligth;
  },
  findFlightById: async (flightId) => {
    // Use readData to get the userDatabase
    const flightDatabase = await readData();

    if (!flightDatabase.flights) {
      return null;
    }

    return flightDatabase.flights.find((flight) => flight.id === flightId);
  },
  findAllFlights: async () => {
    // Use readData to get the flightDatabase
    const flightDatabase = await readData();

    if (!flightDatabase.flights || flightDatabase.flights.length === 0) {
      return []; // Return an empty array if there are no flights.
    }

    return flightDatabase.flights;
  },

  findFlightsByCriteria: async (departureCity, destinationCity, date) => {
    console.log('Query Parameters:', departureCity, destinationCity, date);
  
    // Use readData to get the flightDatabase
    const flightDatabase = await readData();
  
    if (!flightDatabase.flights || flightDatabase.flights.length === 0) {
      return []; // Return an empty array if there are no flights.
    }
  
    // Filter flights based on the criteria
    const filteredFlights = flightDatabase.flights.filter((flight) => {
      return (
        flight.departureCity === departureCity &&
        flight.destinationCity === destinationCity &&
        flight.date === date
      );
    });
  
    console.log('Filtered Flights:', filteredFlights); // Log the filtered flights
  
    return filteredFlights;
  },
  
};

export default FligthService;
