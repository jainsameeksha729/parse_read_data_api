const mongoose = require("mongoose");
/**
 * clinical schema
 * @private
 */
const clinicalSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
      index: true
    },
    case_id: {
      type: String,
      maxlength: 128,
      trim: true,
      default: ""
    },
    BMI: {
      type: String,
      maxlength: 128,
      trim: true,
      default: ""
    },
    tumor_site: {
      type: String,
      maxlength: 128,
      trim: true,
      default: ""
    },
    
    height_in_cm: {
      type: Number,
      maxlength: 20,
      default: 0
    },
    weight_in_kg: {
      type: Number,
      maxlength: 20,
      default: 0
    }
    
  },
  {
    timestamps: true
  }
);

/**
 * @typedef organization
 */
module.exports = mongoose.model("clinical", clinicalSchema);
