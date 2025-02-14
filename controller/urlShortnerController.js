import connection from "../config/connection.js";
import crypto from "crypto";
const db = await connection();

const getData = async () => {
  try {
    const [data] = await db.execute("select * from links");
    if (data.length !== 0) {
      return data || [];
    }
  } catch (error) {
    console.log("error in getData functionality:", error);
  }
};
// create the table at the top
// const tableCreate = await db.execute(
//   `create table links( id INT AUTO_INCREMENT PRIMARY KEY,
//   url VARCHAR(255) NOT NULL,
//   shortCode VARCHAR(50))`
// );

const saveToDB = async (url, shortCode) => {
  try {
    // save data in tables ke andar
    await db.execute(`insert into links(url,shortCode) values(?,?)`, [
      url,
      shortCode,
    ]);
  } catch (error) {
    console.log(`error in saveToDb`, error);
  }
};
const HomePage = async (req, res) => {
  try {
    const data = await getData();
    if (data && data.length > 0) {
      return res.render("index", { data, hostLink: req.host });
    }
  } catch (error) {
    console.log("error in Hompage Controller", error);
  }
};

const createShortLink = async (req, res) => {
  try {
    // const data = await getData();
    let { url, shortCode } = req.body.form;

    if (!url) {
      return res.send(
        ` <h1 style="text-align:center"> url can't be empty.. </h1>`
      );
    }
    const [existShortCode] = await db.execute(
      `select * from links where shortCode=?`,
      [shortCode]
    );

    if (existShortCode.length !== 0) {
      return res.send(`shortCode ${shortCode} is already existed`);
    }
    shortCode = shortCode || crypto.randomBytes(5).toString("hex");
    await saveToDB(url, shortCode);
    return res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
const redirectToOriginalURL = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const [link] = await db.execute("select * from links where shortCode=?", [
      shortCode,
    ]);

    if (!link || link.length === 0) {
      return res.send(`${shortCode} is not present in database`);
    }
    const originalURL = link[0].url;
    // console.log(originalURL);
    return res.redirect(originalURL);
  } catch (error) {
    console.log(error);
  }
};

export { HomePage, createShortLink, redirectToOriginalURL };
