
import { GoogleGenAI, Modality, Chat } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const chatSessions: Map<string, Chat> = new Map();

function getChat(sessionId: string): Chat {
  if (!chatSessions.has(sessionId)) {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: "You are Nexus AI, a friendly and helpful social media assistant. You are integrated into a social media platform called Nexus. Keep your responses concise, friendly, and helpful. Use emojis where appropriate. You can help users draft posts, brainstorm ideas, or answer questions.",
      },
    });
    chatSessions.set(sessionId, chat);
  }
  return chatSessions.get(sessionId)!;
}

export const generatePostContent = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Generate a short, engaging social media post based on this prompt: "${prompt}".`,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating post content with Gemini API:", error);
    return "Sorry, I couldn't generate content right now. Please try again later.";
  }
};

export const editImageWithAi = async (base64ImageData: string, mimeType: string, prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    { inlineData: { data: base64ImageData, mimeType: mimeType } },
                    { text: prompt },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });
        
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return part.inlineData.data;
            }
        }
        throw new Error("No image data in response");

    } catch (error) {
        console.error("Error editing image with Gemini API:", error);
        throw new Error("Sorry, I couldn't edit the image right now.");
    }
};


export const getAiChatResponse = async (sessionId: string, message: string): Promise<string> => {
    try {
        const chat = getChat(sessionId);
        const response = await chat.sendMessage({ message });
        return response.text;
    } catch (error) {
        console.error("Error getting AI chat response:", error);
        return "I'm having a little trouble connecting right now. Please try again in a moment.";
    }
};

export const generateImageWithImagen = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
              aspectRatio: '1:1',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        }
        throw new Error("No image was generated.");
    } catch (error) {
        console.error("Error generating image with Imagen:", error);
        throw new Error("Sorry, the image could not be generated at this time.");
    }
};
