import { Server } from "socket.io";

interface Character {
  id: string;
  position: number[];
  hairColor: string;
  topColor: string;
  bottomColor: string;
}

enum SocketIOEvents {
  CONNECTION = "connection",
  DISCONNECT = "disconnect",
  HELLO = "hello",
  CHARACTERS = "characters",
  MOVE = "move",
}

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

io.listen(3001);

const characters: Character[] = [];

const generateRandomPosition = () => {
  return [Math.random() * 3, 0, Math.random() * 3];
};

const generateRandomHexColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

io.on(SocketIOEvents.CONNECTION, (socket) => {
  console.log("User Connected");

  characters.push({
    id: socket.id,
    position: generateRandomPosition(),
    hairColor: generateRandomHexColor(),
    topColor: generateRandomHexColor(),
    bottomColor: generateRandomHexColor(),
  });

  socket.emit(SocketIOEvents.HELLO);

  io.emit(SocketIOEvents.CHARACTERS, characters);

  socket.on(SocketIOEvents.MOVE, (position) => {
    const character = characters.find(
      (character) => character.id === socket.id
    );

    if (character) {
      character.position = position;
      io.emit(SocketIOEvents.CHARACTERS, characters);
    }
  });

  socket.on(SocketIOEvents.DISCONNECT, () => {
    console.log("User Disconnected");

    characters.splice(
      characters.findIndex((character) => character.id === socket.id),
      1
    );

    io.emit(SocketIOEvents.CHARACTERS, characters);
  });
});
