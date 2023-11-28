FROM node
WORKDIR /app
COPY . .
RUN npm install

EXPOSE 8545
CMD ["/bin/bash", "-c", "npx hardhat node && sleep 5 && npx hardhat run --network localhost ./scripts/deploy.js"]
