const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const mongoose = require('mongoose')


// define the user shema 
const userSchema = mongoose.Schema({
    username : {
        type: String,
        required: [true, 'Please provide username'],
        minlength : [3, "username should be minimum of 3 characters"],
    },
    email : {
        type: String,
        required: [true, "Please provide the email"],
        minlength: [3, "email should be minimum of 3 characters"],
        unique: true,
        maxlength : [50, "email should not exceed 50 characters"],
        match: [/^[0-9,a-z,A-Z,\-]*@[a-z]*[A-Z]*\.com$/g, "Please provide valid email "]
    },
    password : {
        type: String, 
        required: [true, "Please provide the password"],
        minlength: [3, "Password must be 3 characters long"]
    }
})


//defining hooks 

// anything defined here for userSchema is a schema-level

userSchema.pre('save',  async function(next){ 
	const salt =    await bcrypt.genSalt(10)
	this.password =  await bcrypt.hash(this.password, salt) 
	next()
})

// defining instance methods : instance methods are accessable only by the documents not the models(capital leter)
userSchema.methods.getToken = function() {
	let token = jwt.sign({userId : this._id , username : this.username}, process.env.JWT_SECRET, {expiresIn : '30d'})
	return token 
}







// create the model 
const User = mongoose.model('users', userSchema)

module.exports = User;


