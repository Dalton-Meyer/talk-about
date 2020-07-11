import { take, call, fork, put, takeLatest, takeLeading } from "redux-saga/effects";
import io from "socket.io-client";
import { inbound } from "./socketInbound";
import { outbound } from "./socketOutbound";

// connect establishes the socket connection with the server
function connect() {
  // create our socket
  const socket = io("http://localhost:5000/");

  // return a promise that automatically resolves once the socket
  // connection is established
  return new Promise((resolve) => {
    socket.on("connect", () => {
			resolve(socket);
    });
  });
}

function disconnect(socket) {
	socket.emit("disconnect");
}

//
export function* openSocket() {
  // begin upon receiving the OPEN_SOCKET dispatch
  yield take("OPEN_SOCKET");
	console.log("opening socket");
  // get our socket from connect
  const socket = yield call(connect);

  // pass our socket to our inbound and outbound sagas
  yield fork(inbound, socket);
	yield fork(outbound, socket);
	
	// get members for current room
	yield put({type: "GET_MEMBERS"});
	// get messages for current room
	yield put({type: "GET_MESSAGES"});
	// pass our disconnect saga
	yield takeLeading("CLOSE_SOCKET", disconnect, socket);
}
