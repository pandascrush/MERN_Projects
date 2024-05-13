import userModel from "../model/userModel.js";

// create user data for post
const postData = async (req, res) => {
  const { Name, Email, Contact, City } = req.body;

  try {
    await userModel.create({ Name, Email, Contact, City });
    res.json({ msg: "added" });
  } catch (err) {
    res.json({ msg: "post_error" });
  }
}

// get all user data
const getData = async (req, res) => {
  try {
    const userData = await userModel.find({});
    res.json(userData);
  } catch (err) {
    res.json({ msg: "get_error" });
  }
};

// getting a particular user data
const singleData = async (req, res) => {
  const { id } = req.params;

  try {
    const userData = await userModel.findById(id);
    res.json(userData);
  } catch (err) {
    res.json({ msg: "single_error" });
  }
};

// Delete user Data
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userData = await userModel.findByIdAndDelete(id);
    res.json({ status:true, msg: "deleted", userData });
  } catch (err) {
    res.json({ msg: "delete_error" });
  }
};

// Update User Data
const updateUser = async (req, res) => {
  const { id } = req.params;
  // const {Name,email,Contact,City} = req.body

  // const userData = await userModel.findByIdAndUpdate({_id:id},{Name,email,Contact,City})
  // console.log(userData)
  try {
    const userData = await userModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body }
    );
    res.json({ status:true,msg: "updated", userData });
  } catch (err) {
    res.json({ msg: "update_error" });
  }
}

export { postData, getData, singleData, deleteUser, updateUser };
