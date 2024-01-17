# Use a specific Node.js version based on Debian Buster
FROM node:10-buster

# Set the working directory
WORKDIR /www

# Create the necessary directories in a single layer
RUN mkdir -p /www/src /www/view

# Update, install required packages and clean up in a single layer
RUN apt update && \
    apt-get -y install ffmpeg libx264-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json and then install dependencies
COPY web/package.json web/package-lock.json ./
RUN npm install --quiet

# Copy source code and views
COPY web/src ./src
COPY web/view ./view

# Get the git SHA of the current commit
COPY .git /tmp/
RUN git -C /tmp rev-parse --verify HEAD > git-sha && \
    rm -rf /tmp/.git