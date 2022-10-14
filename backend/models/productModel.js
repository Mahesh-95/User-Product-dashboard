import mongoose from 'mongoose'

const {Schema} = mongoose

const productSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
    },
    price: {
        type: Number,
        required: true,
      },
    category: {
        type: String,
        required: true
    },
    product_img: {
      type: String,
      required: true
  }
  },
  {
    timestamps: true,
  }
)


const Product = mongoose.model('Product', productSchema)

export default Product
