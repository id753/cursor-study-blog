import { GoogleGenAI } from '@google/genai'

const geminiApiKey = (process.env.GEMINI_API_KEY || '').trim()
const hasValidApiKey =
  geminiApiKey.length > 0 &&
  !geminiApiKey.toLowerCase().startsWith('your_gemini_api_key')

const ai = hasValidApiKey ? new GoogleGenAI({ apiKey: geminiApiKey }) : null

async function main(prompt) {
  if (!ai) {
    throw new Error('GEMINI_API_KEY is not configured')
  }

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: prompt
  })

  return response.text || ''
}

export default main