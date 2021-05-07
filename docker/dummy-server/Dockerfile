FROM node:12
RUN mkdir -p /app
WORKDIR /app
COPY ./dummy-server/package*.json ./
RUN npm ci -qy
COPY ./dummy-server .
EXPOSE 4000
CMD [ "npm", "run", "start" ]

