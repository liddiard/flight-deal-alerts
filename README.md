# ✈️🔔 Flight deal alerts for Slack

Make automated posts like this to a Slack channel:

<img width="650" alt="Screenshot 2023-05-23 at 13 01 27" src="https://github.com/liddiard/flight-deal-alerts/assets/3317632/715fc482-72b9-4182-9024-22999ef64791">

## Setup and usage

### With Docker (recommended)

From the top level of the repo, run:

```bash
touch lastChecked
cp .env.example .env
```

In the .env file, fill in the `SLACK_WEBHOOK_URL` environment variable ([get one here](https://api.slack.com/messaging/webhooks)). If desired, you may also change the city following [instructions below](#change-city). Then, run:

```bash
docker compose up -d
```

That's it!

### Without Docker

1. Install: `npm i`
2. Follow [instructions here](https://api.slack.com/messaging/webhooks) to get a Slack "app" and webhook URL.
2. Run the script (manually): `SLACK_WEBHOOK_URL=<Your Slack webhook URL> FLIGHT_DEAL_CITY="New York City" node index.js`

You probably want to set up the script to run automatically using cron with a frequency of every hour or less. 

## Change city

You can change the city by examining the RSS feed for supported cities and updating the `FLIGHT_DEAL_CITY` environment variable.
