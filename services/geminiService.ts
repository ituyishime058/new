
import { GoogleGenAI, GenerateContentResponse, Modality } from "@google/genai";

// Always use new GoogleGenAI with named apiKey parameter
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAiChatResponse = async (conversationId: string, message: string): Promise<string> => {
    try {
        const model = 'gemini-2.5-flash'; // Basic text task
        
        // This is a simplified way to handle history. In a real app, you'd use the Chat API.
        // For this function, we'll just use generateContent for simplicity.
        const response = await ai.models.generateContent({
            model,
            contents: `User: ${message}`, // simplified for this function
        });
        
        return response.text;
    } catch (error) {
        console.error("Error getting AI chat response:", error);
        return "Sorry, I'm having trouble connecting to my brain right now. Please try again later.";
    }
};

export const generateImageWithImagen = async (prompt: string): Promise<string> => {
    try {
        const model = 'imagen-4.0-generate-001'; // High-quality image generation
        
        const response = await ai.models.generateImages({
            model,
            prompt,
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
        console.error("Error generating image:", error);
        throw new Error("Failed to generate image. Please try a different prompt.");
    }
};

export const editImageWithAi = async (base64ImageData: string, mimeType: string, prompt: string): Promise<string> => {
    try {
        const model = 'gemini-2.5-flash-image'; // General image editing

        const imagePart = {
            inlineData: {
                data: base64ImageData,
                mimeType: mimeType,
            },
        };
        const textPart = { text: prompt };

        const response: GenerateContentResponse = await ai.models.generateContent({
            model,
            contents: { parts: [imagePart, textPart] },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return part.inlineData.data; // Return just the base64 string
            }
        }

        throw new Error("No edited image was returned.");

    } catch (error) {
        console.error("Error editing image:", error);
        throw new Error("Failed to edit image. The model may not have been able to fulfill the request.");
    }
};
