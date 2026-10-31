# 1. Initialize a clean slate
FROM node:20-alpine

# 2. Create the workspace. Docker shifts into /usr/src/app
WORKDIR /usr/src/app

# 3. Copies 'package.json' from your machine into /usr/src/app/package.json
COPY package*.json ./

# 4. Executes 'npm install' inside /usr/src/app
RUN npm install --only=production

# 5. Copies all your backend folders/files into /usr/src/app
COPY . .

# 🚀 6. THE PATCH: Open port 8000 to match your production environment variable configuration
EXPOSE 8000

# 7. Starts the backend by executing 'node /usr/src/app/src/index.js'
CMD ["node", "src/index.js"]
