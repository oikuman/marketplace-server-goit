const http = require("http");
const url = require("url");

const morgan = require("morgan");
const checkUrl = require("./check-url");
const router = require("./routes/router");

const logger = morgan("combined");

const startServer = port => {
  const server = http.createServer((request, response) => {
    const parsedUrl = url.parse(request.url);

    // added function
    const checkedUrl = checkUrl(parsedUrl);

    // taking into account /first
    const func = router[checkedUrl.pathname] || router.default;

    logger(request, response, () => func(request, response, checkedUrl));
  });

  server.listen(port);
};

module.exports = startServer;
