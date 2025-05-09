import express from "express";
import { server } from "./config.js";
import { router } from "./routers/index.js";

// Use express
const app = express();

// Body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Statics 
app.use(express.static("public"));

// Routers
app.use(router);

// Errors Middlewares

// Server
const { protocol, port, host } = server; 
app.listen(port, host, () => {
  console.log(`🚀 Server listening on ${protocol}://${host}:${port}`);
});