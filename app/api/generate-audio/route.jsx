import textToSpeech from "@google-cloud/text-to-speech";
import { NextResponse } from "next/server";
import fs from 'fs';
import util from 'util';
import cloudinary from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: "dada1bgxg",
    api_key: "829186321829178",
    api_secret: "wK_JIApTPuaTc4JmtOWDR8CdUTo"
});

const client = new textToSpeech.TextToSpeechClient({
    apiKey: process.env.GOOGLE_API_KEY
});

export async function POST(req) {
    const { text, id } = await req.json();

    // const request = {
    //     input: { text: text },
    //     voice: {
    //         languageCode: 'en-IN',  // Indian English
    //         name: 'en-IN-Wavenet-D', // Specific Indian English voice
    //         ssmlGender: 'FEMALE'
    //     },
    //     audioConfig: {
    //         audioEncoding: 'MP3',
    //         speakingRate: 0.95 // Slow down speech (default is 1.0)
    //     }
    // };

    const request = {
        input: { text: text },  // You can pass Hindi text here
        voice: {
            languageCode: 'hi-IN',  // Hindi (India)
            name: 'hi-IN-Wavenet-C', // Hindi male voice (or use 'hi-IN-Wavenet-B' for female)
            ssmlGender: 'MALE'  // Change to 'FEMALE' for a female voice
        },
        audioConfig: {
            audioEncoding: 'MP3',
            speakingRate: 0.95
        }
    };


    try {
        // Perform the text-to-speech request
        const [response] = await client.synthesizeSpeech(request);

        // Convert the binary data into a file and save it temporarily
        const writeFile = util.promisify(fs.writeFile);
        const filePath = './output1.mp3';
        await writeFile(filePath, response.audioContent, 'binary');
        console.log('Audio content written to file: output1.mp3');

        // Upload the file to Cloudinary
        const uploadResponse = await cloudinary.v2.uploader.upload(filePath, {
            resource_type: 'auto',
            public_id: `audio_files/${id}`, // Use id as part of the file name
            overwrite: true
        });

        // Delete the file from the server after uploading to Cloudinary
        fs.unlinkSync(filePath);

        // Return success response with Cloudinary URL
        return NextResponse.json({
            message: "Audio uploaded successfully",
            url: uploadResponse.secure_url // The URL to access the uploaded file
        });

    } catch (error) {
        console.error("Error generating or uploading audio:", error);
        return NextResponse.json({
            message: "Error processing the request",
            error: error.message
        });
    }
}
