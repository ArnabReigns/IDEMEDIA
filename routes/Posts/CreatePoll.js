const MediaPoll = require("../../models/MediaPoll");
const User = require("../../models/UserModel");
const internalError = require("../../utils/InternalError");

const CreatePoll = async (req, res) => {
  const { question, user, options } = req.body;

  try {
    const owner = await User.findOne({ _id: user });
    if (owner) {
      const poll = await new MediaPoll({
        question,
        options,
      }).save();
      return res
        .status(201)
        .json({ message: "Poll Created Successsfully", id: poll._id });
    }
  } catch (e) {
    console.log(e);
    internalError(res);
  }
};

module.exports = CreatePoll;
