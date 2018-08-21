const http = require('http');
const shell = require('shelljs');
const fs = require('fs');
const fileStr = 'F:/HttpServer';
const fileExtension = '.bat';

const server = http.createServer(function (req, res) {
	
	if(req.method == 'POST') {
		try {
		const stat = fs.lstatSync(fileStr+req.url+fileExtension);
		if(stat.isFile){
			let shellFileName = '".' + req.url  +'"';
			shell.exec(shellFileName);
			res.writeHead(200);
			console.log("WELL DONE BABY");
		}
		} catch(err) {
			res.writeHead(404, {'Content-Type': 'text/html'});
			res.write('Page 404 not found');
		}

	} else {
		res.writeHead(404, {'Content-Type': 'text/html'});
		res.write('Page 404 not found');
	}
    res.end();
}).listen(8080);

