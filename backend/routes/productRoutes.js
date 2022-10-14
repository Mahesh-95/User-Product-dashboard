import express from 'express'
import { protect } from '../middleware/authMiddlerware.js'
import {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js'

const router = express.Router()

router.route('/').post(protect, addProduct).get(protect, getProducts)
router.route('/:id').put(updateProduct).get(protect, getProductById).delete(protect, deleteProduct)


export default router