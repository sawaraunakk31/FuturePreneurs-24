import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";
import { connectMongo } from "../libs/mongodb.js";
import jwt from "jsonwebtoken";

//? MongoDB Schema
import { Users } from "../models/user.model.js";
import { TeamModel } from "../models/team.model.js";
import { BondBidding } from "../models/bondBidding.model.js";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOST ? process.env.HOST : "localhost";
const port = process.env.PORT ? process.env.PORT : 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

let timeLeft = 120; // initial time in seconds (15 minutes)
let timerInterval = null;

app.prepare().then(async () => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  await connectMongo(); //? Only connect once for a server
  
    io.on("connect", (socket) => {
      // Listen for the "authenticate" event where the token is sent
      socket.on("authenticate", async ({ token }) => {
        if (!token) {
          console.log("No token provided");
          socket.emit("auth_error", "No token provided");
          socket.disconnect();
          return;
        }

        try {
          const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
          const userId = decoded._id;

          // Fetch user details from MongoDB
          const user = await Users.findById(userId);
          if (!user) {
            console.log("User not found");
            socket.emit("auth_error", "User not found");
            socket.disconnect();
            return;
          }

          const team = await TeamModel.findOne({teamLeaderId: userId});
          if (!team) {
            console.log("User is not a team leader");
            socket.emit("auth_error", "User is not a team leader");
            socket.disconnect();
            return;
          }

          const bondsBidFor = team.bondsBidFor;
          const wallet = team.wallet;

          console.log("User details:", user);
          socket.emit("userDetails", { team });
                
          // Fetch bond bidding data
          const bondBidding = await BondBidding.findById('66f84084d39aba9ca3f14ba5');
          if (!bondBidding) {
            console.log("No bidding data found");
            return;
          }
          // Send current time left and highest bids to the newly connected user
          socket.emit("syncTimer", { timeLeft });
          io.emit("highestBids", {highestBids: bondBidding.highestBids, allocatedBids: bondBidding.allocatedBids, bondsBidFor: bondsBidFor});
        
          socket.on("newBid", async({newBid, index})=>{
            const currentTime = Date.now();
            const cooldownTime = user.hold ? user.hold + 3 * 60 * 1000 : 0; // 3 minutes cooldown

            if (currentTime < cooldownTime) {
              const remainingTime = Math.ceil((cooldownTime - currentTime) / 1000);
              socket.emit("bid_error", { message: `You must wait ${remainingTime} seconds before placing another bid.` });
              return;
            }

            if (bondsBidFor.includes(index)) {
              console.log("User has already bid for this bond");
              socket.emit("bid_error", { message: "This bond has already been bid for." });
              return;
            } else {
              bondsBidFor.push(index);
            }

            if (newBid>bondBidding.highestBids[index] && bondBidding.allocatedBids[index]==false && newBid<(0.9*wallet)) {
              bondBidding.highestBids[index] = newBid;
              await bondBidding.save();
              team.bondsBidFor = bondsBidFor;
              await team.save();
              io.emit("highestBid", {highestBid: newBid, index});
            } else {
              console.log("Bid is less than highest bid");
              socket.emit("bid_error", { message: "Your bid is lower than the current highest bid." });
            }
          })
        } catch (error) {
            console.error("Token verification failed:", error);
            socket.emit("auth_error", "Token verification failed");
            socket.disconnect();
          }
      });
    });

    io.on("disconnect", () => {
        console.log("A client disconnected");
    });

    // Start the timer on the server if not already started
    if (!timerInterval) {
      timerInterval = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft -= 1;
          io.emit("syncTimer", { timeLeft }); // Broadcast the remaining time to all clients
        } else {
          clearInterval(timerInterval);
          timerInterval = null;
        }
      }, 1000);
    }

    httpServer
      .once("error", (err) => {
        console.error(err);
        process.exit(1);
      })
      .listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
      });
});