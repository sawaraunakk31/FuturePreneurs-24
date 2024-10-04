// socket.js
import { io } from "socket.io-client";

// Create a socket instance
const socket = io("http://localhost:3000", {
    transports: ["websocket", "polling"], // Ensure both transports are allowed
    autoConnect: false, // Don't connect automatically
    methods: ["GET", "POST"],
    credentials: true,
});

// Export the socket instance
export { socket };