import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {
   const users = await User.find({});
   await res.status(200).json(users);
};

export const registerUser = asyncHandler(async (req, res) => {
   const { name, email, password, image } = req.body;
   try {
      const userExists = await User.findOne({ email });

      if (userExists) {
         res.status(400);
         throw new Error("User already exists");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      //create user

      const user = await User.create({
         name,
         email,
         password: hashedPassword,
      });
      if (user) {
         const token = jwt.sign(
            {
               email: user.email,
               userId: user._id,
            },
            process.env.SECRET_KEY,
            {
               expiresIn: "30d",
            }
         );
         res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token,
         });
      } else {
         res.status(400);
         throw new Error("Invalid user data");
      }
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

export const loginUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   try {
      const user = await User.findOne({ email });

      if (user && bcrypt.compare(password, user.password)) {
         const token = jwt.sign(
            {
               email: user.email,
               userId: user._id,
            },
            process.env.SECRET_KEY,
            {
               expiresIn: "30d",
            }
         );
         res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token,
         });
      } else {
         res.status(401);
         throw new Error("Invalid email or password");
      }
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

export const updateUser = asyncHandler(async (req, res) => {
   const { name, email, image } = req.body;

   try {
      const user = await User.findById(req.user._id);

      if (user) {
         user.name = name || user.name;
         user.email = email || user.email;
         user.image = image || user.image;

         const updatedUser = await user.save();

         res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
         });
      }
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});
