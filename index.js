const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config");
const noteRouter = require("./note/NoteRouter");
const app = express();

mongoose.connect(config.mongoAddress, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/api", (req, res) => { res.send("Yaprofi21 API")} );
app.use("/api", noteRouter);

console.log(process.env.MONGODBSTR);

app.listen(80, () => console.log(`Http server running on port 80`));

