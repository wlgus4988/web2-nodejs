var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request, response) {
    var _url = request.url;
    var queryData = new URL('http://localhost:3000' + _url);

    var queryDataId = queryData.searchParams.get('id');
    var path = queryData.pathname;

    if(path === '/') {
        if(!queryDataId) {
            fs.readFile(`data/${queryDataId}`, 'utf8', (err, data) => {
                var title = 'Welcome!!';
                var description = 'Hello, Node.js';
                var template = `
                <!doctype html>
                <html>
                <head>
                    <title>WEB1 - ${title}</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1><a href="/">WEB</a></h1>
                    <ul>
                        <li><a href="/?id=HTML">HTML</a></li>
                        <li><a href="/?id=CSS">CSS</a></li>
                        <li><a href="/?id=JavaScript">JavaScript</a></li>
                    </ul>
                    <h2>${title}</h2>
                    <p>${description}</p>
                </body>
                </html>
                `;
                response.writeHead(200);
                response.end(template);
            });
        } else {
            fs.readFile(`data/${queryDataId}`, 'utf8', (err, data) => {
                var title = queryDataId;
                var description = data;
                var template = `
                <!doctype html>
                <html>
                <head>
                    <title>WEB1 - ${title}</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1><a href="/">WEB</a></h1>
                    <ul>
                        <li><a href="/?id=HTML">HTML</a></li>
                        <li><a href="/?id=CSS">CSS</a></li>
                        <li><a href="/?id=JavaScript">JavaScript</a></li>
                    </ul>
                    <h2>${title}</h2>
                    <p>${description}</p>
                </body>
                </html>
                `;
                response.writeHead(200);
                response.end(template);
                });
            }
    } else {
        response.writeHead(404);
        response.end('Not found');
    }

});
app.listen(3000);
