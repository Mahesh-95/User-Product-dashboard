import express from 'express'
const router = express.Router()
import {
    addUser,
    loginUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../controllers/userController.js'

router.route('/').post(addUser).get(getUsers)
router.route('/login').post(loginUser)
router.route('/:id').put(updateUser).get(getUserById).delete(deleteUser)


export default router