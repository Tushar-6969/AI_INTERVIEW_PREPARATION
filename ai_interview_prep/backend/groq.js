const axios = require("axios");
const { marked } = require("marked");
require("dotenv").config(); // Load .env

// ---------------- CONFIG ----------------
const BASE_URL = "https://api.groq.com/openai/v1";
const API_KEY = process.env.GROQ_API_KEY; // Get key from .env
if (!API_KEY) {
  console.error("GROQ_API_KEY missing in .env");
  process.exit(1);
}

const MODEL_FALLBACKS = [
  process.env.GROQ_MODEL || "openai/gpt-oss-20b",
  "openai/gpt-oss-120b",
  "qwen/qwen3.8-27b",
  "groq/compound",
];

const HEADERS = {
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

// ---------------- HELPERS ----------------
function safeJSON(res) {
  try {
    return res.data;
  } catch (err) {
    return { error: { message: `Invalid JSON: ${err.message}` } };
  }
}

// ---------------- MAIN FUNCTION ----------------
async function askGemini(extractedText = "", userPrompt = "", fileType = "") {
  let prompt = "";

  if (!extractedText.trim()) {
    prompt = `You are a friendly and helpful AI assistant.\nRespond conversationally to the user:\n"${userPrompt}"`;
  } else if (fileType === "pdf") {
    prompt = `You are a professional tutor.\nPDF Content:\n"""${extractedText}"""\nUser Question:\n"${userPrompt}"`;
  } else if (fileType === "image") {
    prompt = `You are a helpful AI assistant.\nExtracted Image Text:\n"""${extractedText}"""\nUser Question:\n"${userPrompt}"`;
  } else {
    prompt = `Context:\n"""${extractedText}"""\nUser Question:\n"${userPrompt}"`;
  }

  // ---------------- Groq API request ----------------
  let lastError = null;

  for (const model of MODEL_FALLBACKS) {
    const payload = {
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1024,
    };

    console.log("Sending request to Groq API with model:", model);
    console.log("Prompt length:", prompt.length);

    try {
      const res = await axios.post(`${BASE_URL}/chat/completions`, payload, {
        headers: HEADERS,
        timeout: 30000,
      });

      const data = safeJSON(res);
      let text = "No response from AI";

      if (data.choices && data.choices.length > 0) {
        text = data.choices[0].message.content;
      }

      return marked.parse(text);
    } catch (error) {
      lastError = error;
      console.error("Groq API error for model:", model);

      if (error.response) {
        console.error("Status Code:", error.response.status);
        console.error("Error Data:", error.response.data);
      } else {
        console.error("Error Message:", error.message);
      }

      if (error.response && [400, 404].includes(error.response.status)) {
        continue;
      }

      throw error;
    }
  }

  console.error("All Groq models failed.", lastError?.response?.data || lastError?.message);
  return "<p style='color:red;'>Failed to fetch response from AI.</p>";
}


module.exports = { askGemini };
