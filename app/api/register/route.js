import { connectMongo } from "@/libs/mongodb";
import { Users } from "@/models/user.model";
import { NextResponse } from "next/server";


export async function POST(req){
    try{
        await connectMongo();
        const {name,email}=await req.json();
        const userExists=await Users.findOne({email:email})
        if(!userExists){
        const newUser = new Users({ name, email });
        
        await newUser.save();
       
        console.log(name)
        return NextResponse.json({ message: "User registered", status: 200 });
        }else{
            return NextResponse.json({ message: "User has already registered", status: 200 });
        }
        

    }catch(error) {
        console.log("An error occurred:", error);
        return NextResponse.json({ message: "Error occurred while registering user", status: 500 });
    }
    
}