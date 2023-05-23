# ✈️🔔 NYC flight deal alerts for Slack

## Usage

1. Install: `npm i`
2. Follow [instructions here](https://api.slack.com/messaging/webhooks) to get a Slack webhook URL.
2. Run the script (manually): `SLACK_WEBHOOK_URL=<Your Slack webhook URL> node index.js`

You probably want to set up the script to run automatically using cron with a frequency of every hour or less. It's hardcoded to flight deals for New York City. You can change that by examining the RSS feed for supported cities and updating the code.
