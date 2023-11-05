const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add the name of contact"],
    },
    email: {
      type: String,
      required: [true, "Please add the Email of contact"],
    },
    phone: {
      type: String,
      required: [true, "Please add the Phone Number of contact"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contacts", contactSchema);
