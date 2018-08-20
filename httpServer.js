const http = require('http');
const shell = require('shelljs');


const server = http.createServer(function (req, res) {
	
	if(req.url == '/redeploy' && req.method == 'POST'){
		shell.exec('script.bat');
		console.log('' + req.method);
		console.log('well done baby');
		res.writeHead(200);
		
	} else {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write('Page 404 not found');
	}
    
    res.end();
}).listen(8080);

