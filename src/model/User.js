import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory of the current module using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define dataPath using the 'path' module to ensure it's a valid path
const dataPath = path.join(__dirname, "../mockData/userData.json");

async function readData() {
  try {
    await fs.access(dataPath, fs.constants.F_OK);
    const data = await fs.readFile(dataPath, "utf8");
    if (!data) {
      // If the file is empty, initialize it with an empty array
      return { users: [] };
    }
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading data:", error);
    return null;
  }
}

// const userDatabase = readData();

export default  readData 
