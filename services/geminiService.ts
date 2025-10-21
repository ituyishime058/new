
import { GoogleGenAI, GenerateContentResponse, Modality } from "@google/genai";

// Ensure API_KEY is available in the environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

export const getAiChatResponse = async (conversationId: string, userMessage: string): Promise<string> => {
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userMessage,
            config: {
                systemInstruction: 'You are Nexus AI, a helpful and friendly assistant integrated into the Nexus social platform. Keep your responses concise and conversational.'
            }
        });

        // The `.text` property is the recommended way to get the text response.
        const text = response.text;
        return text;
    } catch (error) {
        console.error("Error getting AI chat response:", error);
        return "Sorry, I'm having trouble connecting right now. Please try again later.";
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
            // The response is a base64 string, so we create a data URL.
            const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
            return imageUrl;
        } else {
            throw new Error("No image was generated.");
        }
    } catch (error) {
        console.error("Error generating image with Imagen:", error);
        throw new Error("Failed to generate image. Please try a different prompt.");
    }
};

export const editImageWithAi = async (base64ImageData: string, mimeType: string, prompt: string): Promise<string> => {
    try {
        const imagePart = {
            inlineData: {
                data: base64ImageData,
                mimeType: mimeType,
            },
        };
        const textPart = {
            text: prompt,
        };

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [imagePart, textPart],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                return base64ImageBytes;
            }
        }
        
        throw new Error("AI did not return an edited image.");

    } catch (error) {
        console.error("Error editing image with AI:", error);
        throw new Error("Failed to edit image. Please try again.");
    }
};
