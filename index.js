const fs = require('fs').promises
const path = require('path')
const Parser = require('rss-parser')
const axios = require('axios')

// anyone with this URL can post to Slack, so keep it out of version control
// retrieved from: https://api.slack.com/apps/A058YGX5HK5/incoming-webhooks
const { SLACK_WEBHOOK_URL } = process.env
if (!SLACK_WEBHOOK_URL) {
  throw Error('Missing required environment variable `SLACK_WEBHOOK_URL`')
}
// ISO-formatted string of the last time this script was run successfully
const LAST_CHECKED_FILE = path.join(__dirname, 'lastChecked')
const parser = new Parser()

// retrieve from disk when the script was last run
const getLastChecked = async () => {
  const dateString = (await fs.readFile(LAST_CHECKED_FILE, 'utf8')).trim()
  const lastChecked = new Date(dateString)
  // date parsing can fail silently in JS with "Invalid Date"
  // https://stackoverflow.com/a/1353711
  if (isNaN(lastChecked)) {
    console.warn(`Invalid lastChecked date from string: "${dateString}", defaulting to lastChecked to now. This means no alerts will be sent. You can ignore this message if it's your first time running the script.`)
    return new Date()
  }
  return lastChecked
}

const isNewPost = (entry, lastChecked) =>
  entry.isoDate && 
  new Date(entry.isoDate) > lastChecked

const isNYFlightDeal = (entry) => 
  entry.categories?.includes('New York City')

const sendAlert = async (entry) => {
  console.log(`[${new Date()}] Sending alert for: ${entry.link}`)
  await axios.post(SLACK_WEBHOOK_URL, {
    text: entry.link,
    unfurl_links: true
  })
}

(async () => {
  const lastChecked = await getLastChecked()

  // https://github.com/rbren/rss-parser#usage
  const feed = await parser.parseURL('https://www.theflightdeal.com/feed/')
  const alerts = feed.items.filter(entry =>
    isNewPost(entry, lastChecked) && isNYFlightDeal(entry))

  for (const entry of alerts) {
    await sendAlert(entry)
  }

  // save current time to disk as last successful run
  await fs.writeFile(LAST_CHECKED_FILE, new Date().toISOString(), 'utf8')
})()