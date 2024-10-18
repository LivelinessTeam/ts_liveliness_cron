import * as express from "express";
import * as cron from "node-cron";
import * as cors from "cors";
import axios from "axios"; // Import axios to make HTTP requests

const app = express();

// Express Configuration
app.use(cors());

// Define the endpoint for the cron job to call
const MAIN_SERVER_URL = "https://prod-ts-liveliness-server.onrender.com/api/session/cron/job"; // Replace with your actual server's endpoint

// Set up the cron job to run every 24 hours at 9 AM IST (3:30 AM UTC)
cron.schedule("30 3 * * *", async () => {
  console.log("Cron job triggered. Making GET request to main server...");

  try {
    // Make a GET request to your main server's endpoint
    const response = await axios.get(MAIN_SERVER_URL);
    console.log("Response from main server:", response.data);
  } catch (error) {
    console.error("Error making GET request to main server:", error.message);
  }
});

// Start the cron server on a port
app.listen(4000, () => {
  console.log("Cron server is running on Port 4000");
});
