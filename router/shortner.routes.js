import express from "express";
import {
  HomePage,
  createShortLink,
  redirectToOriginalURL,
} from "../controller/urlShortnerController.js";
const shortner_Router = express.Router();

// home page route.....

shortner_Router.route("/").get(HomePage);

shortner_Router.route("/").post(createShortLink);

shortner_Router.route("/:shortCode").get(redirectToOriginalURL);

export default shortner_Router;
