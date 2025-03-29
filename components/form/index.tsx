"use client";

import { useState } from "react";
import axios from "axios";

export default function JournalForm() {
    const [content, setContent] = useState("");
    const [sentiment, setSentiment] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("/api/journal", { content });
            setSentiment(response.data.sentiment);
        } catch (error) {
            console.error("Error submitting journal:", error);
        }

        setLoading(false);
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-3">Write a Journal Entry</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    className="w-full border p-2 rounded"
                    rows={5}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your thoughts here..."
                ></textarea>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
                    disabled={loading}
                >
                    {loading ? "Analyzing..." : "Submit"}
                </button>
            </form>
            {sentiment && (
                <p className="mt-3">Detected Sentiment: <strong>{sentiment}</strong></p>
            )}
        </div>
    );
};