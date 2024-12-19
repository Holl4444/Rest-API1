import path from 'node:path';

export const FILEPATH = path.resolve(process.cwd(), 'albums.json');

// What happens in the code:
// process.cwd() retrieves the current working directory where the Node.js script is being run.
// 'albums.json' is added to the path, and path.resolve() combines them into a full absolute path.
// This full absolute path is assigned to the FILEPATH constant.
// The FILEPATH constant is then exported so it can be used in other files/modules.
// Example:
// If the current working directory is /home/user/project, and 'albums.json' is in the same directory, path.resolve() would return /home/user/project/albums.json.

// This line is essentially providing an absolute file path to the albums.json file.