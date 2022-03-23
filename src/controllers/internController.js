const InternModel = require("../models/internModel")
const CollegeModel = require("../models/collegeModel")
const ObjectId = require('mongoose').Types.ObjectId

const isValid = function (value) {
    if (typeof value == "undefined" || null) return false
    if (typeof value == "string" && value.trim().length === 0) return false
    return true
}

const createIntern = async function (req, res) {
    try {
        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, msg: "No data to create intern" })
        }
        const { name, mobile, email, collegeName, collegeId } = req.body
        if (!isValid(name)) {
            return res.status(400).send({ status: false, msg: ` Name is required ` })
        }
        if (!isValid(email)) {
            return res.status(400).send({ status: false, msg: ` email is required ` })
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({ status: false, msg: ` 'Please give a valid email' ` })
        }
        let lowerCaseEmail = email.toLowerCase()
        console.log(typeof(lowerCaseEmail))
        let duplicateEmail = await InternModel.find({ email:email })
        console.log(duplicateEmail)
        if (duplicateEmail.length != 0) {
            return res.status(400).send({ status: false, msg: "Email is already present" })
        }
        if (!isValid(mobile)) {
            return res.status(400).send({ status: false, msg: ` mobile is required ` })
        }
        if (!(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(mobile))) {
            return res.status(400).send({ status: false, msg: ` 'Please give a valid mobile number without space' ` })
        }
        let countryCode = mobile.substring(3)
        let with0 = mobile.substring(1)
        let duplicateMobile = await InternModel.find({ mobile:{ $in:[mobile,countryCode,with0 ]}})
        if (duplicateMobile.length != 0) {
            return res.status(400).send({ status: false, msg: "Mobile is already present" })
        }
        if (!isValid(collegeName)) {
            return res.status(400).send({ status: false, msg: ` collegeName is required ` })
        }
        if (!(/^\S*$/.test(collegeName))) {
            return res.status(400).send({ status: false, msg: ` 'Please give a valid college name' ` })
        }
        let validCollege = await CollegeModel.findOne({ name: collegeName })
        if (!validCollege) {
            return res.status(404).send({ status: false, msg: "College data not found" });
        }
        if (Object.keys(req.body).includes(collegeId)) {
            return res.status(404).send({ status: false, msg: "CollegeId not required" });
        }
        if (req.body.isDeleted == true) {
            return res.status(400).send({ status: false, msg: "Intern cannot be deleted while creating" })
        }
        let result = {}
        result.name = name
        result.email = email
        result.mobile = mobile
        result.collegeName = collegeName
        result.collegeId = validCollege._id
        let savedData = await InternModel.create(result)
        return res.status(201).send({ status: true, data: savedData })

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}


module.exports.createIntern = createIntern






// const createIntern = async function (req, res) {
//     try {
//         if (Object.keys(req.body).length == 0) {
//             return res.status(400).send({ status: false, msg: "No data to create intern" })
//         }
//         const { name, mobile, email, collegeId } = req.body
//         if (!isValid(name)) {
//             return res.status(400).send({ status: false, msg: ` Name is required ` })
//         }
//         if (!isValid(email)) {
//             return res.status(400).send({ status: false, msg: ` email is required ` })
//         }
//         if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
//             return res.status(400).send({ status: false, msg: ` 'Please give a valid email' ` })
//         }
//         let duplicateEmail = await InternModel.find({ email: email })
//         if (duplicateEmail.length != 0) {
//             return res.status(400).send({ status: false, msg: "Email is already present" })
//         }
//         if (!isValid(mobile)) {
//             return res.status(400).send({ status: false, msg: ` mobile is required ` })
//         }
//         if (!(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(mobile))) {
//             return res.status(400).send({ status: false, msg: ` 'Please give a valid mobile number without space' ` })
//         }
//         let countryCode = mobile.substring(3)
//         let with0 = mobile.substring(1)
//         let duplicateMobile = await InternModel.find({ mobile: { $in: [mobile, countryCode, with0] } })
//         if (duplicateMobile.length != 0) {
//             return res.status(400).send({ status: false, msg: "Mobile is already present" })
//         }
//         if (!isValid(collegeId)) {
//             return res.status(400).send({ status: false, msg: ` collegeId is required ` })
//         }
//         if (!ObjectId.isValid(collegeId)) {
//             return res.status(404).send({ status: false, msg: "College Id invalid" });
//         }
//         let validCollege = await CollegeModel.findOne({ _id: collegeId })
//         if (!validCollege) {
//             return res.status(404).send({ status: false, msg: "College data not found" });
//         }
//         if (req.body.isDeleted == true) {
//             return res.status(400).send({ status: false, msg: "Intern cannot be deleted while creating" })
//         }
//         let savedData = await InternModel.create(req.body)
//         return res.status(201).send({ status: true, data: savedData })

//     } catch (error) {
//         return res.status(500).send({ status: false, msg: error.message })
//     }
// }