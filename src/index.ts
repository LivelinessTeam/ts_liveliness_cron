import * as express from "express";
import * as cron from "node-cron";
import * as cors from "cors";
import axios from "axios";

// Define the endpoint for the cron job to call
const EVENT_SERVER_URL =
  "https://prod-ts-liveliness-server.onrender.com/api/session/cron/job"; // Replace with your actual server's endpoint

const SUBSCRIPTION_COUPON_SERVER_URL =
  "https://prod-ts-liveliness-server.onrender.com/api/subscriptionsPurchase/updateCoupon";

const runJob = async () => {
  console.log("Cron job triggered. Making requests to main server...");

  try {
    // Make a GET request to your main server's endpoint
    const response1 = await axios.get(EVENT_SERVER_URL);
    console.log("Response from event creation function:", response1.data);

    const response2 = await axios.post(SUBSCRIPTION_COUPON_SERVER_URL, {
      dateTime: new Date().toISOString(),
    });
    console.log(
      "Response from subscription purchase function:",
      response2.data
    );
    process.exit(0);
  } catch (error) {
    console.error("Error making GET request to main server:", error.message);
    process.exit(1);
  }
};

runJob();
