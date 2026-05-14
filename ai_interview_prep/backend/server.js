// make sure .env file exist
require("dotenv").config()
const express=require("express")
const cors=require("cors")
const path=require("path")
const connect_db=require("./config/db.js")
const {protect}=require("./middlewares/authMiddleware.js")
const app=express()
const authRoutes=require("./routes/authRoutes.js")
const sessionRoutes=require("./routes/sessionRoutes.js")
const questionRoutes=require("./routes/questionRoutes.js")
const {generateInterviewQuestions,generateConceptExplanation}=require("./controllers/aiController.js")

// middleware to handle cors 

app.use(cors({
    origin: [
  "http://localhost:5173",
  "https://ai-interview-preparation-frontend.onrender.com",
],
    methods:["GET","POST","DELETE"],
    allowedHeaders:["Content-Type","Authorization"]
}))

connect_db();

// middleware 
app.use(express.json())


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes

app.use("/api/auth",authRoutes);
app.use("/api/sessions",sessionRoutes);
app.use("/api/questions",questionRoutes);



app.use("/api/ai/generate-questions",protect,generateInterviewQuestions)
app.use("/api/ai/generate-explanation",protect,generateConceptExplanation)











//start server 

const PORT=process.env.PORT || 8000

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})
