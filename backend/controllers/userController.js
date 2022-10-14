import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'


  // Generate JWT
  const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
  }

// @desc    Add User
// @route   POST /api/users
const addUser = asyncHandler(async (req, res)=>{
    try {
        const body = req.body
        const isExistingUser = await User.findOne({'email' : body.email})
        if(isExistingUser) {
             res.status(400).send( {message:'User with same email id exists '})
        }
        else{
          const newUser = new User(body)
          const saveNewUser = await newUser.save()
          res.status(201).json(saveNewUser)
  }
    } catch (error) {
      res.status(400).send({
        message : 'Something went wrong,please try again',
        error : error.message,
    })
    }
})

// @desc    Login User
// @route   POST /api/users/login
const loginUser = asyncHandler(async (req, res)=>{
  try {
      const body = req.body
      const user = await User.findOne({'email' : body.email})
      if(user && (await user.matchPassword(body.password))) {
        res.status(200).json({
          _id: user.id,
          name: user.name,
          email: user.email,
          birthDate: user.birthDate,
          image: user.image,
          token: generateToken(user._id)})
      }
      else{ 
        res.status(401).send( 'Invalid email or password')
}
  } catch (error) {
    res.status(400).send({
      message : 'Something went wrong,please try again',
      error : error.message,
  })
  }
})

// @desc    Get all User
// @route   Get /api/users
const getUsers = asyncHandler(async (req, res) => {
    try {
       const usersList = await User.find()
        res.status(200).send(usersList)
    } catch (error) {
      res.status(400).send({
        message : 'Something went wrong,please try again',
        error : error.message,
      })
    }
  })

// @desc    Update user By Id
// @route   PUT /api/users/:id
const updateUser = asyncHandler(async (req, res) => {
    try {
      const updateUserInfo = await User.findByIdAndUpdate(req.params.id,{$set : req.body},{new : true})
      res.status(200).json(updateUserInfo)
    } catch (error) {
      res.status(400).send({
        message : 'Something went wrong,please try again',
        error : error.message
    })
  
    }
  })

// @desc    Delete user By Id
// @route   DELETE /api/users/:id
const deleteUser = asyncHandler(async (req, res) => {
    try {
      const id = req.params.id
          const userData = await User.findByIdAndDelete(id)
          if(userData){
              res.send('User data deleted successfully')
          }
          else{
              res.status(404).send('Not found')
          }
        
    } catch (error) {
      res.status(400).send({
        message : 'Something went wrong,please try again',
        error : error.message
    })
    }
  })

// @desc    Get user By Id
// @route   GET /api/users/:id
  const getUserById = asyncHandler(async (req, res) => {
    try {
      const id = req.params.id
      const userData = await User.findById(id)
      if(userData){
          res.status(200).send(userData)
      }
      else{
          res.status(404).send('The user you are looking does not exist')
      }
      
    } catch (error) {
      res.status(400).send({
        message : 'Something went wrong,please try again',
        error : error.message})
    }
    
  })



export {
    addUser,
    loginUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
  }