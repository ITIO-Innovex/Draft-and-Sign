import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { isEmailValid } from '@draftnsign/validators';
import {verifyJWT} from '@draftnsign/auth-lib'
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: 'Email required' });
  if (!password) return res.status(400).json({ message: 'Password required' });
  if (!isEmailValid(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  let user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      status: 401,
      message: "User is not exists with Us! Please check your Email Id",
      data: null
    })
  }
  if (user?.status === false) {
    return res.status(401).json({
      status: 401,
      message: "Your Account has been suspended , please contact to the Admin",
      data: null
    })
  }
  if (!await user.isPasswordCorrect(password)) {
    return res.status(401).json({
      status: 401,
      message: "Invalid Credentials!!!",
      data: null
    })
  }
  const isPasswdCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswdCorrect) {
    return res.status(401).json({
      status: 401,
      message: "Invalid Credentials!!!",
      data: null
    })
  }
  const expireIn = process.env.ACCESS_TOKEN_EXPIRY || '12h';
  const generateToken = await generateAccessTokenUser(user,expireIn);
  const options = {
        httpOnly: true,
        expiresIn: expireIn,
      }
  return res.cookie('accessToken', generateToken, options).status(200).json({
        status: 201,
        message: "User is logged In Successfully",
        user_id: user._id,
        token: generateToken,
        type: 'user'
      });

};

export const register = async (req, res) => {
  const { fullname, email, phone, password } = req.body;
  if (!fullname || !email || !phone || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  if (!isEmailValid(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
  try {
    const user = await User.create({ fullname, email, phone, password });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    if (error.code === 11000) {
      console.error('Email or phone already exists');
      return res.status(400).json({ message: 'Email or phone already exists' });
    }
    console.error('Server error',error);
    return res.status(500).json({ message: 'Server error', error });
  }
}
// This function will generate the Access token
async function generateAccessTokenUser(user,expireIn) {
  const dataSend = {
    id: user._id,
    email: user.email,
    fullname: user.fullname,
    type: 'user'
  }

  try {
    return jwt.sign({
      expiresIn: expireIn,
      exp: Math.floor(Date.now() / 1000) + (43200),
      data: dataSend
    }, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    console.log("Error while generating Access Token", error);
  }
}