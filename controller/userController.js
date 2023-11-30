const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../Models/userModel');
const CustomError = require('../utils/customError');

const createUser = async (req, res,next) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    
    await user.save();

    res.status(201).json({
        message: 'User registered successfully'
    });

  } catch (error) {
    next(error)
  }
};

const login = async (req, res, next) => {
    try {
      const { username, password } = req.body;

      if(!username || !password){
        return next(new CustomError("username or password missing" , 400))
      }

      const user = await User.findOne({ username }).select("+password");

      if (!user) {
        return next(new CustomError('Invalid username or password', 401));
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return next(new CustomError('Invalid username or password', 401));
      }
  
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
        );

      res.status(200).json({
        user : user.username,
        token
    });

    } catch (error) {
        return next(error);
    }
  }

module.exports = {createUser, login};
