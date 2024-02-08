import { useEffect } from "react";

import { useAtom } from "jotai";
import type { Character } from "../types";

import { SocketIOClientEvents, charactersAtom, socket } from "../constants";

export const SocketManager = () => {
  const [, setCharacters] = useAtom(charactersAtom);

  useEffect(() => {
    const onConnect = () => {
      console.log("Connected to Socket");
    };

    const onDisconnect = () => {
      console.log("Disconnected from Socket");
    };

    const onHello = () => {
      console.log("Hello client side");
    };

    const onCharacters = (characters: Character[]) => {
      console.log("characters", characters);
      setCharacters(characters);
    };

    socket.on(SocketIOClientEvents.CONNECT, onConnect);
    socket.on(SocketIOClientEvents.DISCONNECT, onDisconnect);
    socket.on(SocketIOClientEvents.HELLO, onHello);
    socket.on(SocketIOClientEvents.CHARACTERS, onCharacters);

    return () => {
      socket.off(SocketIOClientEvents.CONNECT, onConnect);
      socket.off(SocketIOClientEvents.DISCONNECT, onDisconnect);
      socket.off(SocketIOClientEvents.HELLO, onHello);
      socket.off(SocketIOClientEvents.CHARACTERS, onCharacters);
    };
  }, [setCharacters]);

  return null;
};
