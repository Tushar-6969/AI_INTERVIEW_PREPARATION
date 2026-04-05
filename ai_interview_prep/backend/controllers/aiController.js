
require("dotenv").config();
const axios = require("axios");
const { questionAnswerPrompt, conceptExplainPrompt }=require("../utils/prompts")


// const  {GoogleGenai}=require("@google/genai")

// const ai=new GoogleGenai({api:process.env.GEMINI_API_KEY})



// -------- CONFIG --------
const API_KEY = process.env.GROQ_API_KEY;








// geeratte interview question and answers usig gemininapi 
//post api/ai/generate questions 
// private

const generateInterviewQuestions=async(req,res)=>{

try{
const {role,experience,topicsToFocus,numberOfQuestions}=req.body;

if(!role || !experience || !topicsToFocus || !numberOfQuestions){
    return res.status(400).json({message:"missisng require dfiled s"})
}


const prompt=questionAnswerPrompt(role,experience,topicsToFocus,numberOfQuestions);


// geimini setup
// const response=await ai.models.generateContent({
//     model:"gemini-2.0-flash-lite",
//     contents:prompt,
// })


//groq setup

const response=await axios.post(
  "https://api.groq.com/openai/v1/chat/completions",
  {
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
  },
  {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
  }
)



//gemini
// let rawtext=response.text


const rawtext = response.data.choices[0].message.content;
console.log(rawtext)

const cleanedText=rawtext.replace(/^```json\s*/, "").replace(/```$/, "").trim()

 let data;

    try {
      data = JSON.parse(cleanedText);
    console.log(data)
    } catch {
      return res.status(500).json({
        message: "AI returned invalid JSON",
        raw: rawtext,
      });
    }

    res.status(200).json(data);



}
catch(err){
res.status(500).json({message:"failed to genrate question",error:err.message})
}


}








// generate explains a inetrview questions 

//post api/ai/generate-explanations
// private


const generateConceptExplanation=async(req,res)=>{
    try{
const {question}=req.body;
if(!question){
    return  res.status(400).json({message:"missisng require dfiled s"})
}

const prompt=conceptExplainPrompt(question);


const response=await axios.post(
  "https://api.groq.com/openai/v1/chat/completions",
  {
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
  },
  {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
  }
)



const rawtext = response.data.choices[0].message.content;
console.log(rawtext)

const cleanedText=rawtext.replace(/^```json\s*/, "").replace(/```$/, "").trim()

 let data;

    try {
      data = JSON.parse(cleanedText);
    } catch {
      return res.status(500).json({
        message: "AI returned invalid JSON",
        raw: rawtext,
      });
    }

    res.status(200).json(data);






}
    catch(err){

res.status(500).json({message:"failed to genrate question",error:err.message})
    

}
}





module.exports={generateInterviewQuestions,generateConceptExplanation}



























































































