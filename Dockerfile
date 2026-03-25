FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

# Accetta argomenti build
ARG NEXT_PUBLIC_BASE_URL
#NEXT PUBLIC VIENE RISOLTA A BUILD TIME
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]