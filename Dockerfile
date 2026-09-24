# ==========================================
# ETAPA 1: COMPILAR REACT
# ==========================================

FROM node:22-bookworm-slim AS build

WORKDIR /app

# Copiar dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm ci

# Copiar codigo fuente
COPY . .

# Compilar React
RUN npm run build


# ==========================================
# ETAPA 2: PUBLICAR CON NGINX
# ==========================================

FROM nginx:stable-alpine

# Eliminar configuracion predeterminada
RUN rm /etc/nginx/conf.d/default.conf

# Copiar nuestra configuracion
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar frontend compilado
COPY --from=build /app/build /usr/share/nginx/html/api-consumo

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]