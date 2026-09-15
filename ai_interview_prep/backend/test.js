// this file is only for test purpose (branch temp1)

require("dotenv").config();
const axios = require("axios");

// -------- CONFIG ----------
const API_KEY = process.env.GROQ_API_KEY;

a34b21d1-fbc6-451b-9b9a-6212879cf2d3:c6b46324633c7b834e26d83d7c20ac62




const prompt=`
in this image change cloth from black to red dresss image link="https://res.cloudinary.com/drt0rnrnw/image/upload/v1764014532/Screenshot_2025-11-25-01-13-40-26_1c337646f29875672b5a61192b9010f9_obhbjy.jpg" and ass result give image link  after generating 
`


axios.post(
  "https://api.groq.com/openai/v1/chat/completions",
  {
    model: process.env.GROQ_MODEL || "openai/gpt-oss-20b",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 512,
  },
  {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    timeout: 30000,
  }
)
.then(res => {
  console.log(res.data.choices[0].message.content);
})
.catch(err => {
  console.error(err.response?.data || err.message);
});
