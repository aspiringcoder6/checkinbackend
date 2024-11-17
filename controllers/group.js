const Group = require("../models/Group");
exports.createGroup = async (req, res, next) => {
  try {
    const groupData = req.body.groupData;
    const newGroup = new Group({ ...groupData });
    await newGroup.save();
    return res.status(200).json({ message: "Tạo nhóm thành công" });
  } catch (err) {
    console.log(err);
  }
};
exports.getGroups = async (req, res, next) => {
  try {
    const groups = await Group.find();
    return res.status(200).json({ groups: groups });
  } catch (err) {
    console.log(err);
  }
};
exports.getGroup = async (req, res, next) => {
  const id = req.query.id;
  try {
    const group = await Group.findById(id);
    return res.status(200).json({ group: group });
  } catch (err) {
    console.log(err);
  }
};
exports.editGroup = async (req, res, next) => {
  const groupData = req.body.groupData;
  const id = req.body.id;
  try {
    const editedGroup = await Group.findById(id);
    Object.assign(editedGroup, { ...groupData, updatedAt: Date.now() });
    await editedGroup.save();
    return res.status(200).json({ message: "Edit nhóm thành công!" });
  } catch (err) {
    console.log(err);
  }
};
exports.deleteGroup = async (req, res, next) => {
  const id = req.query.id;
  try {
    await Group.deleteOne({ _id: id });
    return res.status(200).json({ message: "Xóa nhóm thành công!" });
  } catch (err) {
    console.log(err);
  }
};
