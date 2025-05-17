import "dotenv/config.js";

export const server = {
    protocol: process.env.PROTOCOL,
    host: process.env.HOST,
    port: process.env.PORT
};