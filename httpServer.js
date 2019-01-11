const http = require('http');
const shell = require('shelljs');
const fs = require('fs');
const folder = process.env.SCRIPTS_DIR || './scripts';
const httpPort = process.env.PORT || 8080;

const server = http.createServer(function (req, res) {
	
	if(req.method == 'POST') {
		const cutUrlName = req.url.replace('/', '');
		try {
			let files = fs.readdirSync(folder);
            console.log(folder, 'found', files);
			let found = files.find(file => {
				return file.toString() === cutUrlName;
			});
			if (found === undefined) {
				notFoundResponse(res);
				return;
			}
			let shellFileName = `sudo sh ${folder}${req.url}`;
			let execResult = shell.exec(shellFileName);
			if (execResult.code === 0) {
				res.writeHead(500, {'Content-Type': 'Application/json'});
				res.write(JSON.stringify({ error: execResult.code }));
			} else {
				res.writeHead(200, {'Content-Type': 'Application/json'});
				res.write(JSON.stringify({ output: execResult.stdout }));
			}
			res.end();
		} catch(err) {
			res.writeHead(500, {'Content-Type': 'Application/json'});
			res.write(JSON.stringify({ error: err }));
			res.end();
		}
	} else {
		notFoundResponse(res);
	}
}).listen(httpPort);

function notFoundResponse(res) {
	res.writeHead(404, {'Content-Type': 'Application/json'});
	res.write(JSON.stringify({ message: 'Requested script not found' }));
	res.end();
}

