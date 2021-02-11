const request = require('request');
const fs = require('fs');
const readline = require('readline');
const isValid = require('is-valid-path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const args = process.argv.slice(2);
const url = args[0];
const filePath = args[1];

// check valid file path
if (!isValid(filePath)) {
  rl.close();
  return console.log('The file path is invalid. Please try again.');
} else {
  
  // request webpage info
  request(url, (error, response, body) => {
    let dataSize = (body.length);

    if (fs.existsSync(filePath)) {
      rl.question('The file name entered already exists. To overwrite the file, type in \'Y\' and press \'Enter\' ', (answer) => {
        if (answer === 'y' || answer === 'Y') {
          fs.writeFile(filePath, body, err => {
            if (err) {
              return console.log(err);
            } else {
              console.log(`Downloaded and saved ${dataSize} bytes to ${filePath}`);
              rl.close();
            }
          });
        
        } else {
          console.log('Closing fetcher node app. Good bye!');
          rl.close();
        }
      });

    } else {
      // write in file system
      fs.writeFile(filePath, body, function(err) {
        if (err) {
          return console.log(err);
        } else {
        // if file exists
          console.log(`Downloaded and saved ${dataSize} bytes to ${filePath}`);
          rl.close();
        }
      });
    }
  });
}
// ROUND ABOUT WAY TO GET FILE SIZE (DATA VARIABLE)
// request(url, (error, response, body) => {})
//   .on('response', function(response) {
//   // unmodified http.IncomingMessage object
//     response.on('data', function(data) {
//     // compressed data as it is received
//       console.log('received ' + data.length + ' bytes of compressed data');
//     });
//   });