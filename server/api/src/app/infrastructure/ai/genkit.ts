import { genkit, z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

const GEMINI_API_KEY = 'YOUR_API_KEY';

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: GEMINI_API_KEY
    }),
  ],
  model: 'googleai/gemini-2.5-flash',
});

export { z };
