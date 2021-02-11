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
    // error or non-200 status code
    if (error || response.statusCode !== 200) {
      rl.close();
      return console.log('There seems to be something wrong with the webpage. Please check the URL or try again later.');
    }
    
    let dataSize = (body.length);

    if (fs.existsSync(filePath)) {
      rl.question('The file name entered already exists. To overwrite the file, type in \'Y\' and press \'Enter\'. ', (answer) => {
        if (answer === 'y' || answer === 'Y') {
          fs.writeFile(filePath, body, (error) => {
            if (error) {
              rl.close();
              return console.log(error);
            } else {
              rl.close();
              return console.log(`File overwrite accepted. Downloaded and saved ${dataSize} bytes to ${filePath}`);
            }
          });
        
        } else {
          console.log('File overwrite denied. Closing fetcher node app. Good bye!');
          return rl.close();
        }
      });

    } else {
      // write in file system
      fs.writeFile(filePath, body, function(err) {
        if (err) {
          return console.log(err);
        } else {
          // download file
          rl.close();
          return console.log(`Downloaded and saved ${dataSize} bytes to ${filePath}`);
        }
      });
    }
  });
}

// ROUND ABOUT WAY TO GET FILE SIZE ('DATA' VARIABLE)
// request(url, (error, response, body) => {})
//   .on('response', function(response) {
//   // unmodified http.IncomingMessage object
//     response.on('data', function(data) {
//     // compressed data as it is received
//       dataSize = data.length;
//       console.log('Downloaded data size is: ' + data.length + ' bytes.');
//     });
//   });