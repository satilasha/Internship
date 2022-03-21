const AuthorModel = require("../models/authorModel")
const BlogModel = require("../models/blogModel")

const isValid = function (value) {
    if (typeof value === "undefined" || null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    return true
}
const isValidTitle = function (title) {
    return ["Mr", "Mrs", "Miss"].indexOf(title) !== -1
}
const createAuthor = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length == 0)
            return res.status(400).send({ status: false, msg: "No data to create author" })

        let authorKeys = ["title", "fname", "lname", "email", "password"]
        for (let i = 0; i < authorKeys.length; i++) {
            let keyPresent = Object.keys(data).includes(authorKeys[i])
            if (!keyPresent) {
                return res.status(400).send({ status: false, msg: ` ${authorKeys[i]} is required` })
            }
        }

        for (let i = 0; i < Object.keys(data).length; i++) {
            if (!isValid(data[i])) {
                return res.status(400).send({ status: false, msg: ` ${authorKeys[i]} is not valid ` })
            }
        }

        if (!isValidTitle(data.title)) {
            return res.status(400).send({ status: false, msg: "title should be Mr, Mrs or Miss" })
        }

        let duplicateEmail = await AuthorModel.findOne({ email: data.email })
        if (duplicateEmail)
            return res.status(400).send({ status: false, msg: "email is already present" })

        let savedData = await AuthorModel.create(data)
        return res.status(201).send({ status: true, msg: savedData })

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports.createAuthor = createAuthor