# Step 1: Verwende ein Node.js Image
FROM node:18-alpine

# Step 2: Setze das Arbeitsverzeichnis
WORKDIR /app

# Step 3: Kopiere package.json und package-lock.json ins Arbeitsverzeichnis
COPY package*.json ./

# Step 4: Installiere die Abhängigkeiten
RUN npm install

# Step 5: Kopiere den Rest des Angular-Projekts
COPY . .

# Step 6: Expose Port 4200, auf dem der Angular Development Server läuft
EXPOSE 80

# Step 7: Starte die Angular-App mit `ng serve`
CMD ["npm", "start"]
