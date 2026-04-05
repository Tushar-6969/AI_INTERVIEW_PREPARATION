const questionAnswerPrompt = (
  role,
  experience,
  topicsToFocus,
  numberOfQuestions
) => `
You are an AI that generates interview Q&A.

Task:
- Role: ${role}
- Candidate Experience: ${experience} years
- Focus Topics: ${topicsToFocus}
- Write ${numberOfQuestions} interview questions.
- For each question, generate a detailed but beginner-friendly answer.
- EVERY answer MUST include:
  1. A clear explanation
  2. A real beginner-friendly code example only  if the topic is technology related like c++,node,sql,java etc
- include  codes examples in every answer only  if the topic is technology related like c++,node,sql,java etc.

- Format the answer using clean markdown (paragraphs, bullet points, headings if useful).
- The code example MUST be included using MARKDOWN CODE BLOCKS with triple backticks.
- ALWAYS specify the language in the code block when possible (example: \`\`\`js, \`\`\`python, \`\`\`java, \`\`\`cpp).
- Return ONLY a valid JSON array.
- Do NOT include explanations outside JSON.
- Do NOT skip code examples.
- Escape all newlines properly inside JSON strings using \\n.
- Escape double quotes properly inside JSON strings.

Format:

[
  {
    "question": "Question here?",
    "answer": "Explanation here.\\n\\n### Example Code\\n\`\`\`js\\nconst x = 10;\\nconsole.log(x);\\n\`\`\`"
  }
]
`;


const conceptExplainPrompt = (question) => `
You are an AI that explains interview concepts clearly.

Task:
- Explain this interview question in depth for a beginner.
- Question: ${JSON.stringify(question)}
- After explanation, generate a short clear title.
- If code is needed, include it as plain text (no markdown).
- Return ONLY a valid JSON object.
- Do NOT include text outside JSON.

Format:

{
  "title": "Short title here",
  "explanation": "Explanation here."
}
`;

module.exports = { questionAnswerPrompt, conceptExplainPrompt };
