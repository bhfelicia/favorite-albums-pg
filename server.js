const { client, syncAndSeed } = require("./db");
const express = require("express");

const app = express();

const init = async () => {
  try {
    await client.connect();
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
init();
