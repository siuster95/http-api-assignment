const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const getSuccess = (request, response, type) => {
  if (type[0] === 'text/xml') {
    response.writeHead(200, { 'Content-Type': 'text/xml' });
    let responseXML = '<response>';
    responseXML += '<message>This is a successful response</message>';
    responseXML += '</response>';
    response.write(responseXML);
    response.end();
  } else {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    const object = JSON.stringify({ message: 'This is a successful response' });
    response.write(object);
    response.end();
  }
};

const getbadRequest = (request, response, type, query) => {
  console.log(query);
  if (query === 'valid=true') {
    if (type[0] === 'text/xml') {
      response.writeHead(200, { 'Content-Type': 'text/xml' });
      let responseXML = '<response>';
      responseXML += '<message>This request has the required parameters</message>';
      responseXML += '</response>';
      response.write(responseXML);
      response.end();
    } else {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      const object = JSON.stringify({ message: 'This request has the required parameters' });
      response.write(object);
      response.end();
    }
  } else if (type[0] === 'text/xml') {
    response.writeHead(400, { 'Content-Type': 'text/xml' });
    let responseXML = '<response>';
    responseXML += '<message>Missing valid query parameter set to true</message>';
    responseXML += '<id>badRequest</id>';
    responseXML += '</response>';
    response.write(responseXML);
    response.end();
  } else {
    response.writeHead(400, { 'Content-Type': 'application/json' });
    const object = JSON.stringify({ message: 'Missing valid query parameter set to true', id: 'badRequest' });
    response.write(object);
    response.end();
  }
};

const getUnauthorized = (request, response, type, query) => {
  console.log(query);
  if (query === 'loggedIn=yes') {
    if (type[0] === 'text/xml') {
      response.writeHead(200, { 'Content-Type': 'text/xml' });
      let responseXML = '<response>';
      responseXML += '<message>You have successfully viewed the content</message>';
      responseXML += '</response>';
      response.write(responseXML);
      response.end();
    } else {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      const object = JSON.stringify({ message: 'You have successfully viewed the content' });
      response.write(object);
      response.end();
    }
  } else if (type[0] === 'text/xml') {
    response.writeHead(401, { 'Content-Type': 'text/xml' });
    let responseXML = '<response>';
    responseXML += '<message>Missing loggedIn query parameter set to yes</message>';
    responseXML += '<id>unauthorized</id>';
    responseXML += '</response>';
    response.write(responseXML);
    response.end();
  } else {
    response.writeHead(401, { 'Content-Type': 'application/json' });
    const object = JSON.stringify({ message: 'Missing loggedIn query parameter set to yes', id: 'unauthorized' });
    response.write(object);
    response.end();
  }
};

const getForbidden = (request, response, type) => {
  if (type[0] === 'text/xml') {
    response.writeHead(403, { 'Content-Type': 'text/xml' });
    let responseXML = '<response>';
    responseXML += '<message>You do not have access to this content</message>';
    responseXML += '<id>forbidden</id>';
    responseXML += '</response>';
    response.write(responseXML);
    response.end();
  } else {
    response.writeHead(403, { 'Content-Type': 'application/json' });
    const object = JSON.stringify({ message: 'You do not have access to this content', id: 'forbidden' });
    response.write(object);
    response.end();
  }
};

const getInternal = (request, response, type) => {
  if (type[0] === 'text/xml') {
    response.writeHead(500, { 'Content-Type': 'text/xml' });
    let responseXML = '<response>';
    responseXML += '<message>Internal Server Error, Something went wrong</message>';
    responseXML += '<id>internalError</id>';
    responseXML += '</response>';
    response.write(responseXML);
    response.end();
  } else {
    response.writeHead(500, { 'Content-Type': 'application/json' });
    const object = JSON.stringify({ message: 'Internal Server Error, Something went wrong', id: 'internalError' });
    response.write(object);
    response.end();
  }
};

const getNotimplemented = (request, response, type) => {
  if (type[0] === 'text/xml') {
    response.writeHead(501, { 'Content-Type': 'text/xml' });
    let responseXML = '<response>';
    responseXML += '<message>A get request for this page has not been implemented yet. Check again later for updated content</message>';
    responseXML += '<id>notImplemented</id>';
    responseXML += '</response>';
    response.write(responseXML);
    response.end();
  } else {
    response.writeHead(501, { 'Content-Type': 'application/json' });
    const object = JSON.stringify({ message: 'A get request for this page has not been implemented yet. Check again later for updated content', id: 'notImplemented' });
    response.write(object);
    response.end();
  }
};

const getNotfound = (request, response, type) => {
  if (type[0] === 'text/xml') {
    response.writeHead(404, { 'Content-Type': 'text/xml' });
    let responseXML = '<response>';
    responseXML += '<message>The page you are looking for was not found</message>';
    responseXML += '<id>notFound</id>';
    responseXML += '</response>';
    response.write(responseXML);
    response.end();
  } else {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    const object = JSON.stringify({ message: 'The page you are looking for was not found', id: 'notFound' });
    response.write(object);
    response.end();
  }
};


const getIndex = (request, response, type) => {
  console.log(type);
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getCSS = (request, response, type) => {
  console.log(type);
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};


module.exports.getSuccess = getSuccess;
module.exports.getbadRequest = getbadRequest;
module.exports.getIndex = getIndex;
module.exports.getCSS = getCSS;
module.exports.getUnauthorized = getUnauthorized;
module.exports.getForbidden = getForbidden;
module.exports.getInternal = getInternal;
module.exports.getNotimplemented = getNotimplemented;
module.exports.getNotfound = getNotfound;
