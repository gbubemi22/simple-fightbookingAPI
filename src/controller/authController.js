import UserService from "../service/userService.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import CustomError from "../errors/index.js";
import { validatePasswordString } from "../utils/password.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

const AuthController = {
  createUser: async (req, res) => {
    const { name, email, password } = req.body;

    validatePasswordString(password);

    const checkUserEmail = await UserService.findUserByEmail(email);

    if (checkUserEmail) {
      throw new CustomError.ConflictError(`User ${email} already exists`);
    }

    // Hash the password and await its result
    const hashedPassword = await hashPassword(password);

    const newUser = await UserService.addUser(name, email, hashedPassword);
    console.log(newUser);
    return res.status(StatusCodes.CREATED).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
    });
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new CustomError.BadRequestError(
        "Please provide email and password"
      );
    }

    const user = await UserService.findUserByEmail(email);

    if (!user) {
      throw new CustomError.UnauthenticatedError("Invalid Credentials");
    }

    const isPasswordCorrect = await comparePassword(password, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(StatusCodes.OK).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token: token,
    });
  },
};

export default AuthController;
