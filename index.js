import express from 'express';
const app = express();
const PORT = 3000;

import { getAlbums, getAlbumByRank, addAlbum } from './helpers.js';

app.use(express.json());

app.get('/', function (req, res) {
  res.send('Welcome to 100 Greatest Albums API');
});

//Listen for a get request
app.get('/albums', async function (req, res) {
  //respond album list
  const albums = await getAlbums();
  res.status(200).json(albums);
});

//Lookup a particular rank in album list
//Listen for GET request with a given rank.
app.get('/albums/:rank', async function (req, res) {
  try {
    //Get rank
    const rank = parseInt(req.params.rank);
    //get album by rank
    const album = await getAlbumByRank(rank);
    //resond with the album at given rank
    res.status(200).json(album);
  } catch {
    res.status(404).send('Not Found');
    return null;
  }
});

app.post('/albums', async function (req, res) {
  // Get the info from the client, destructured to keep it readable.
  const { album, artist, year, genre, subgenre } = req.body;
  //Check we have minimum input and if not cancel request.
//   if (!(album || artist)) {
//     res.status(400).send('Minimum input Album and Artist');
//     return;
//   }
  //Add the new album
  const userAlbum = await addAlbum(
    album,
    artist,
    year,
    genre,
    subgenre
  );
  res.status(201).json(userAlbum);
});

app.listen(PORT, function () {
  console.log(`Server is now listening on http://localhost:${PORT}`);
});
