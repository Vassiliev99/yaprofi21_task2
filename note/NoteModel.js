const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Note = new Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
    }
);

module.exports = mongoose.model("notes", Note);