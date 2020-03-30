var express = require('express')
var cors = require('cors')
var app = express();

var http = require('http');

var arduinoPompaUrl = 'http://81.181.231.218:8000/';
var arduinoPompaMariusUrl = 'http://192.168.10.102:8000/';

app.use(cors());
 
app.get('/arduino_pompa', function (req, res, next) {
	http.get(`${arduinoPompaUrl}getstatus`, (response) => {
	  const { statusCode } = response;
	  const contentType = response.headers['content-type'];

	  if (statusCode !== 200) {
		console.log(`Error: ${statusCode}`);
		response.resume();
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
})
 
app.get('/arduino_pompa_marius', function (req, res, next) {
	http.get(`${arduinoPompaMariusUrl}getstatus`, (response) => {
	  const { statusCode } = response;
	  const contentType = response.headers['content-type'];

	  if (statusCode !== 200) {
		console.log(`Error: ${statusCode}`);
		response.resume();
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
})

var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})