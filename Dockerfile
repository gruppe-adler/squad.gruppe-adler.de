FROM node:10

# Create app directory
WORKDIR /usr/src/app/

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./package*.json ./

# Install node_modules
RUN npm ci

# Bundle app source
COPY ./ .

# Compile 
RUN [ "npm", "run", "tsc" ]

EXPOSE 80
VOLUME ["/usr/src/app/resources"]

ENTRYPOINT [ "npm", "run", "prod" ]