const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);
const users = [];
const io = new Server(server, {
  cors: {
    origin: "https://localhost:3000/",
    methods: ["GET", "POST"],
  },
});
const _USERS = [];
class ConnectedUser {
  constructor(socketId, uuid, pos, rot) {
    this.uuid = uuid;
    this.position = pos;
    this.rotation = rot;
    this.socketId = socketId;
  }
  updatePos(newPos) {
    this.position = newPos;
  }
  updateRot(newRot) {
    this.rotation = newRot;
  }
}
server.listen(3001, () => {});
io.on("connection", (socket) => {
  socket.on("add-user", (uuid) => {
    socket.broadcast.emit("render-new", { uuid: uuid });
    console.log(_USERS);
    _USERS.push(new ConnectedUser(socket.id, uuid));
    for (let i = 0; i < _USERS.length; i++) {
      socket.emit("pre-user", {
        uuid: _USERS[i].uuid,
        position: _USERS[i].position,
        rotation: _USERS[i].rotation,
      });
    }
  });

  socket.on("update-position", ({ uuid, newPos, newRot }) => {
    for (let i = 0; i < _USERS.length; i++) {
      if (_USERS[i].uuid == uuid) {
        _USERS[i].updatePos(newPos);
        _USERS[i].updateRot(newRot);
        socket.broadcast.emit("user-update-position", {
          uuid: _USERS[i].uuid,
          newPos,
          newRot,
        });
      }
    }
  });

  socket.on("stop-walk", (uuid) => {
    for (let i = 0; i < _USERS.length; i++) {
      if (_USERS[i].uuid == uuid) {
        socket.broadcast.emit("stop-animate-walk", {
          uuid: _USERS[i].uuid,
        });
      }
    }
  });

  socket.on("disconnect", () => {
    for (let i = 0; i < _USERS.length; i++) {
      if (_USERS[i].socketId == socket.id) {
        socket.broadcast.emit("disconnect-user", { uuid: _USERS[i].uuid });
        console.log("disconnected");
        _USERS.splice(i, 1);
      }
    }
  });
});
