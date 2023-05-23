# ✈️🔔 Flight deal alerts for Slack

Make automated posts like this to a Slack channel:

<img width="650" alt="Screenshot 2023-05-23 at 13 01 27" src="https://github.com/liddiard/flight-deal-alerts/assets/3317632/715fc482-72b9-4182-9024-22999ef64791">

## Setup and usage

1. Install: `npm i`
2. Follow [instructions here](https://api.slack.com/messaging/webhooks) to get a Slack "app" and webhook URL.
2. Run the script (manually): `SLACK_WEBHOOK_URL=<Your Slack webhook URL> node index.js`

You probably want to set up the script to run automatically using cron with a frequency of every hour or less. 

The script is hardcoded to flight deals for New York City. You can change that by examining the RSS feed for supported cities and updating the `FLIGHT_DEAL_CITY` constant in code.
