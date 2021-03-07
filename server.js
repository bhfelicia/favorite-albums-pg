const { client, syncAndSeed } = require("./db");
const express = require("express");
const path = require("path");

const html = require("html-template-tag");

const app = express();

app.get("/", async (req, res, next) => {
  try {
    const allArtists = (await client.query(`select * from artist;`)).rows;
    res.send(html`
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>All Artists</title>
</head>
<body>
  <h1 id="all-artists">These are a few of my favorite artists!</h1>
    ${allArtists.map(
      (artist) => html`
        <h2>
          <a href="/artists/${artist.id}"> ${artist.name}</a>
        </h2>
      `
    )}
  </div>
</body>
</html>
    `);
  } catch (error) {
    next(error);
  }
});

app.get("/artists/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const albums = (
      await client.query(
        `select * from album join artist on album.artist_id = artist.id where album.artist_id = $1`,
        [id]
      )
    ).rows;
    res.send(html`<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title></title>
        </head>
        <body>
          <h1>Albums by ${albums[0].name}</h1>
          ${albums.map(
            (album) =>
              html` <h3>${album.title}</h3>
                <!-- <hr /> -->
                <div>Genre: ${album.genre}</div>`
          )}
          <h2><a href="/">Back to All Artists</a></h2>
        </body>
      </html>`);
  } catch (error) {
    next(error);
  }
});

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
