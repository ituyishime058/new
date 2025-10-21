import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";
import { Message } from '../types';

// It's assumed that process.env.API_KEY is available in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

/**
 * Gets a chat response from the Gemini model.
 * @param chatId A unique identifier for the chat session (currently unused but good for future state management).
 * @param message The user's message.
 * @returns The AI's text response.
 */
export async function getAiChatResponse(chatId: string, message: string): Promise<string> {
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: message,
        });
        return response.text;
    } catch (error) {
        console.error("Error getting AI chat response:", error);
        return "Sorry, I encountered an error. Please try again.";
    }
}

/**
 * Generates an image using the Imagen model.
 * @param prompt The text prompt describing the image.
 * @returns A base64-encoded data URL for the generated image.
 */
export async function generateImageWithImagen(prompt: string): Promise<string> {
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
        const base64ImageBytes = response.generatedImages[0].image.imageBytes;
        return `data:image/jpeg;base64,${base64ImageBytes}`;
    } catch (error) {
        console.error("Error generating image:", error);
        throw new Error("Failed to generate image. The model may have safety restrictions.");
    }
}

/**
 * Edits an image based on a text prompt.
 * @param base64ImageData The base64-encoded string of the source image.
 * @param mimeType The MIME type of the source image.
 * @param prompt The text prompt describing the edit.
 * @returns A base64-encoded string of the edited image.
 */
export async function editImageWithAi(base64ImageData: string, mimeType: string, prompt: string): Promise<string> {
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
        throw new Error("No image was returned from the AI edit.");
    } catch (error) {
        console.error("Error editing image with AI:", error);
        throw new Error("Failed to edit image. Please try a different prompt.");
    }
}

/**
 * Summarizes a conversation history.
 * @param messages An array of Message objects.
 * @returns A text summary of the conversation.
 */
export async function summarizeConversation(messages: Message[]): Promise<string> {
    try {
        const conversationHistory = messages
            .map(msg => `${msg.sender.name}: ${msg.text}`)
            .join('\n');
        
        const prompt = `Please provide a concise summary of the following conversation:\n\n---\n${conversationHistory}\n---`;

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error summarizing conversation:", error);
        return "Could not summarize the conversation.";
    }
}
