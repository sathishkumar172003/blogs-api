const jwt = require('jsonwebtoken')



const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')) {
        return res.json({'msg' : 'Please provide the token'})
    }

    let token = authHeader.split(' ')[1]

    try {
        let payload = jwt.verify(token , process.env.JWT_SECRET)
        req.user = {
            userId : payload.userId,
            username : payload.username
        }
        next()
    }
    catch(error) {
        return res.json({ 'msg' : 'invalid token'})
    }

   
}

module.exports = auth;
