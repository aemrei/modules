FROM node:current-alpine AS build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies using yarn
COPY package.json yarn.lock ./
RUN yarn install

# Bundle app source
COPY . .

# Build app
RUN yarn build

# Production image
FROM nginx:stable-alpine

# Copy build from build stage
COPY --from=build /usr/src/app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY support/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
