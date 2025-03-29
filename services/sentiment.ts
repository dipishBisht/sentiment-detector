import axios from "axios";

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HF_SENTIMENT_URL = "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english";

export const analyzeSentiment = async (text: string) => {
    try {
        const response = await axios.post(
            HF_SENTIMENT_URL,
            { inputs: text },
            {
                headers: {
                    Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
                },
            }
        );

        // Extract the sentiment with the highest score
        const sentimentData = response.data[0];
        const highestConfidence = sentimentData.reduce((prev: any, curr: any) =>
            curr.score > prev.score ? curr : prev
        );

        return highestConfidence.label.toLowerCase(); // e.g., "positive", "negative"
    } catch (error) {
        console.error("❌ Sentiment analysis failed. Using fallback.");

        // Fallback sentiment logic
        if (text.toLowerCase().includes("happy")) return "positive";
        if (text.toLowerCase().includes("sad")) return "negative";
        return "neutral";
    }
};
