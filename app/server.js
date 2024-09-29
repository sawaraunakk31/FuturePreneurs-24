import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";
import { NextResponse } from "next/server.js";
import { connectMongo } from "../libs/mongodb.js";

//? MongoDB Schema
import { TeamModel } from "../models/team.model.js";
import { BondBidding } from "../models/bondBidding.model.js";


const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOST ? process.env.HOST : "localhost";
const port = process.env.PORT ? process.env.PORT : 3000;

//! when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(async() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  await connectMongo(); //? Only connect once for a server
  
  io.on("connect",async (socket)=>{
    // todo: add authentication and find team by userId & token

    const bondBidding = await BondBidding.findById('66f84084d39aba9ca3f14ba5');
    if (!bondBidding) {
        return NextResponse.json({ message: "Bond Bidding Not found" });
    }

    io.emit("highestBids", {highestBids: bondBidding.highestBids});

    socket.on("newBid", async({newBid, index})=>{
      console.log(`${index} - ${newBid}`)
      if (newBid>bondBidding.highestBids[index]) {
        bondBidding.highestBids[index] = newBid;
        await bondBidding.save();
        io.emit("highestBid", {highestBid: newBid, index});
      } else {
        console.log("Bid is less than highest bid");
      }
    })
  })

  io.on("disconnect", (socket)=>{
    console.log('a client is disconnected');
  })

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});