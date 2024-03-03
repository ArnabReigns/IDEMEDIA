const required = (list) => (req, res, next) => {
  var errors = [];

  list.forEach((l) => {
    if (req.body[l] == null) errors.push({ field: l, msg: `${l} is required` });
  });

  if (errors.length > 0)
    res.status(400).json({
      error: true,
      errors: errors,
    });
  else next();
};

module.exports = required;
