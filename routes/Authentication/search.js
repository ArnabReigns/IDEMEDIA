const User = require("../../models/UserModel");

const Search = async (req, res) => {
  try {
    const search_res = [];
    let query = req.body.query;
    const regex = new RegExp(query, "i");
    const users = await User.find({
      username: { $regex: regex },
      isActive: true,
    });

    search_res.push({ users: [...users] });
    res.json({
      search_res,
    });
  } catch (err) {}
};

module.exports = Search;
