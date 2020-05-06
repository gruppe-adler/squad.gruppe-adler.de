FROM node:10 AS builder

# Create app directory
WORKDIR /tmp

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

##########################################################################################
FROM node:10-alpine

WORKDIR /usr/src/app/

# Copy built api files
COPY --from=builder /tmp/build ./build/
COPY --from=builder /tmp/package*.json ./

# Install depencies
RUN npm ci --only=production

EXPOSE 80
VOLUME ["/usr/src/app/resources"]

ENTRYPOINT [ "npm", "run", "prod" ]
