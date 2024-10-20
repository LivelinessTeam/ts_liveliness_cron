import * as express from "express";
import * as cron from "node-cron";
import * as cors from "cors";
import axios from "axios";

// Define the endpoint for the cron job to call
const MAIN_SERVER_URL =
  "https://prod-ts-liveliness-server.onrender.com/api/session/cron/job"; // Replace with your actual server's endpoint

const runJob = async () => {
  console.log("Cron job triggered. Making GET request to main server...");

  try {
    // Make a GET request to your main server's endpoint
    const response = await axios.get(MAIN_SERVER_URL);
    console.log("Response from main server:", response.data);
    process.exit(0);
  } catch (error) {
    console.error("Error making GET request to main server:", error.message);
    process.exit(1);
  }
};

runJob();
