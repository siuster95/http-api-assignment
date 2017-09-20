const http = require('http');
// const htmlHandler = require('./htmlResponses.js');
const ResponsesHandler = require('./Responses.js');
const url = require('url');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/success': ResponsesHandler.getSuccess,
  '/': ResponsesHandler.getIndex,
  '/style.css': ResponsesHandler.getCSS,
  '/forbidden': ResponsesHandler.getForbidden,
  '/internal': ResponsesHandler.getInternal,
  '/notImplemented': ResponsesHandler.getNotimplemented,
  '/notFound': ResponsesHandler.getNotfound,
};

const otherUrlstruct = {
  '/badRequest': ResponsesHandler.getbadRequest,
  '/unauthorized': ResponsesHandler.getUnauthorized,
};


const onRequest = (request, response) => {
  const acceptType = request.headers.accept.split(',');
  const urlparts = url.parse(request.url);
  const query = urlparts.query;
  console.log(urlparts.pathname);
  if (urlStruct[urlparts.pathname]) {
    console.log('response');
    urlStruct[urlparts.pathname](request, response, acceptType);
  } else if (otherUrlstruct[urlparts.pathname]) {
    console.log('response2');
    otherUrlstruct[urlparts.pathname](request, response, acceptType, query);
  } else {
    console.log('html');
    if(url.pathname != "")
    {
      ResponsesHandler.getNotfound(request,response,["application/json"]);
    }
    else
    {
    ResponsesHandler.getIndex(request, response, acceptType);
    }
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on port 127.0.0.1: ${port}`);
