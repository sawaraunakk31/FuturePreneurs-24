import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";
import { NextResponse } from "next/server.js";
import { connectMongo } from "../libs/mongodb.js";

// MongoDB Schema
import { TeamModel } from "../models/team.model.js";
import { BondBidding } from "../models/bondBidding.model.js";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOST ? process.env.HOST : "localhost";
const port = process.env.PORT ? process.env.PORT : 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

let timeLeft = 900; // initial time in seconds (15 minutes)
let timerInterval = null;

app.prepare().then(async () => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  await connectMongo();

  io.on("connect", async (socket) => {
    console.log("A user connected");

    const bondBidding = await BondBidding.findById('66f84084d39aba9ca3f14ba5');
    if (!bondBidding) {
      return NextResponse.json({ message: "Bond Bidding Not found" });
    }

    // Send current time left and highest bids to the newly connected user
    socket.emit("syncTimer", { timeLeft });
    socket.emit("highestBids", { highestBids: bondBidding.highestBids });

    socket.on("newBid", async ({ newBid, index }) => {
      console.log(`${index} - ${newBid}`);
      if (newBid > bondBidding.highestBids[index]) {
        bondBidding.highestBids[index] = newBid;
        await bondBidding.save();
        io.emit("highestBid", { highestBid: newBid, index });
      } else {
        console.log("Bid is less than highest bid");
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
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

  httpServer.once("error", (err) => {
    console.error(err);
    process.exit(1);
  }).listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});