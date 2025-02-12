FROM node:18-alpine

# Crear y establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Variables de entorno para producción
ENV NODE_ENV=production
ENV PORT=5000

# Exponer el puerto que usa la aplicación
EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
