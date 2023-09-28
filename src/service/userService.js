// import userDatabase from '../model/User.js';

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import  readData  from '../model/User.js';
// Get the directory of the current module using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Define dataPath using the 'path' module to ensure it's a valid path
const dataPath = path.join(__dirname, '../mockData/userData.json');

const saveData = async (data) => { // Use async function for writeFile
  try {
    const json = JSON.stringify(data, null, 2);
    await fs.writeFile(dataPath, json, 'utf8'); // Use fs.promises.writeFile
  } catch (error) {
    console.error('Error writing data:', error);
  }
};

const UserService = {
  addUser: async (name, email, password) => {

    // Use readData to get the userDatabase
    const userDatabase = await readData();



    if (!userDatabase.users) {
      userDatabase.users = [];
    }

    const newUser = {
      id: userDatabase.users.length + 1,
      name,
      email,
      password,
    };

    userDatabase.users.push(newUser);
    saveData(userDatabase);

    return newUser;
  },

  findUserById: async (userId) => {
    // Use readData to get the userDatabase
    const userDatabase = await readData();

    if (!userDatabase.users) {
      return null;
    }

    return userDatabase.users.find((user) => user.id === userId);
  },

  findUserByEmail: async (userEmail) => {
    // Use readData to get the userDatabase
    const userDatabase = await readData();

    if (!userDatabase.users) {
      return null;
    }

    return userDatabase.users.find((user) => user.email === userEmail);
  },
};

export default UserService;
