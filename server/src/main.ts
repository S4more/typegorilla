import express, {Application} from 'express';
import { createServer, Server } from 'http';
import sio  from 'socket.io';

const server:Server = createServer(function(req, res){ 
	
});


























server.listen(8080);


const PORT = "3000";
const IP = "localhost"

const socket = new WebSocket(`ws://${IP}:${PORT}`);

socket.onopen = () => {
	socket.send("test")
};

socket.onmessage = (data) => {
  console.log(data);
};