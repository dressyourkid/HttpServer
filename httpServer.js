const http = require('http');
const shell = require('shelljs');


const server = http.createServer(function (req, res) {
	if(req.url == '/redeploy'){
		shell.exec('script.bat');
		console.log('well done baby');
	}
    res.writeHead(200);
    res.end();
}).listen(8080);

