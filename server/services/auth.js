const createHttpError = require("http-errors")
const User = require("../models/user.model");

module.exports = {
    createUser :  (body) => {
        return new Promise((resolve, reject) => {
            User.create({
                firstName: body.firstName,
                lastName: body.lastName,
                phoneNumber: body.phoneNumber,
                email: body.email,
                password: body.password,
                profile_picture : "",
              }).then(() => resolve()).catch(err => {
                console.log(err)
                reject(createHttpError.InternalServerError())
              })
        })
    }
}