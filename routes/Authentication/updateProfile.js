const User = require("../../models/UserModel");

const updateProfile = async (req, res) => {
  const { id, ...rest } = req.body;

  if (!id) return res.status(400).json({ msg: "Missing user ID" });

  try {
    let userExist = await User.findByIdAndUpdate(
      id,
      {
        ...rest,
      },
      {
        new: true,
      }
    );

    return res.json({ success: true, msg: "user updated", user: userExist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: true, msg: "Some internal error occurred" });
  }
};

module.exports = updateProfile;
