FROM node:20-alpine

# Install cron
RUN apk add --no-cache dcron

# Set up your Node.js app
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Add your script to crontab
RUN echo "0 * * * * /usr/local/bin/node --env-file=/app/.env /app/index.js >> /var/log/cron.log 2>&1" > /etc/crontabs/root

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

# Run the command on container startup
CMD ["sh", "-c", "crond -f & tail -f /var/log/cron.log"]
