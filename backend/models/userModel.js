import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const {Schema} = mongoose

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    birthDate: {
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            return (
              v && // check that there is a date object
              new Date(v).getFullYear() < new Date().getFullYear() - 18
            );
          },
          message:"User should be above 18 years",
        }
      },
    image: {
        type: String,
        required: true,
        default: '../assets/img/default.jpg'
    },
    password: {
      type: String,
      required: true
  }
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function(next){
  if(!this.isModified('password')){
    next()
  }
  const salt = await bcrypt.genSaltSync(10)
  this.password = await bcrypt.hashSync(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
