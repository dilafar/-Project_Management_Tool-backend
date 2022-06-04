const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.json({limit:"700mb", extended: true}));
app.use(bodyparser.urlencoded({limit:"400mb",extended: true}));

const url = process.env.MONGO_URL;

const userroutes = require("./routes/user");
const panelDataroutes = require("./routes/panelData");
const requestroutes = require("./routes/request");
const responseroutes = require("./routes/response");
const grouprouter = require("./routes/studentGroup");
const msSubmission_route = require("./routes/msSubmission_route");

app.use("/user", userroutes);
app.use("/panel", panelDataroutes);
app.use("/request", requestroutes);
app.use("/response", responseroutes);
app.use("/group", grouprouter);
app.use("/msSubmission", msSubmission_route);

mongoose.connect(url ,  {
    useNewUrlParser: true,
},()=>{
    console.log("Mongodb Started ......");
}
);



app.listen(PORT , ()=>{
            console.log(`Server connected to : ${PORT}`);
});