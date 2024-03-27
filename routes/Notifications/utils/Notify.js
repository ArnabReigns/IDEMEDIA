const Notifications = require("../../../models/NotificationModel");

const notify = (
  io,
  { title, desc, user, type, data, ...rest },
  { roomNames, emitName }
) => {
  new Notifications({
    title,
    desc,
    user,
    type,
    data,
    ...rest,
  })
    .save()
    .then((e) => {
      roomNames.forEach((room) => {
        io.to(room).emit(emitName, e);
      });
      console.log("notification saved and send to: " + user);
    })
    .catch((err) => console.log(err));
};

module.exports = notify;
