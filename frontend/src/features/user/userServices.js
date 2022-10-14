import axios from 'axios'

const API_URL = '/api/users/'

// Add user
const addUser = async (userData) => {
  const response = await axios.post(API_URL, userData)

  return response.data
}

// User Login
const userLogin = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data){
      localStorage.setItem('user', JSON.stringify(response.data))
  }
  
    return response.data
  }

//Get user
const getUser = async () => {
  
    const response = await axios.get(API_URL)
  
    return response.data
  }

//Get User Details 
const getUserById = async (id) => {
  
    const response = await axios.get(API_URL+id)
  
    return response.data
  }

//Edit User
const editUserById = async (userData) => {
  
    const response = await axios.put(API_URL+userData._id, userData)
  
    return response.data
  }

//Delete User
const deleteUserById = async (id) => {
  
    const response = await axios.delete(API_URL+id)
  
    return response.data
  }

//User Logout  
const logout = () => {
    localStorage.removeItem('user')
}

const userService = {
    addUser,
    userLogin,
    getUser,
    getUserById,
    editUserById,
    deleteUserById,
    logout
  }
  
  export default userService