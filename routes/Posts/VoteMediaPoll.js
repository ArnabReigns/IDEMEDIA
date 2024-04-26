const MediaPoll = require("../../models/MediaPoll");
const User = require("../../models/UserModel");
const internalError = require("../../utils/InternalError");

const VotePoll = async (req, res) => {
  const { poll, option, user } = req.body;

  try {
    const voter = await User.findOne({ _id: user });
    if (voter) {
      let media_poll = await MediaPoll.findById(poll);
      if (!media_poll) throw new Error("Invalid Poll ID");
      // Checking whether the user  has already voted or not
      console.log(media_poll.voters[user]);
      if (media_poll.voters[user] != undefined) 
        return internalError(res, "You have already cast your vote.");

      media_poll.options[option].votes++;
      media_poll.voters.set(user, option);
      await media_poll.save();

      res.status(201).json({
        message: "Voted Successfully",
        data: {
          poll,
          option,
          votes: media_poll.options[option].votes,
        },
      });
    }
  } catch (e) {
    console.log(e);
    internalError(res);
  }
};

module.exports = VotePoll;
