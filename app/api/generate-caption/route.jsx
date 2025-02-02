import { AssemblyAI } from 'assemblyai';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { audioFileUrl } = await req.json()

        const client = new AssemblyAI({
            apiKey: '6f9d630b7ca64a2d92c2bbc6ade45d92',
        });

        const FILE_URL = audioFileUrl

        // You can also transcribe a local file by passing in a file path
        // const FILE_URL = './path/to/file.mp3';

        // Request parameters 
        const data = {
            audio: FILE_URL
        }


        const transcript = await client.transcripts.transcribe(data);

        console.log(transcript.words);
        return NextResponse.json({ "result": transcript.words })

    } catch (error) {
        return NextResponse.json({ "error": error })
    }

}