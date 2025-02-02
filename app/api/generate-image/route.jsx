// import axios from 'axios';
// import cloudinary from 'cloudinary';
// import fs from 'fs';
// import { NextResponse } from 'next/server';
// import util from 'util';
// import base64 from 'base-64';  // To decode base64 image data

// // Configure Cloudinary
// cloudinary.config({
//     cloud_name: "dada1bgxg",
//     api_key: "829186321829178",
//     api_secret: "wK_JIApTPuaTc4JmtOWDR8CdUTo"
// });

// export async function POST(req, res) {
//     const { prompt } = await req.json();

//     try {
//         // Define the Stable Diffusion API endpoint
//         const apiUrl = 'https://a79f2a0baa9084b081.gradio.live/sdapi/v1/txt2img';

//         // Prepare the payload for the Stable Diffusion API
//         const payload = {
//             prompt: prompt,  // Prompt passed from the request body
//             negative_prompt: "blurry, low resolution, noisy",  // Avoid unwanted details
//             width: 1024,  // Larger width for better detail
//             height: 1024, // Larger height for better detail
//             samples: 1,  // Default to 1 image, you can generate more if needed
//             num_inference_steps: 50,  // More steps for higher quality (50-100 is good)
//             cfg_scale: 12,  // High cfg_scale for prompt adherence
//             seed: 12345,  // Optional: Same seed for reproducibility
//             sampler_index: 'Euler a',  // Euler sampler is a good choice for stability
//             eta: 0.2,  // Slight randomness in the process for more creative results
//             width: 512,  // Width (or 1024 for even better detail)
//             height: 512, // Height (or 1024 for better quality)
//             strength: 0.75 // For image clarity and enhancing details
//         };


//         // Send the POST request to the Stable Diffusion API
//         const response = await axios.post(apiUrl, payload, { headers: { 'Content-Type': 'application/json' } });

//         // Check if the API response is successful
//         if (response.status === 200) {
//             const imageData = response.data.images[0];  // Get the first image (Base64-encoded)

//             // Decode the Base64 image data and save it as a file
//             const imageBuffer = Buffer.from(base64.decode(imageData), 'binary');
//             const generateRandomString = (length = 10) =>
//                 Array.from({ length }, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 62))).join('');

//             const filePath = './temp_image_' + generateRandomString() + '.png';
//             const writeFile = util.promisify(fs.writeFile);

//             // Write the image buffer to a temporary file
//             await writeFile(filePath, imageBuffer);
//             console.log('Image content written to file: temp_image.png');

//             // Upload the file to Cloudinary
//             const uploadResponse = await cloudinary.v2.uploader.upload(filePath, {
//                 resource_type: 'auto',  // 'auto' automatically handles different media types
//                 overwrite: true,
//             });

//             // Delete the temporary file from the server after uploading to Cloudinary
//             // fs.unlinkSync(filePath);

//             // Return the Cloudinary URL of the uploaded image
//             return NextResponse.json({
//                 message: 'Image uploaded successfully',
//                 url: uploadResponse.secure_url, // The URL to access the uploaded image
//             });
//         } else {
//             return NextResponse.json({ error: 'Failed to generate image: ' + response.data.error });
//         }

//     } catch (error) {
//         console.error("Error:", error);
//         return NextResponse.json({ "error": error.message });
//     }
// }




import axios from 'axios';
import cloudinary from 'cloudinary';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os'; // Import os module for temp directory

// Configure Cloudinary
cloudinary.config({
    cloud_name: "dada1bgxg",
    api_key: "829186321829178",
    api_secret: "wK_JIApTPuaTc4JmtOWDR8CdUTo"
});

export async function POST(req) {
    const { prompt } = await req.json();

    try {
        const apiUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(prompt)}&per_page=1`;

        // Fetch images from Pexels
        const response = await axios.get(apiUrl, {
            headers: { Authorization: "3alY1YaRoBKB1DZuE4hDmW96yjYv1ws1xnlRyQe9x4QLeuK14sU8p5Bd" }
        });

        if (response.data.photos.length === 0) {
            return NextResponse.json({ error: "No images found for this prompt" });
        }

        const imageUrl = response.data.photos[0].src.large;

        // Download the image from Pexels
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        // Use OS temp directory to ensure the path is writable
        const tempDir = os.tmpdir();
        const filePath = path.join(tempDir, `pexels_image_${Date.now()}.jpg`);

        // Save image temporarily
        await fs.promises.writeFile(filePath, imageResponse.data);

        // Upload to Cloudinary
        const uploadResponse = await cloudinary.v2.uploader.upload(filePath, {
            folder: "pexels_images",
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        });

        // Delete temp file after upload
        await fs.promises.unlink(filePath);

        return NextResponse.json({
            message: "Image uploaded successfully",
            url: uploadResponse.secure_url // Cloudinary image URL
        });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: error.message });
    }
}
