import LoginModel from "../model/Login.model.js"; 
import bcrypt from "bcrypt";

const login = async (req, res) => { 
  try {
    const { userName, Password } = req.body;
    if (!userName || !Password) { 
      return res.status(400).json({ message: 'Username and password are required', success: false });
    }
    const user = await LoginModel.findOne({ userName: userName }); 
    if (!user) {
      return res.status(400).json({ message: "User not exists", success: false });
    }
    const passwordMatch = await bcrypt.compare(Password, user.Password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid password", success: false });
    }
    return res.status(200).json({ message: "Login successful", success: true, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error in login", success: false });
  }
}

const createAdmin = async (req, res) => {
  try {
    const { f_no, userName, Password } = req.body;
    const existingUser = await LoginModel.findOne({ userName: userName });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(Password, 10);
    const newUser = await LoginModel.create({
      f_no,
      userName,
      Password: hashedPassword
    });
    return res.status(201).json({ message: "Account created successfully", success: true, user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error in createAdmin", success: false });
  }
}

export {
  login,
  createAdmin
};
