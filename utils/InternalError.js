const internalError = (res, msg = "Internal server error") => {
  return res.status(500).json({ error: true, msg });
};

module.exports = internalError;
