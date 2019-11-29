const qs = require("querystring");

const checkUrl = url => {
  const pathname = url.pathname;
  const query = url.query;

  const path = {
    pathname: ""
  };

  const i = pathname.slice(1).indexOf("/");

  if (i === -1) {
    path.pathname = pathname;
  } else {
    path.pathname = pathname.slice(0, i + 1);
    const rest = pathname.slice(i + 1);
    path.id = rest.slice(1);
  }

  if (query) {
    path.query = qs.parse(query);
  }

  console.log("Path:", path);
  return path;
};

module.exports = checkUrl;
