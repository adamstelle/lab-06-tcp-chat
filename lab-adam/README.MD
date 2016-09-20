This app launches a basic TCP server that allows multiple CLI clients to connect and interact with one another.

To run the server:
- Fork/clone this repo
- In the project directory, run "npm install"
- Run "node server.js" to launch the server

To connect with the server:
- In new terminal windows, run "telnet localhost <PORT#>" (currently set to 3000)

Available Commands:
- Customize your nickname: "\nick <nickname>"
- Send message to all currently connected users: "\all <msg>"
- Send direct message to specific user: "\dm <usernick> <msg>"

Happy Hacking!
