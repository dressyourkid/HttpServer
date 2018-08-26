const http = require('http');
const shell = require('shelljs');
const fs = require('fs');
const path = require('path');
const Folder = './scripts';

const server = http.createServer(function (req, res) {
	
	if(req.method == 'POST') {
		const cutUrlName = path.parse(req.url).name;
			fs.readdir(Folder, (err, files) => {
				let found = files.find(file => {
					const cutFileName = file.toString().split('.').slice(0, -1).join('.');
					if(cutFileName === cutUrlName){
						return cutFileName;
					}
				});
					if(found !== undefined){
						let shellFileName = '".' + req.url  +'"';
						shell.exec(shellFileName);
						res.writeHead(200);
					} else {
						res.writeHead(404, {'Content-Type': 'text/html'});
						res.write('Page 404 not found');
					}
			});
	} else {
		res.writeHead(404, {'Content-Type': 'text/html'});
		res.write('Page 404 not found');
	}	
    res.end();
}).listen(8080);

