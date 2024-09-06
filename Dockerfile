# Dockerfile
FROM node:18

# Instalar Docker CLI
RUN apt-get update && apt-get install -y docker.io

# Instalar Docker Compose
RUN curl -L "https://github.com/docker/compose/releases/download/2.17.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto en el que Next.js se ejecuta
EXPOSE 3000

# Inicia la aplicación
CMD ["npm", "run", "dev"]
