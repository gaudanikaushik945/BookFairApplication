const db = require("../model/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { where, Model } = require("sequelize");
const { checkout } = require("../routes/bookRoutes");
require('dotenv').config();
const nodeMailer = require("nodemailer")
const randomString = require("randomstring");
const passwordReset = require("../model/passwordReset");
const config = require("../config/config1");

const resetPasswordMail = async (name, email, token) => {
    try {


        const transpoter = nodeMailer.createTransport({
            host: process.env.DB_HOST,
            port: 587,
            auth: {
                user: config.emailUser,
                password: config.emailPassword
            },
            secure: false,
            allowNull: true
        })
        const mailOption = {
            from: config.emailUser,
            to: email,
            subject: "For Reset Password",
            html: '<p> Hii ' + name + ', Please click the link <a href= "http://localhost:8000/buyerRouter/forgetPassword?token=' + token + '">and reset your pasword </p> '
        }
        console.log(">>>>>>> mailOption >>>>>>>>>", mailOption);

        transpoter.sendMail(mailOption, function (error, infor) {
            if (error) {
                console.log("------ error ------", error)

            }
            else {
                console.log(" Mail has been sent:- ", infor.response);
            }
        })

    } catch (error) {
        console.log("=== error ===", error);
        return res.status(400).json({
            data: false,
            message: "user not register  enter your correct details"
        })
    }
} 



exports.registerBuyer = async (req, res) => {
    try {
        const buyerEmail = await db.buyers.findOne({ where: { email: req.body.email } })
        console.log("------------buyerEmail--------------", buyerEmail)

        if (buyerEmail) {
            return res.status(400).json({
                data: false,
                message: "User with this email already available"
            });
        }
        const securePassword = await bcrypt.hash(req.body.password, 10)

        const buyerData = {
            name: req.body.name,
            email: req.body.email,
            password: securePassword
        }
        const createBuyer = await db.buyers.create(buyerData)

        return res.status(200).json({
            data: createBuyer,
            message: "buyer register successFully "
        })

    } catch (error) {
        console.log("error++++++++++++++++++++", error);
        return res.status(404).json({
            data: false,
            message: "user not register  enter your correct details"
        })
    }
}





exports.loginBuyer = async (req, res) => {
    try {

        const buyerData = await db.buyers.findOne({ where: { email: req.body.email } })
        console.log("------------buyerData--------------", buyerData)

        if (!buyerData) {
            return res.status(400).json({
                data: false,
                message: "email is not correct"
            });
        }
        const buyerPasswordMatch = await bcrypt.compare(req.body.password, buyerData.password)
        console.log("+++++++ buyerPasswordMatch +++++++++++++++", buyerPasswordMatch);
        if (!buyerPasswordMatch) {
            return res.status(400).json({
                data: false,
                message: "password is wrong"
            });
        }
        const privetKey = process.env.SECRECT_KEY

        const token = jwt.sign({ id: buyerData.id, name: buyerData.name, email: buyerData.email }, privetKey, { expiresIn: 60 * 120 })

        return res.status(200).json({
            data: token,
            message: "buyer login successFully"
        })
    } catch (error) {
        console.log("==========error===========", error)
        return res.status(404).json({
            data: false,
            message: "user not login please try again"
        })
    }
}



exports.forgetPasswordBuyer = async (req, res) => {
    try {
        const email = req.body.email
        console.log("+++++++ email +++++++", email)
        const userData = await db.buyers.findOne({ where: { email: email } })
        if (!userData){
            return res.status(400).json({
                success: false,
                message: "Email does not exists"
            })
        }

        const random = randomString.generate()
        console.log(">>>>>>>> random >>>>>>>>", random)
        const message = '<p> Hii '+userData.name+', Please click <a href = "https://localhost:8000/buyerRouter/forgetPassword?token= '+random+'">  </a></p>'

        const passwordReset = await db.resetPassword.create({
                 buyer_id: userData.id,
                 token: random
        })
        await passwordReset.save()
        resetPasswordMail(userData.email, "Reset Password", message)

        // if (userData) {
        //     const random = randomString.generate()
        //     console.log(">>>>>>>> random >>>>>>>>", random)
        //     const data = await db.buyers.update({ token: random }, { where: { email: email } })
        //     console.log("...... data .......", data)
        //     await resetPasswordMail(userData.name, userData.email, random)
        //     console.log("+++++++++ resetPasswordMail +++++++++++++",await resetPasswordMail())

            return res.status(200).json({
                success: true,
                message: "Please check your inbox of mail and rest your password"
            })
        
    } catch (error) {
        console.log("-------- error -----------", error);
        return res.status(404).json({
            data: false,
            message: "user password not foget"
        })
    }
}



exports.resetPassword = async (req, res) => {
    try {
        const getBuyer = await db.buyers.findOne({ where: { email: req.body.email } })
        // console.log("====== getBuyer ======", getBuyer.id);

        if (getBuyer) {
            
            const securePassword = await bcrypt.hash(req.body.password, 5)
            console.log("******* securePassword *********", securePassword)

            const updateBuyer = await db.buyers.update(
                { password: securePassword }, 
                { where: {  email: getBuyer.email} }
            );
            console.log("------ updateBuyer -------", updateBuyer)

            if (updateBuyer[0] === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Failed to update password"
                });
            }

            return res.status(200).json({
                success: true,
                message: "User Password has been reset"
            })
        }
    } catch (error) {
        console.log("---- error ------", error);
        return res.status()
    }
}







exports.getOrderByIdBuyer = async (req, res) => {
    try {
        const getToken = tokenChek
        console.log("getToken++++++++++++++++++", getToken);
        const data = await db.buyers.findOne({ where: { id: req.query.id } })

        if (data.buyer_id !== getToken.id) {
            return res.status(403).json({
                data: false,
                message: "Unauthorized access"
            });
        }
        const data1 = await db.orders.findOne({
            where: { id: req.query.id },
            include: [{
                model: db.books
            }, {
                model: db.shops
            }, {
                model: db.buyers
            }]
        })

        console.log("+++++++++ data1 +++++++++++++", data1)


        return res.status(200).json({
            data: data1,
            message: "order data get successfullly"
        })
    } catch (error) {
        console.log("++++++++ error ++++++++++", error);
        return res.status(404).json({
            data: false,
            message: "book is not available seller"
        })
    }
}