import { connectMongo } from "@/libs/mongodb";
import { Round0 } from "@/models/round0.model";
import { NextResponse } from "next/server";

export async function GET({ req }) {
  // if (req.method !== "GET") {
  //   return NextResponse.json(
  //     { message: "Method not allowed" },
  //     { status: 405 }
  //   );
  // } else {
    try {
      // await connectMongo();

      const qualTeams = await Round0.find();
      if (!qualTeams) {
        return NextResponse.json(
          { message: "Team not found" },
          { status: 400 }
        );
      }

      for (let i = 0; i < qualTeams.length; i++) {
        const easy = [];
        const medium = [];
        const hard = [];

        const easyLength = 10;
        const mediumLength = 8;
        const hardLength = 8;

        const getRandomUniqueNumberEasy = (array) => {
          let randomNumber;
          do {
            randomNumber = Math.floor(Math.random() * 29) + 1;
          } while (array.includes(randomNumber));
          return randomNumber;
        };

        const getRandomUniqueNumberMedium = (array) => {
          let randomNumber;
          do {
            randomNumber = Math.floor(Math.random() * 24) + 1;
          } while (array.includes(randomNumber));
          return randomNumber;
        };

        const getRandomUniqueNumberHard = (array) => {
          let randomNumber;
          do {
            randomNumber = Math.floor(Math.random() * 19) + 1;
          } while (array.includes(randomNumber));
          return randomNumber;
        };

        // Fill easy array with unique random numbers
        for (let i = 0; i < easyLength; i++) {
          easy.push(getRandomUniqueNumberEasy(easy));
        }

        // Fill medium array with unique random numbers
        for (let i = 0; i < mediumLength; i++) {
          medium.push(getRandomUniqueNumberMedium(medium));
        }

        // Fill hard array with unique random numbers
        for (let i = 0; i < hardLength; i++) {
          hard.push(getRandomUniqueNumberHard(hard));
        }

        //randomise easy array
        for (let i = easyLength - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [easy[i], easy[j]] = [easy[j], easy[i]];
        }
        //randomise medium array
        for (let i = mediumLength - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [medium[i], medium[j]] = [medium[j], medium[i]];
        }
        //randomise hard array
        for (let i = hardLength - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [hard[i], hard[j]] = [hard[j], hard[i]];
        }
        qualTeams[i].easyOrder = easy;
        qualTeams[i].mediumOrder = medium;
        qualTeams[i].hardOrder = hard;
        await qualTeams[i].save();
      }

      return NextResponse.json({ message: "Success" }, { status: 200 });
    } catch (e) {
      console.log(e);
      return NextResponse.json(
        {
          message: "Internal server error",
          error: e.toString(),
        },
        { status: 500 }
      );
    }
  }
