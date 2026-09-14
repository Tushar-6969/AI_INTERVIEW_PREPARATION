require("dotenv").config();
const axios = require("axios");
const { questionAnswerPrompt, conceptExplainPrompt } = require("../utils/prompts");

const API_KEY = process.env.GROQ_API_KEY;
const MODEL_FALLBACKS = [
  process.env.GROQ_MODEL || "openai/gpt-oss-20b",
  "openai/gpt-oss-120b",
  "qwen/qwen3.8-27b",
  "groq/compound",
];

async function callGroq(prompt) {
  let lastError = null;

  for (const model of MODEL_FALLBACKS) {
    try {
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 1024,
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 30000,
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      lastError = error;
      console.error(`Groq model failed: ${model}`);
      console.error(error.response?.data || error.message);

      if (error.response && [400, 404].includes(error.response.status)) {
        continue;
      }

      throw error;
    }
  }

  throw new Error(lastError?.response?.data?.error?.message || "Groq model unavailable");
}

const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "missing required fields" });
    }

    const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);
    const rawText = await callGroq(prompt);
    const cleanedText = rawText.replace(/^```json\s*/, "").replace(/```$/, "").trim();

    let data;

    try {
      data = JSON.parse(cleanedText);
    } catch {
      return res.status(500).json({
        message: "AI returned invalid JSON",
        raw: rawText,
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("generateInterviewQuestions error:", err.message);
    return res.status(500).json({ message: "failed to generate question", error: err.message });
  }
};

const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "missing required fields" });
    }

    const prompt = conceptExplainPrompt(question);
    const rawText = await callGroq(prompt);
    const cleanedText = rawText.replace(/^```json\s*/, "").replace(/```$/, "").trim();

    let data;

    try {
      data = JSON.parse(cleanedText);
    } catch {
      return res.status(500).json({
        message: "AI returned invalid JSON",
        raw: rawText,
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("generateConceptExplanation error:", err.message);
    return res.status(500).json({ message: "failed to generate explanation", error: err.message });
  }
};

module.exports = { generateInterviewQuestions, generateConceptExplanation };
