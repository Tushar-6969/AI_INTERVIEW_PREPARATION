const Question = require("../models/Question");
const Session = require("../models/Session");

// @desc Add questions to an existing session
// @route POST /api/questions/add
// @access Private
exports.addQuestionsToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;

    // Validate input
    if (!sessionId || !questions || !Array.isArray(questions)) {
      return res.status(400).json({
        success: false,
        message: "Invalid input data",
      });
    }

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    // Create new questions
    const createdQuestions = await Question.insertMany(
      questions.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
      }))
    );

    // Update session with new question IDs
    session.questions.push(...createdQuestions.map((q) => q._id));
    await session.save();

    return res.status(201).json({
      success: true,
      questions: createdQuestions,
    });
  } catch (err) {
    console.error("addQuestionsToSession Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

// @desc Pin or unpin a question
// @route POST /api/questions/:id/pin
// @access Private
exports.togglePinQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    question.isPinned = !question.isPinned;
    await question.save();

    return res.status(200).json({
      success: true,
      question,
    });
  } catch (err) {
    console.error("togglePinQuestion Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

// @desc Update a note for a question
// @route POST /api/questions/:id/note
// @access Private
exports.updateQuestionNote = async (req, res) => {
  try {
    const { note } = req.body;

    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    question.note = note || "";
    await question.save();

    return res.status(200).json({
      success: true,
      question,
    });
  } catch (err) {
    console.error("updateQuestionNote Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error hhee",
      error: err.message,
    });
  }
};