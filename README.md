Flight booking API



Clone the repo 

on your terminal cd into the directory where you clone the repo

the cd into src

npm run dev 

it runing on port 9000




    File Structure

The project's file structure is organized as follows:

Src folder


App.js: Main application file
Service/: Interacting with the database
Routes/: Express route definitions
Controllers/: Controller functions for routes (Business logic)
Models/: User, Booking, Flight, Payment models
Middleware/: Middleware for error handling like 
PageNotFound And other Errors 
Errors/: Error handling for BadRequest, conflict, NotFound, unautorized, 
Utils/: Utility functions, e.g., Password check, password hashing
Env/: Environment variables JWT_COOKIE=value JWT_SECRET=value 
Package.json: Project dependencies
Package-lock.json: Dependency lock file

test file::::
load-test.yml

