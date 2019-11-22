const fs = require("fs");
const path = require("path");
const shortid = require("shortid");

const defineFilename = user => {
  let username = user.username;
  let filename;
  if (username) filename = `${username}.json`;
  else filename = `user${shortid()}.json`;
  return filename;
};

const saveUser = user => {
  const filename = defineFilename(user);
  const pathname = path.join(__dirname, "../../", "db", "users", filename);
  fs.writeFileSync(pathname, JSON.stringify(user), error => {
    if (error) throw error;
  });
};

const signUpRoute = (request, response) => {
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
  } else if (request.method === "POST") {
    let body = "";
    request.on("data", data => {
      body += data;
    });

    request.on("end", () => {
      const user = JSON.parse(body);
      console.log("user:", user);
      saveUser(user);
      response.setHeader("Access-Control-Allow-Origin", "*");
      response.setHeader("Content-Type", "application/json");
      response.writeHead(200);

      response.end(JSON.stringify({ user: user }));
    });
  }
};

module.exports = signUpRoute;
