let http = require('http');
let fs = require('fs');
let str = 'This  is our script';

fs.writeFile('script.txt', str, function (err) {
    if (err) throw err;
    console.log('Saved!');
});

http.createServer(function (req, res) {
    res.writeHead(200);
	res.write(req.url);
    res.end();
}).listen(8080);