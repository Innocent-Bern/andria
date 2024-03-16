// resource used --> https://socket.io/get-started/private-messaging-part-1/
import { io } from "socket.io-client";

const URL = "http://localhost:8080"; // backend url 
const socket = io(URL, { autoConnect: false });

// catch-all listener, which is very useful during development:
socket.onAny((event, ...args) => {
    console.log(event, args);
});

// find get user_id --> in local storage
// then call socket.connect()
//

//check user has been authenticated
/**
 * socket.on("connect_error", (err) => {
  if (err.message === "invalid username") {
    this.usernameAlreadySelected = false;
  }
});
*/
export default socket;
