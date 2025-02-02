import { chatSession } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        console.log("API running...");
        const { prompt } = await req.json();
        console.log("Prompt received:", prompt);

        const res = await chatSession.sendMessage(prompt);

        // Extract text response from the AI's response structure
        const textResponse = res?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
        console.log("Raw AI Response:", textResponse);

        // If the response starts with a code block, remove it
        let jsonResponse = textResponse.trim();

        // Check if it starts with a JSON structure and process accordingly
        if (jsonResponse.startsWith('```json')) {
            jsonResponse = jsonResponse.slice(7, -3).trim(); // Remove ```json and closing ```

            // Now parse the response safely
            try {
                jsonResponse = JSON.parse(jsonResponse);
            } catch (parseError) {
                console.error("JSON Parse Error:", parseError);
                jsonResponse = { error: "Invalid JSON format from AI response" };
            }
        }

        console.log("AI Response (Parsed):", jsonResponse);

        return NextResponse.json({ result: jsonResponse }); // ✅ Return as proper JSON
    } catch (error) {
        console.error("Error in API:", error);
        return NextResponse.json(
            { error: error.message || "Something went wrong" },
            { status: 500 }
        );
    }
}
