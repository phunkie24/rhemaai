FROM node:20-alpine

WORKDIR /app

# Install dependencies first (cached layer)
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
