const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique:true,
        lowercase:true,
        required: [true, "Please enter name"],
    },
    fullName: {
        type: String,
        trim: true,
        required: [true, "Please enter fullname"],
    },
    logoLink: {
        type: String,
        trim: true,
        required: [true, "Please enter logolink"],
        validate: {
            validator: function (link) {
              return /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi.test(link)
            },
            message: 'Please give a valid link',
            isAsync: false
          }
    },
    isDeleted: {
        type: Boolean,
        default: false,
      }
}, { timestamps: true });


module.exports = mongoose.model('college', collegeSchema)

