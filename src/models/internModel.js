const mongoose = require("mongoose");
let ObjectId = mongoose.Schema.Types.ObjectId;


const internSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please enter name"],
    },
    email: {
      type: String,
      required: [true, "Please enter a email address"],
      trim: true,
      unique:true,
      lowercase:true,
      validate: {
        validator: function (email) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        },
        message: 'Please fill a valid email address',
        isAsync: false
      }
    },
    mobile: {
      type: String,
      unique: true,
      required: [true, "Please enter a email address"],
      trim: true,
      validator: function(mobile){
        return /^([+]\d{2})?\d{10}$/.test(mobile)
      },
      message: 'Please fill a valid mobile number',
      isAsync: false
    },
    collegeId: {
      type: ObjectId,
      ref: "college"
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },  { timestamps: true }
);

module.exports = mongoose.model("Intern", internSchema);