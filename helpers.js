import { promises as fs } from 'node:fs';

// In summary, import { promises as fs } from "node:fs" is bringing in the promise-based file system methods from Node.js, giving you a simpler and more modern way to handle asynchronous file operations.

import { FILEPATH } from './config.js';

// Read the albums from albums.json
// parse as JSON
export async function readAlbums() {
  try {
    const albums = await fs.readFile(FILEPATH, 'utf8');
    return JSON.parse(albums);
  } catch {
    console.error('Error reading file:', error);
    return null;
  }
}

// Write
export async function writeAlbums(albums) {
  try {
    await fs.writeFile(FILEPATH, JSON.stringify(albums), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing file:', error);
    return false;
  }
}

// Access the JSON formatted album list and return it
export async function getAlbums() {
  const albums = await readAlbums();
  return albums;
}

//Lookup a particular rank in album list
//Listen for GET request with an rank given.
export async function getAlbumByRank(rank) {
  //read Albums
  const albums = await getAlbums();
  // get :id
  const album = albums[rank - 1];
  //resond with the album at given rank
  return album;
}

export async function getNextRank() {
  return length;
}

//Add an album
//create an object with any of the following. Number must be
// albums.length + 1 to avoid overwriting anything. We can't slot in due to pre existing ranks without changing everything. A stretch goal.
// Request body expected to contain:
// {
//     ("Number": ,)
//     "Year": ,
//     "Album": "",
//     "Artist": "",
//     "Genre": "",
//     "Subgenre": ""
// }

export async function addAlbum(
  album,
  artist,
  year = '',
  genre = '',
  subgenre = ''
) {
  //Create a new album object
  const userAlbum = {
    Number: null,
    year,
    album,
    artist,
    genre,
    subgenre,
  };
  // read the albums
  const albums = await readAlbums();
  //get the current length which is also the current top rank and add one to it
  const length = albums.length + 1;
  // add this as the value of the number property
  userAlbum.Number = length;
  //Add the new album to the end of albums
  albums.push(userAlbum);
  // write it back into albums.json
  await writeAlbums(albums);
  //finally return just the info we added.
  return userAlbum;
}

export async function editSubgenre(number, newSubgenre) {
  //Read albums
  const albums = await readAlbums();
  //Find album
  const album = albums[number - 1];
  //IF
  // if we have an argument at newSubgenre add that as "Subgenre" value
  // else keep old value

  album.Subgenre = newSubgenre ?? album.Subgenre;
  //Save updated
  await writeAlbums(albums);
  //Tell client what they changed /confirm
  return album;
}
