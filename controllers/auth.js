const User = require("../models/User");
const bcrypt = require("bcryptjs");
exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username: username }).then((user) => {
    if (!user) {
      return res.status(401).json({ message: "Không có người dùng hợp lệ!" });
    }
    return bcrypt.compare(password, user.password).then((doMatch) => {
      if (!doMatch) {
        return res.status(401).json({ message: "Mật khẩu sai!" });
      } else {
        return res.status(200).json({ user: user });
      }
    });
  });
};
exports.postCreateMod = (req, res, next) => {
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;
  return bcrypt
    .hash(password, 12)
    .then((hashedPass) => {
      const newUser = new User({ name, username, password: hashedPass });
      res.status(201).json({ message: "Create new moderator successfully" });
      return newUser.save();
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.postChangePass = async (req, res, next) => {
  const id = req.body.id;
  const newPass = req.body.newPass;
  const oldPass = req.body.oldPass;
  const user = await User.findById(id);
  const oldPassMatch = await bcrypt.compare(oldPass, user.password);
  if (!oldPassMatch) {
    return res.status(401).json({ message: "Mật khẩu cũ không đúng!" });
  }
  const newPassMatch = await bcrypt.compare(newPass, user.password);
  if (newPassMatch) {
    return res
      .status(401)
      .json({ message: "Mật khẩu mới trùng với mật khẩu cũ!" });
  }
  const newPassHashed = await bcrypt.hash(newPass, 12);
  user.password = newPassHashed;
  await user.save();
  return res.status(200).json({ message: "Change password successfully!" });
};
exports.getUsers = async (req, res, next) => {
  const users = await User.find({ role: "Moderator" });
  return res.status(200).json({ users: users });
};
exports.deleteUser = async (req, res, next) => {
  const id = req.query.id;
  await User.deleteOne({ _id: id });
  return res.status(200).json({ message: "Delete successfully!" });
};
exports.getUser = async (req, res, next) => {
  const id = req.query.id;
  const user = await User.findById(id);
  return res.status(200).json({ user: user });
};
exports.editMod = async (req, res, next) => {
  const id = req.body.id;
  const name = req.body.name;
  const username = req.body.username;
  const editedUser = await User.findById(id);
  editedUser.name = name;
  editedUser.username = username;
  await editedUser.save();
  return res.status(200).json({ message: "Edit người dùng thành công!" });
};
