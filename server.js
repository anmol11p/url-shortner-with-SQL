import express from "express";
import path from "path";
import shortner_Router from "./router/shortner.routes.js";
const server = express();
const Static_Path = path.join(import.meta.dirname, "public");

server.use(express.static(Static_Path));
server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");
server.use("/", shortner_Router);
const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`server is listening on ${PORT}`));
