const mainRoute = (request, response) => {
  if (request.method === "OPTIONS") {
    console.log("!OPTIONS");
    const headers = {};
    // IE8 does not allow domains to be specified, just the *
    // headers["Access-Control-Allow-Origin"] = req.headers.origin;
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
    headers["Access-Control-Allow-Credentials"] = false;
    headers["Access-Control-Max-Age"] = "86400"; // 24 hours
    headers["Access-Control-Allow-Headers"] =
      "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
    response.writeHead(200, headers);
    response.end();
  } else {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("<h1>Hello, World!</h1>");
    response.end();
  }
};

module.exports = mainRoute;
