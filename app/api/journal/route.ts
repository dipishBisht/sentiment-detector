import { NextRequest, NextResponse } from "next/server";
import { analyzeSentiment } from "@/services/sentiment";
import connectToDB from "@/config/connect";
import { JournalModel } from "@/models/journal";
import { Types } from "mongoose";

export async function POST(req: NextRequest) {
    try {
        await connectToDB();
        const { content } = await req.json();

        const userId = new Types.ObjectId();

        if (!content) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const sentiment = await analyzeSentiment(content);

        const newEntry = await JournalModel.create({
            userId,
            content,
            sentiment,
        });

        console.log(newEntry);


        return NextResponse.json({ message: "Journal entry created", entry: newEntry }, { status: 201 });
    } catch (error) {
        console.error("Error saving journal:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
