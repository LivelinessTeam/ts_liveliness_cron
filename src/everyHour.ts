import axios from 'axios';

const baseServerUrl = 'https://prod-ts-liveliness-server.onrender.com';
// const baseServerUrl = "http://localhost:3000";

const EVENT_1_HOURS_SERVER_URL = `${baseServerUrl}/api/event/notifyBefore1Hour`;

const EVENT_24_HOURS_SERVER_URL = `${baseServerUrl}/api/event/notifBefore24`;

const runJob = async () => {
  console.log('Cron job triggered. Making requests to main server...');
  try {
    const response = await axios.post(EVENT_1_HOURS_SERVER_URL);
    console.log('Response from event 1 hour notification function:', response.data);

    const response2 = await axios.post(EVENT_24_HOURS_SERVER_URL);
    console.log('Response from event 24 hours notification function:', response2.data);

    process.exit(0);
  } catch (error) {
    console.error('Error in event 1 hour notification function:', error.message);
    process.exit(1);
  }
};

runJob();
