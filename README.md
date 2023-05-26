# Clinic Search API

This repository contains a simple Express.js application that provides an API for searching dental and veterinary clinics based on various parameters such as clinic name, state, and availability. The application retrieves clinic data from external JSON files using asynchronous API calls and exposes the search functionality through the `/clinics` endpoint.

## Installation

To run the Clinic Search API locally, follow these steps:

1. Clone the repository to your local machine.
2. Make sure you have Node.js installed.
3. Open a terminal and navigate to the project directory.
4. Run the command `npm install` to install the required dependencies.
5. Start the application by running `npm start`.

The API will be accessible at `http://localhost:3000`.

## Usage

### Search Clinics

To search for clinics, make a GET request to the `/clinics` endpoint. You can provide query parameters to filter the results.

#### Query Parameters

- `clinicName`: Filter clinics by name. Only clinics with an exact match for the provided name will be returned.
- `state`: Filter clinics by state code. Only clinics located in the specified state will be returned.
- `availability`: Filter clinics by availability. This parameter should be in the format `from-to`, where `from` and `to` are time values. Only clinics with opening hours falling within the specified availability range will be returned.

Example Usage:

```
GET http://localhost:3000/clinics?clinicName=Dental Clinic&state=CA&availability=09:00-18:00
```

This request will retrieve all dental clinics located in California with availability between 9 AM and 6 PM.

### Error Handling

If an error occurs during the API calls or request processing, an appropriate error response will be returned with the corresponding status code and error message.

## Project Structure

The repository is organized as follows:

- `app.js`: The main entry point of the Express.js application. It sets up the API routes and starts the server.
- `utils/api.js`: Contains the `api` function responsible for fetching JSON data from the provided URLs.
- `utils/constants.js`: Defines the URLs for the dental and veterinary clinics JSON files.
- `utils/parser.js`: Provides the `parseAvailability` function for parsing the availability query parameter.
- `package.json`: Contains the project's metadata and dependencies.

## Dependencies

The application relies on the following dependencies:

- Express.js: A fast and minimalist web application framework for Node.js.
- Nodemon (dev dependency): A utility that automatically restarts the application when changes are detected during development.

## Contribution

Feel free to contribute to this project by submitting pull requests or reporting issues on the GitHub repository. Any contributions are highly appreciated!

