# Start from an official image with both Python and Node.js installed
FROM node:18-slim

# Install Python, pip, and the venv module
RUN apt-get update && \
    apt-get install -y python3 python3-pip python3-venv && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory to /app
WORKDIR /app

# Copy the Python requirements file
COPY requirements.txt .

# Create and activate a virtual environment, then install dependencies
RUN python3 -m venv venv && \
    . venv/bin/activate && \
    pip install --no-cache-dir -r requirements.txt

# Copy the backend package.json and package-lock.json and install dependencies
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

# Copy the backend source code
COPY backend/ .

# Set the working directory for frontend setup
WORKDIR /app/backend/frontend

RUN npm install

# Expose the desired port
EXPOSE 3001

# Set the default working directory
WORKDIR /app/backend

# Define the command to run the application
CMD ["node", "index.js"]
