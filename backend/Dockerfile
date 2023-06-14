# Imagen de node a la ultima version
FROM node:latest
# Instalamos nano
RUN apt-get update && apt-get install -y nano && apt-get install -y netcat-openbsd
# directorio de trabajo
WORKDIR /usr/src/app

COPY . .
RUN npm install

EXPOSE 3000

# cuando inicie el contenedor se va ejecutar el comando npm start
