const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please enter user id"]
    },
    name: {
        type: String,
        required: [true, "Please enter name"]
    },
    email: {
        type: String,
        required: [true, "Please enter email"]
    },
    phone: {
        type: String,
        required: [true, "Please enter phone"]
    },
    address: {
        type: String,
        required: [true, "Please enter address"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Contact", contactSchema);