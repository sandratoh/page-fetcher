const request = require('request');
const fs = require('fs');

const args = process.argv.slice(2);
const url = args[0];
const filePath = args[1];

// request webpage info
request(url, (error, response, body) => {
  let dataSize = (body.length);
  // write in file system
  fs.writeFile(filePath, body, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log(`Downloaded and saved ${dataSize} bytes to ${filePath}`);
  });
});

// ROUND ABOUT WAY TO GET FILE SIZE (DATA VARIABLE)
// request(url, (error, response, body) => {})
//   .on('response', function(response) {
//   // unmodified http.IncomingMessage object
//     response.on('data', function(data) {
//     // compressed data as it is received
//       console.log('received ' + data.length + ' bytes of compressed data');
//     });
//   });