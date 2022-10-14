import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productServices'

const initialState = {
    productList: [],
    productData: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  }

//Add Product
export const addProduct = createAsyncThunk(
    'product/',
    async (product, thunkAPI) => {
      try {
       
        const token = thunkAPI.getState().user.userData.token
        return await productService.addProduct(product, token)
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



//Get Product List
export const getProductList = createAsyncThunk(
    'product/getAll',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().user.userData.token
        return await productService.getProduct(token)
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

// Get Product Detials
export const productDetails = createAsyncThunk(
  'product/getData',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.userData.token
      return await productService.getProductById(id,token)
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

// Edit Product Detials
export const updateProductData = createAsyncThunk(
  'product/update',
  async (product, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.userData.token
      return await productService.editProductById(product, token)
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

// Delete Product
export const deleteProduct = createAsyncThunk(
  'product/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.userData.token
      return await productService.deleteProductById(id, token)
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

export const productSlice = createSlice({
    name: 'product',
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
          .addCase(addProduct.pending, (state) => {
            state.isLoading = true
          })
          .addCase(addProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.productData = action.payload
            state.isSuccess = true
            state.isError = false
          })
          .addCase(addProduct.rejected, (state, action) => {
            state.isLoading = false
            state.message = action.payload
            state.isError = true
          })
          .addCase(getProductList.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getProductList.fulfilled, (state, action) => {
            state.isLoading = false
            state.productList = action.payload
            state.isError = false
          })
          .addCase(getProductList.rejected, (state, action) => {
            state.isLoading = false
            state.message = action.payload
            state.isError = true
          })
          .addCase(productDetails.pending, (state) => {
            state.isLoading = true
          })
          .addCase(productDetails.fulfilled, (state, action) => {
            state.isLoading = false
            state.productData = action.payload
            state.isError = false
          })
          .addCase(productDetails.rejected, (state, action) => {
            state.isLoading = false
            state.message = action.payload
            state.isError = true
          })
          .addCase(updateProductData.pending, (state) => {
            state.isLoading = true
          })
          .addCase(updateProductData.fulfilled, (state, action) => {
            state.isLoading = false
            state.employeeData = action.payload
            state.isSuccess = true
            state.isError = false
          })
          .addCase(updateProductData.rejected, (state, action) => {
            state.isLoading = false
            state.message = action.payload
            state.isError = true
          })
          .addCase(deleteProduct.pending, (state) => {
            state.isLoading = true
          })
          .addCase(deleteProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.employees = state.employees.filter(
              (employee) => employee._id !== action.payload.id
            )
            state.isSuccess = true
            state.isError = false
          })
          .addCase(deleteProduct.rejected, (state, action) => {
            state.isLoading = false
            state.message = action.payload
            state.isError = true
          })
    }

})

export const { reset } = productSlice.actions
export default productSlice.reducer