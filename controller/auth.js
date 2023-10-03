const User = require('../models/users');
const {StatusCodes} = require('http-status-codes')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const register = async (req, res) => {
		
	try{
		let user = await User.create({ ...req.body})
		let token = user.getToken()
		res.status(StatusCodes.CREATED).json({
			'user' : user.name,
			'token' : token 
		})
	}
	catch(error) {
		res.status(StatusCodes.BAD_REQUEST).json({
			'message': 'Please check your entered values',
			'errror ' : error
		})

	}	
}
const login = async (req, res) => {
    const {email , password} = req.body
	if(!email || !password) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			'msg' : 'Please give email and password'
		})
	}

	let user = await User.findOne({email : email})

	//hashing the password
	let is_auth = await bcrypt.compare(password, user.password)
	if(is_auth){
		//generating token
		let token =  user.getToken()

		return res.json({'token': token })
	} else{
		return res.json({'error' : 'password is incorrect'})
	}
}

module.exports = {
    register, 
    login 
}

 