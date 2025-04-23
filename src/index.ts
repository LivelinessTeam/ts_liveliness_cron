import * as express from "express";
import * as cron from "node-cron";
import * as cors from "cors";
import axios from "axios";

const baseServerUrl = "https://prod-ts-liveliness-server.onrender.com";
// const baseServerUrl = "http://localhost:3000";

// Define the endpoint for the cron job to call
const EVENT_SERVER_URL =
  `${baseServerUrl}/api/session/cron/job`; // Replace with your actual server's endpoint

const SUBSCRIPTION_COUPON_SERVER_URL =
   `${baseServerUrl}/api/subscriptionsPurchase/updateCoupon`;

const EVENT_24_HOURS_SERVER_URL = 
   `${baseServerUrl}/api/event/notifBefore24`;

const CLUB_NEWSLETTER_SERVER_URL =
    `${baseServerUrl}/api/club/sendNewsletter/sendEmails`;

const runJob = async () => {
  console.log("Cron job triggered. Making requests to main server...");

  try {
    // Make a GET request to your main server's endpoint
    const response1 = await axios.get(EVENT_SERVER_URL);
    console.log("Response from event creation function:", response1.data);

    // const response2 = await axios.post(SUBSCRIPTION_COUPON_SERVER_URL, {
    //   dateTime: new Date().toISOString(),
    // });

    // console.log("Response from subscription coupon update function:", response2.data);

    /////////////// 
    console.log(EVENT_24_HOURS_SERVER_URL);
    const response3 = await axios.post(EVENT_24_HOURS_SERVER_URL);

    console.log("Response from event 24 hours notification function:", response3.data);

    ///////////////
    // if date is 1st of month, the run the newsletter function
    // if( new Date().getDate() === 1){
      const response4 = await axios.get(CLUB_NEWSLETTER_SERVER_URL);
      console.log("Response from club newsletter function:", response4.data);
    // }
    
    process.exit(0);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

runJob();
