/**
 * @fileoverview This file holds the routing methods for the GoHike app API.
 */
const express = require("express"); // instantiate express
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
// Import routes
const authorization = require("./routes/authorization");
const posts = require("./routes/posts");
const trails = require("./routes/trails");
const user = require("./routes/user");
// Socket tools
const http = require("http");
const socketIo = require("socket.io");

const app = express();
app.use(bodyParser.json({ limit: "500mb" }));
app.use(morgan("tiny"));
app.use(cors());

// Set up socket
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"],
  },
});

// Use cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Routes to use for respective paths
app.use("/authorization", authorization);
app.use("/posts", posts);
app.use("/trails", trails);
app.use("/user", user);

// Check server is working
app.get("/", (req, res) => {
  res.status(200).send({ ping: "pong" });
});

// Handle socket connection
io.on("connection", (socket) => {
  console.log("New client connected");
  // Listen for creation of new post
  socket.on("newpost", (postId) => {
    socket.broadcast.emit("update");
  });

  // Listen for comment on a hike
  socket.on("newcomment", () => {
    socket.broadcast.emit("updatecomments")
  })

  // Listen for sending a friend request
  socket.on("sendfriendrequest", (receiver) => {
    socket.broadcast.emit("updatefriendrequests", receiver)
  })

  // Listen for accepting a friend request
  socket.on("acceptedfriend", (acceptor) => {
    socket.broadcast.emit("updatefriendstatus", acceptor)
  }) 

  // Listen for declining a friend request
  socket.on("declinedfriend", (decliner) => {
    socket.broadcast.emit("declinefriendstatus", decliner)
  }) 

  // Handle socket disconnection
  socket.on("disconnect", () => {
    console.log("Disconnecting");
  });
});

module.exports = server;
