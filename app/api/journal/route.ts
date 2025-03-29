import { NextRequest, NextResponse } from "next/server";
import { analyzeSentiment } from "@/services/sentiment";

export async function POST(req: NextRequest) {
    try {
        const { content } = await req.json();

        if (!content) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const sentiment = await analyzeSentiment(content);

        return NextResponse.json({ message: "Journal entry created", sentiment }, { status: 201 });
    } catch (error) {
        console.error("Error saving journal:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
