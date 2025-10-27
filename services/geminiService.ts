
import { GoogleGenAI } from "@google/genai";
import { Expense } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function getSpendingInsights(expenses: Expense[]): Promise<string> {
  const formattedExpenses = expenses
    .map(e => `- ${e.date}: ${e.name} (${e.category}) - $${e.amount.toFixed(2)}`)
    .join('\n');

  const prompt = `
    As an expert financial advisor, analyze the following list of recent expenses. 
    Provide actionable insights and tips for saving money. 
    Your analysis should be brief, friendly, and encouraging.

    Here are the expenses:
    ${formattedExpenses}

    Based on this data, please:
    1. Identify the top 2-3 spending categories.
    2. Point out any potential areas for savings.
    3. Offer one or two simple, actionable tips to help manage spending better.
    
    Format your response in a clear, easy-to-read manner. Use bullet points for lists. Do not use markdown for headers (e.g., ###).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with the AI service.");
  }
}
