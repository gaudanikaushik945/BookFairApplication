const jwt = require("jsonwebtoken")
require('dotenv').config();





exports.verifyToken = async(req,res,next) => {
    try{
        const authHeader = req.header("Authorization")
        console.log("=========authHeader========",authHeader)
        if (!authHeader) {
            return res.status(401).json({
                data: false,
                message: "Unauthorized request"
            });
        }
        const token = authHeader.split(' ')[1];
        console.log("-----token----==================== ", token);

        const privetKey = "Kaushik"

       const jwtToken = jwt.verify(token, privetKey)
       console.log("-----jwtToken------",jwtToken)

          if (!jwtToken) {
            return res.status(401).json({
                message:'Unauthorized request1'
            })
          }
          tokenChek = jwtToken
          next()
        
    } catch (error) {
        console.log("-----error------",error)
       return res.status(401).json({
            data: false,
            message: "invaild token"
        })
    }
}
