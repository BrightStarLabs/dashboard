FROM node:20-alpine

WORKDIR /app

# Copy package files first for better Docker layer caching
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy configuration files
COPY vite.config.ts tsconfig.json postcss.config.js tailwind.config.js ./

# Copy public assets and source code
COPY public ./public
COPY src ./src

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
