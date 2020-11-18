const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
},
    {
        timestamps: true //this creates 'updated at' and 'created at' field
    }
)

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {  // .pre - we want this to happen 'pre save'. 

  if(!this.isModified('password')) {  // isModified is a mongoose method that checks to see a field has been modified. Once the password has been encrypted we don't want to re-incrypt
      next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model("User", userSchema)

module.exports = User
