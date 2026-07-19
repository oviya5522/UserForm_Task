const pool = require("../db");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users(name,password) VALUES($1,$2) RETURNING *",
      [name, hashedPassword]
    );

    res.status(201).json({
      message: "User Created Successfully",
      user: result.rows[0],
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getUsers = async (req, res) => {
  try {

    const result = await pool.query(
      "SELECT * FROM users"
    );

    res.status(200).json(result.rows);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const result = await pool.query(
      "UPDATE users SET name=$1 WHERE id=$2 RETURNING id, name",
      [name, id]
    );

    res.status(200).json({
      message: "User Updated Successfully",
      user: result.rows[0],
    });

  } catch (error) {
  console.log("Update Error:", error);
  res.status(500).json({
    message: error.message,
  });
}
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM users WHERE id=$1",
      [id]
    );

    res.status(200).json({
      message: "User Deleted Successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};