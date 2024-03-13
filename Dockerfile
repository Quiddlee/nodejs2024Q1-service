ARG NODE_VERSION=20.0.0

FROM node:${NODE_VERSION}-alpine

# add user to group
RUN addgroup app && adduser -S -G app app

# set the user to run the app
USER app

# set the working directory to /app
WORKDIR /app

# copy package.json and package-lock.json to the working directory
# This is done before copying the rest of the files to take advantage of Docker’s cache
# If the package.json and package-lock.json files haven’t changed, Docker will use the cached dependencies
COPY package*.json ./

# Run the application as a root user.
USER root

# change the ownership of the /app directory to the app user
# chown -R <user>:<group> <directory>
# chown command changes the user and/or group ownership of for given file.
RUN chown -R app:app .

# Run the application as a non-root user.
USER app

# install dependencies and remove unnecessary files
RUN npm ci && npm cache clean --force && rm -rf \
    ./node_modules/.cache \
    ./node_modules/.npm \
    ./node_modules/.yarn \
    ./node_modules/.pnpm

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE ${PORT}

# Run the application.
CMD npx prisma generate && npm run start:dev
