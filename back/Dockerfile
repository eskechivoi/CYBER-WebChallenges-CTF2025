FROM node:20

# Crea el directorio de la app
WORKDIR /app

# Instala dependencias
COPY package.json ./
RUN npm install

# Copia el código
COPY . .

# Exponer el puerto
EXPOSE 4000

# Iniciar el servidor
CMD ["node", "app.js"]
