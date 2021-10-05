const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const poemSchema = new Schema({
    title: { type: String, required: true },
    datePosted: { type: String, required: true },
    text: { type: String, required: true },
    additionalInfo: { type: String, required: false},
    orderId: { type: String, required: true}
  });

const Poems = mongoose.model("Poems", poemSchema);

module.exports = Poems;