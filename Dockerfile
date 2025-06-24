# 1. Use official Node.js LTS image
FROM node:18-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package files and install deps
COPY package*.json ./
RUN npm install

# 4. Copy rest of the app
COPY . .

# 5. Build the app
RUN npm run build

# 6. Expose the default Next.js port
EXPOSE 3000

# 7. Start the Next.js app
CMD ["npm", "run", "start"]
