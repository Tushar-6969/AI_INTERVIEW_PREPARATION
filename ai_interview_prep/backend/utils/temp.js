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
- If code is required, include it as plain text inside the answer (do NOT use markdown backticks).
- Return ONLY a valid JSON array.
- Do NOT include explanations outside JSON.

Format:

[
  {
    "question": "Question here?",
    "answer": "Answer here."
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
