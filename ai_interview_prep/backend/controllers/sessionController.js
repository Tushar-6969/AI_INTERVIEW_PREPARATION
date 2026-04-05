const Session = require("../models/Session")
const Question = require("../models/Question")

// @desc creating new session and linked questions 
// route POST "/api/sessions/create"
// @access private
exports.createSession = async (req, res) => {
  try {
    console.log("📥 CREATE SESSION - Request body:", req.body);
    console.log("👤 CREATE SESSION - User ID:", req.user?._id);
    
    // 1️⃣ Destructure correctly
    const { role, experience, topicsToFocus, description, questions } = req.body;
    
    // 2️⃣ Get user from auth middleware
    const user_id = req.user._id;

    // 3️⃣ Create session first
    const session = await Session.create({
      user: user_id,
      role,
      experience,
      topicsToFocus,
      description,
    });
    console.log("✅ Session created:", session._id);

    // 4️⃣ Create questions linked to session
    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        const question = await Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        });
        console.log("✅ Question created:", question._id);
        return question._id;
      })
    );

    // 5️⃣ Attach questions to session
    session.questions = questionDocs;
    await session.save();
    console.log("🔗 Questions linked to session");

    // 6️⃣ Send response
    const responseData = { success: true, session };
    console.log("📤 CREATE SESSION RESPONSE:", responseData);
    
    return res.status(201).json(responseData);

  } catch (err) {
    console.error("❌ CREATE SESSION ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// @desc get all sessions for logged in user 
// route GET "/api/sessions/my-sessions"
// @access private
exports.getMySessions = async (req, res) => {
  try {
    console.log("👤 GET MY SESSIONS - User ID:", req.user?.id);
    
    const sessions = await Session.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("questions");
    
    console.log("📊 Found sessions:", sessions.length);
    console.log("📤 MY SESSIONS RESPONSE:", { sessions });
    
    res.status(200).json({ sessions });
  } catch (err) {
    console.error("❌ GET MY SESSIONS ERROR:", err);
    return res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
};

// @desc get session by id with populated questions 
// route GET "/api/sessions/:id"
// @access private
exports.getSessionById = async (req, res) => {
  try {
    console.log("🔍 GET SESSION BY ID - Session ID:", req.params.id);
    console.log("👤 User ID:", req.user?.id);
    
    const session = await Session.findById(req.params.id)
      .populate({
        path: "questions",
        options: { sort: { isPinned: -1, createdAt: 1 } }
      })
      .exec();

    console.log("📋 Session found:", session ? "YES" : "NO");

    if (!session) {
      const errorResponse = { success: false, message: "Session not found" };
      console.log("❌ SESSION NOT FOUND:", errorResponse);
      return res.status(404).json(errorResponse);
    }

    const responseData = { success: true, session };
    console.log("📤 SESSION BY ID RESPONSE:", responseData);
    
    return res.status(200).json(responseData);

  } catch (err) {
    console.error("❌ GET SESSION BY ID ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
};

// @desc delete session and its questions 
// route DELETE "/api/sessions/:id"
// @access private
exports.deleteSession = async (req, res) => {  // ✅ FIXED: Added req, res params
  try {
    console.log("🗑️ DELETE SESSION - Session ID:", req.params.id);
    console.log("👤 User ID:", req.user?.id);
    
    const session = await Session.findById(req.params.id);
    console.log("📋 Session found:", session ? "YES" : "NO");
    
    if (!session) {
      const errorResponse = { success: false, message: "Session not found" };
      console.log("❌ SESSION NOT FOUND:", errorResponse);
      return res.status(404).json(errorResponse);
    }

    // Authentication check if current user owns the session 
    if (session.user.toString() !== req.user.id) {
      const authError = { success: false, message: "Not authorized to delete this session" };
      console.log("❌ NOT AUTHORIZED:", authError);
      return res.status(401).json(authError);
    }

    await Question.deleteMany({ session: session._id });
    console.log("✅ Questions deleted");
    
    await session.deleteOne();
    console.log("✅ Session deleted");
    
    const successResponse = { message: "Session deleted successfully" };
    console.log("📤 DELETE SUCCESS:", successResponse);
    
    res.status(200).json(successResponse);
  } catch (err) {
    console.error("❌ DELETE SESSION ERROR:", err);
    return res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
};
