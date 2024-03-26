const logout = (req, res) => {
  res.clearCookie("tlog", { httpOnly: true, sameSite: "none", secure: true });
  res.send({ loggedout: true });
};

module.exports = logout;
