const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET = process.env.SECRET

const generateToken = (info) => {
return jwt.sign({
  //information we want to use for encoding
  username: info.username,
  email: info.email
},
//secret
SECRET,
{
  //options
  expiresIn: "5 minutes"
}
)
}

module.exports = {
  createToken: async (req, res) => {
    console.log(req.body)
    let token = generateToken(req.body)
    res.status(200).send(token)
  },

  validateToken: async (req, res) => {
    let token = req.get('Authorization')
    let valid = jwt.verify(token, SECRET)
    if(valid) {
      res.status(200).send("Success")
    } else {
      res.status(400).send("Invalid token...")
    }
    console.log(req.body)
  },
}