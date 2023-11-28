FROM node:14-alpine
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm i
RUN npx hardhat node
RUN npx hardhat run --network localhost
