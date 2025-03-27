FROM node:20

# Crea el directorio de la app
WORKDIR /app

# Instala dependencias
COPY package.json ./
RUN npm install

# Copia el código
COPY . .
RUN mkdir data && echo -n "[]" > data/users.json 

# Exponer el puerto
EXPOSE 4000

# Iniciar el servidor
CMD ["node", "app.js"]
