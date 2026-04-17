const Admin = require("../models/admin.js");

const loginAdmin = async (req, res) => {
  try {
    const { userID, userPASS } = req.body;

    if (!userID || !userPASS) {
      return res.status(400).json({ error: "no username or password" });
    }
    const admin = await Admin.findOne({
      userID: userID,
    });
    if (!admin) {
      return res.status(404).json({ error: "Incorrect user or password" });
    }
    if (admin.userPASS !== userPASS) {
      return res.status(401).json({ error: "Incorrect user or password" });
    }
    return res.status(200).json({
      message: "Succesful login",
      data: admin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { loginAdmin };
