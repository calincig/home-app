const http = require('http');

/*const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});*/

var express = require('express');
var app = express();
var fs = require("fs");

app.get('/arduino_pompa', function (req, res) {
	http.get('http://81.181.231.218:8000/getstatus', (response) => {
	  const { statusCode } = response;
	  const contentType = response.headers['content-type'];

	  let error;
	  if (statusCode !== 200) {
		error = new Error('Request Failed.\n' +
						  `Status Code: ${statusCode}`);
	  } else if (!/^application\/json/.test(contentType)) {
		error = new Error('Invalid content-type.\n' +
						  `Expected application/json but received ${contentType}`);
	  }
	  if (error) {
		console.error(error.message);
		// Consume response data to free up memory
		response.resume();
		return;
	  }

	  response.setEncoding('utf8');
	  let rawData = '';
	  response.on('data', (chunk) => { rawData += chunk; });
	  response.on('end', () => {
		try {
		  
		  res.end( rawData );
		  
		  const parsedData = JSON.parse(rawData);
		  console.log(parsedData);
		} catch (e) {
		  console.error(e.message);
		}
	  });
	}).on('error', (e) => {
	  console.error(`Got error: ${e.message}`);
	});
	/*fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });*/
})

var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})