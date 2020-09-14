# Use the official base image as a parent image.
FROM node:current-slim

# Set the working directory.
# WORKDIR ./

# Copy the file from host to current location.
COPY package.json .

# Run the command inside image filesystem.
RUN npm install

# Add metadata to the image to describe which port the container is listening on at runtime.
EXPOSE 8080

# Run the specified command within the container.
CMD [ "npm", "run", "build" ]

# Copy rest of app's source code from host to image filesystem.
COPY . .

# TO BUILD
# docker build -t giftgrid .

# TO RUN
# docker run -it -d --rm -p 3000:3000 -v $(pwd):/giftgrid -e CHOKIDAR_USEPOLLING=true --name hp giftgrid
