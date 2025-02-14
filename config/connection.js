import mysql from "mysql2/promise";

const connection = async () => {
  try {
    const db = await mysql.createConnection({
      host: process.env.host,
      user: process.env.user,
      password: process.env.password,
      database: process.env.database,
    });
    console.log(`connection to the database build successfully..`);
    return db;
  } catch (error) {
    console.log(error);
  }
};

export default connection;
