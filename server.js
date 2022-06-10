const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
require("dotenv").config();
const socketio = require('socket.io');
const http = require('http');
const {addUserchat , removeUserchat , getUserchat ,getUsersInRoomchat} = require('./controller/chat');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.json({limit:"700mb", extended: true}));
app.use(bodyparser.urlencoded({limit:"400mb",extended: true}));

const url = process.env.MONGO_URL;

const userroutes = require("./routes/user");
const adminSubmissionRoutes=require("./routes/adminsubmission");
const studentSubmissionRoutes=require("./routes/studentsubmission")
app.use("/user",userroutes);
app.use("/adminsubmission",adminSubmissionRoutes);
app.use("/studentsubmission",studentSubmissionRoutes)
const panelDataroutes = require("./routes/panelData");
const requestroutes = require("./routes/request");
const responseroutes = require("./routes/response");
const grouprouter = require("./routes/studentGroup");
const msSubmission_route = require("./routes/msSubmission_route");
const chatroute = require('./routes/chat');

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

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket)=>{
    

    socket.on('join', ({name , room}, callback)=>{
        const {error , user} = addUserchat({id: socket.id , name , room});

        if(error) return callback(error); 


        socket.join(user.room);
         socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
         socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
       
        /*const error = true;
        if(error){
            callback({error: 'error'});
        }*/
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
       callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUserchat(socket.id);
    
        io.to(user.room).emit('message', { user: user.name, text: message });
    
        callback();
      });

    socket.on('disconnect',()=>{
        const user = removeUser(socket.id);

        if(user) {
          io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
          io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
    })
});

app.use(chatroute);

server.listen(PORT , ()=>{
            console.log(`Server connected to : ${PORT}`);
});