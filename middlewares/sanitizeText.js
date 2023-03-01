const sanitize = (req, res, next) => {
  const { body } = req;
  for (const key in body) {
    if (typeof body[key] == "string") {
      body[key] = body[key].replace(/[^a-zA-Z0-9\s@#,.:/=?_-]/gi, "");
    }
  }

  const { params } = req;
  for (const key in params) {
    if (typeof params[key] == "string") {
      params[key] = params[key].replace(/[^a-zA-Z0-9\s@#,.:/=?_-]/gi, "");
    }
  }

  const { query } = req;
  for (const key in query) {
    if (typeof query[key] == "string") {
      query[key] = query[key].replace(/[^a-zA-Z0-9\s@#,.:/=?_-]/gi, "");
    }
  }
  
  next();
};

module.exports = sanitize;
