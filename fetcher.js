const request = require('request');
const fs = require('fs');

const args = process.argv.slice(2);
const url = args[0];
const filePath = args[1];

// request webpage info
// request(url, (error, response, body) => {
//   console.log('error: ', error);
//   console.log('statusCode: ', response && response.statusCode);
//   console.log('body: ', body);
// });


// fs write file
// fs.writeFile(args);

fs.writeFile("/tmp/test", "Hey there!", function(err) {
  if (err) {
    return console.log(err);
  }
  console.log("The file was saved!");
});


// log to console


// const fetcher = (args) => {};