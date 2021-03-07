const pg = require("pg");

const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/favorite-albums-pg"
);
//shore by fleet foxes
//be the cowboy by mitski
//OK Computer by Radiohead
//4 by Beyonce

const syncAndSeed = async () => {
  const SQL = `
  drop table if exists album;
  drop table if exists artist;
  create table artist(
    id serial primary key,
    name varchar(100) not null
    );
  create table album(
    id serial primary key,
    title varchar(100) not null,
    genre varchar(100),
    artist_id INTEGER REFERENCES artist(id)
  );

  insert into artist(name) values('Fleet Foxes');
  insert into artist(name) values('Mitski');
  insert into artist(name) values('Radiohead');
  insert into artist(name) values('
  Beyoncé');

  insert into album(title, genre, artist_id) values('Shore', 'Neo-folk', 1);
  insert into album(title, genre, artist_id) values('Helplessness Blues', 'Neo-folk', 1);
  insert into album(title, genre, artist_id) values('Fleet Foxes', 'Neo-folk', 1);
  insert into album(title, genre, artist_id) values('Crack-Up', 'Neo-folk', 1);

  insert into album(title, genre, artist_id) values('Be the Cowboy', 'Alternative/Indie', 2);
  insert into album(title, genre, artist_id) values('Bury Me At Makeout Creek', 'Alternative/Indie', 2);
  insert into album(title, genre, artist_id) values('Puberty 2', 'Alternative/Indie', 2);

  insert into album(title, genre, artist_id) values('OK Computer', 'Alternative/Experimental Rock', 3);
  insert into album(title, genre, artist_id) values('Kid A', 'Alternative/Experimental Rock', 3);
  insert into album(title, genre, artist_id) values('Pablo Honey', 'Alternative/Experimental Rock', 3);

  insert into album(title, genre, artist_id) values('4', 'Hip Hop/R&B', 4);
  insert into album(title, genre, artist_id) values('Beyoncé: Platinum Edition', 'Hip Hop/R&B', 4);
  insert into album(title, genre, artist_id) values('I Am...Sasha Fierce', 'Hip Hop/R&B', 4);
  `;

  await client.query(SQL);
};

module.exports = {
  client,
  syncAndSeed,
};
