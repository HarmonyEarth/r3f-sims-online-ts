import { atom } from "jotai";
import type { Character } from "./types";
import { io } from "socket.io-client";

export const charactersAtom = atom<Character[]>([]);

export const socket = io("http://localhost:3001/");

export enum SocketIOClientEvents {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  HELLO = "hello",
  CHARACTERS = "characters",
  MOVE = "move",
}

export const MOVEMENT_SPEED = 0.032;
