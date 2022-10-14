import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userServices'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    userList: [],
    userData: user? user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  }

//Add User
export const addUser = createAsyncThunk(
    '/',
    async (user, thunkAPI) => {
      try {
        return await userService.addUser(user)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.error) ||
          error.response.data.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )


//User Login
export const userLogin = createAsyncThunk(
    '/login',
    async (user, thunkAPI) => {
      try {
        return await userService.userLogin(user)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.error) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )


//Get User List
export const getUserList = createAsyncThunk(
    'getAll',
    async (_, thunkAPI) => {
      try {
        return await userService.getUser()
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.error) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )

// Get User Detials
export const userDetails = createAsyncThunk(
  'getData',
  async (id, thunkAPI) => {
    try {
      return await userService.getUserById(id)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.error) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Edit User Detials
export const updateUserData = createAsyncThunk(
  'update',
  async (user, thunkAPI) => {
    try {
      return await userService.editUserById(user)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.error) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete User
export const deleteUser = createAsyncThunk(
  'delete',
  async (id, thunkAPI) => {
    try {
      return await userService.deleteUserById(id)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.error) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//User logout
export const logout = createAsyncThunk('auth/logout', async () => {
  await userService.logout()
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(addUser.pending, (state) => {
            state.isLoading = true
          })
          .addCase(addUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
          })
          .addCase(addUser.rejected, (state, action) => {
            state.isLoading = false
            state.message = action.payload
            state.isError = true
          })
          .addCase(userLogin.pending, (state) => {
            state.isLoading = true
          })
          .addCase(userLogin.fulfilled, (state, action) => {
            state.isLoading = false
            state.userData = action.payload
            state.isSuccess = true
          })
          .addCase(userLogin.rejected, (state, action) => {
            state.isLoading = false
            state.message = action.payload
            state.isError = true
          })
          .addCase(getUserList.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getUserList.fulfilled, (state, action) => {
            state.isLoading = false
            state.userList = action.payload
          })
          .addCase(getUserList.rejected, (state, action) => {
            state.isLoading = false
            state.message = action.payload
            state.isError = true
          })
          .addCase(userDetails.pending, (state) => {
            state.isLoading = true
          })
          .addCase(userDetails.fulfilled, (state, action) => {
            state.isLoading = false
            state.userData = action.payload
          })
          .addCase(userDetails.rejected, (state, action) => {
            state.isLoading = false
            state.message = action.payload
            state.isError = true
          })
          .addCase(updateUserData.pending, (state) => {
            state.isLoading = true
          })
          .addCase(updateUserData.fulfilled, (state, action) => {
            state.isLoading = false
            state.employeeData = action.payload
            state.isSuccess = true
          })
          .addCase(updateUserData.rejected, (state, action) => {
            state.isLoading = false
            state.message = action.payload
            state.isError = true
          })
          .addCase(deleteUser.pending, (state) => {
            state.isLoading = true
          })
          .addCase(deleteUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.employees = state.employees.filter(
              (employee) => employee._id !== action.payload.id
            )
            state.isSuccess = true
          })
          .addCase(deleteUser.rejected, (state, action) => {
            state.isLoading = false
            state.message = action.payload
            state.isError = true
          })
          .addCase(logout.fulfilled, (state)=>{
            state.userData = null
        })
    }

})

export const { reset } = userSlice.actions
export default userSlice.reducer