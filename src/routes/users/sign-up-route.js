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
    console.log("!!!!OPTIONS");
    console.log(request.headers.origin);
    const origin = request.headers.origin;
    // IE8 does not allow domains to be specified, just the *
    // headers["Access-Control-Allow-Origin"] = req.headers.origin;

    response.setHeader("Access-Control-Allow-Origin", "*");

    response.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, Redirect, Access-Control-Allow-Origin"
    );

    response.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
    response.setHeader("Access-Control-Allow-Credentials", false);
    response.setHeader("Access-Control-Max-Age", "86400"); // 24 hours

    response.writeHead(200);
    response.end();
    console.log("OPTIONS OK");
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

      response.end(JSON.stringify({ status: "success", user: user }));
    });
  }
};

module.exports = signUpRoute;
