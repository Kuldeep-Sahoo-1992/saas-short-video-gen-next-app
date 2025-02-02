const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Write a script to generate 30 seconds video on topic : Interesting historical story along with Al image\nprompt in Realistic format scene and give me result in JSON format with imagePrompt and\nContentText as field",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "scenes": [\n    {\n      "scene_number": 1,\n      "duration": 5,\n      "imagePrompt": "A bustling ancient Roman marketplace during the day. Merchants are displaying their wares, people in togas are haggling and going about their daily lives.  Sunlight filters through the awnings.",\n      "contentText": "Did you know that ancient Roman marketplaces weren\'t just places to buy food? They were the heart of Roman society, bustling with gossip, political debates, and even the occasional public execution."\n    },\n    {\n      "scene_number": 2,\n       "duration": 5,\n      "imagePrompt": "A close up shot of a Roman coin being held by a hand, with the face of a Roman Emperor clearly visible. The coin has some wear and age on it",\n      "contentText": "These coins, often stamped with the emperor\'s image, weren\'t just money; they were a way for the ruler to project his power and influence throughout the vast Roman Empire."\n    },\n    {\n      "scene_number": 3,\n      "duration": 5,\n      "imagePrompt": "A panoramic view of the Great Library of Alexandria, filled with scrolls and scholars working diligently.  The library has towering columns and is bathed in soft light.",\n       "contentText": "The Great Library of Alexandria was a treasure trove of knowledge. Sadly, much of its wisdom was lost to time when it was burned down, making it a tragic loss to human history."\n    },\n    {\n      "scene_number": 4,\n       "duration": 5,\n      "imagePrompt": "A detailed, close up of a  scroll, showing a hand  writing on it with a quill pen.  The ink is black and the paper is parchment like.",\n      "contentText": "Imagine, the knowledge of entire civilizations written on these fragile scrolls, painstakingly copied by hand. What secrets did they hold?"\n    },\n      {\n      "scene_number": 5,\n       "duration": 5,\n      "imagePrompt": "An old, worn map of the world with sailing ships on it, focusing on the sea routes used during the age of exploration.",\n      "contentText": "The age of exploration led to unprecedented discoveries, but also changed the world forever. These journeys changed the face of global politics, trade, and culture."\n    },\n     {\n      "scene_number": 6,\n      "duration": 5,\n      "imagePrompt": "A historical photograph of a printing press with people working on it in a dim lit room , showing it printing papers with text on them.",\n      "contentText": "The invention of the printing press revolutionized the spread of information, allowing ideas and knowledge to spread rapidly and changing society forever. History is filled with fascinating stories just like these. What will we uncover next?"\n    }\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});
