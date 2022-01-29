FROM node:12.6.0-alpine as builder

# directory for the app in the container
WORKDIR /usr/app

# copies all the app's files from host into the container folder which
# might include the node_modules dir if npm install executed in the host
COPY . /usr/app

# removes any existing node_modules folder
# this prevents the host's node_modules from being used in the container
# which could cause issues with native binaries such as node_sass.
RUN rm -rf /usr/app/node_modules/

RUN npm ci

RUN npm run build

FROM nginx:1.19-alpine as server

# copy server.conf file from host into the container
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# copy build folder
COPY --from=builder /usr/app/build /usr/share/nginx/html
