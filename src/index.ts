import * as express from "express";
import * as cron from "node-cron";
import * as cors from "cors";
import axios from "axios";

const app = express();

// Express Configuration
app.use(cors());

// Define the endpoint for the cron job to call
const MAIN_SERVER_URL =
  "https://prod-ts-liveliness-server.onrender.com/api/session/cron/job"; // Replace with your actual server's endpoint

const runJob = async () => {
  console.log("Cron job triggered. Making GET request to main server...");

  try {
    // Make a GET request to your main server's endpoint
    const response = await axios.get(MAIN_SERVER_URL);
    console.log("Response from main server:", response.data);
  } catch (error) {
    console.error("Error making GET request to main server:", error.message);
  }
};

// Start the cron server on a port
app.listen(4000, () => {
  console.log("Cron server is running on Port 4000");
  runJob();
});
