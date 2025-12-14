import { ai, z } from './genkit';

const ExecuteNodeInputSchema = z.object({
  prompt: z
    .string()
    .describe('Prompt that should be executed for this node.'),
});

export type ExecuteNodeInput = z.infer<typeof ExecuteNodeInputSchema>;

const ExecuteNodeOutputSchema = z.object({
  result: z
    .string()
    .describe('Text result produced by the node.'),
});

export type ExecuteNodeOutput = z.infer<typeof ExecuteNodeOutputSchema>;

const executeNodePrompt = ai.definePrompt({
  name: 'executeNodePrompt',
  input: { schema: ExecuteNodeInputSchema },
  output: { schema: ExecuteNodeOutputSchema },
  prompt: `
    You are an AI node in a low-code pipeline.
    You receive the task description in the "prompt" field.
    Execute the task and return the final result in the "result" field without any extra wording.

    Prompt:
    {{{prompt}}}
`.trim(),
});

const executeNodeFlow = ai.defineFlow(
  {
    name: 'executeNodeFlow',
    inputSchema: ExecuteNodeInputSchema,
    outputSchema: ExecuteNodeOutputSchema,
  },
  async (input) => {
    const { output } = await executeNodePrompt(input);
    return output;
  },
);

export async function executeNode(
  input: ExecuteNodeInput,
): Promise<ExecuteNodeOutput> {
  return executeNodeFlow(input);
}
