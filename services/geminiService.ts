import { GoogleGenAI, GenerateContentResponse, Modality, Chat } from "@google/genai";

// It's assumed process.env.API_KEY is configured externally
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

// A simple in-memory cache for chat sessions
const chatSessions: Record<string, Chat> = {};

function getChatSession(conversationId: string): Chat {
    if (!chatSessions[conversationId]) {
        chatSessions[conversationId] = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: "You are Nexus AI, a helpful and friendly assistant integrated into the Nexus social platform. Keep your responses conversational and helpful."
            }
        });
    }
    return chatSessions[conversationId];
}

/**
 * Gets a chat response from the Gemini model using a persistent chat session.
 */
export const getAiChatResponse = async (conversationId:string, message: string): Promise<string> => {
    try {
        const chat = getChatSession(conversationId);
        const response: GenerateContentResponse = await chat.sendMessage({ message: message });
        return response.text;
    } catch (error) {
        console.error("Error getting AI chat response:", error);
        return "Sorry, I encountered an error. Please try again.";
    }
};


/**
 * Generates an image using the Imagen model.
 */
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
        } else {
            throw new Error("No image was generated.");
        }
    } catch (error) {
        console.error("Error generating image with Imagen:", error);
        if (error instanceof Error) {
            throw new Error(`Image generation failed: ${error.message}`);
        }
        throw new Error("An unknown error occurred during image generation.");
    }
};


/**
 * Edits an image using the Gemini model with a text prompt.
 */
export const editImageWithAi = async (base64ImageData: string, mimeType: string, prompt: string): Promise<string> => {
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64ImageData,
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: prompt,
                    },
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
        
        throw new Error("AI did not return an edited image.");

    } catch (error) {
        console.error("Error editing image with AI:", error);
        if (error instanceof Error) {
            throw new Error(`Image editing failed: ${error.message}`);
        }
        throw new Error("An unknown error occurred during image editing.");
    }
};
