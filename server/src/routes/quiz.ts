import { Router, Request, Response } from "express"
import { RamadanQuiz } from "../models/RamadanQuiz"
import { QuizSubmission } from "../models/QuizSubmission"
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import mongoose from 'mongoose'

const router = Router()

// Configure multer for image uploads
const uploadDir = path.resolve(__dirname, '../../../uploads/quiz')
fs.mkdirSync(uploadDir, { recursive: true })
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const ext = path.extname(file.originalname) || '.jpg'
    cb(null, `${unique}${ext}`)
  },
})
const upload = multer({ storage })

// GET /api/quiz/current - Get current day's quiz (public)
// Returns the latest active quiz (admin updates the same page for each day)
router.get("/api/quiz/current", async (req: Request, res: Response) => {
  try {
    const year = 2026
    
    // Get the latest active quiz (admin rewrites content for current day on same page)
    const quiz = await RamadanQuiz.findOne({ year, isActive: true })
      .sort({ day: -1 }) // Get the quiz with the highest day number
      .lean()
    
    if (!quiz) {
      return res.status(404).json({ ok: false, error: "No active quiz found" })
    }

    // Don't send correctAnswer to public
    const { correctAnswer, ...publicQuiz } = quiz as any
    return res.json({ ok: true, quiz: publicQuiz })
  } catch (err) {
    console.error("[quiz get current] error:", err)
    return res.status(500).json({ ok: false, error: "Server error" })
  }
})

// GET /api/quiz/:year/:day - Get quiz for specific day (public) - kept for backward compatibility
router.get("/api/quiz/:year/:day", async (req: Request, res: Response) => {
  try {
    const year = parseInt(req.params.year, 10)
    const day = parseInt(req.params.day, 10)

    if (isNaN(year) || isNaN(day) || day < 1 || day > 30) {
      return res.status(400).json({ ok: false, error: "Invalid year or day" })
    }

    const quiz = await RamadanQuiz.findOne({ year, day, isActive: true }).lean()
    
    if (!quiz) {
      return res.status(404).json({ ok: false, error: "Quiz not found" })
    }

    // Don't send correctAnswer to public
    const { correctAnswer, ...publicQuiz } = quiz as any
    return res.json({ ok: true, quiz: publicQuiz })
  } catch (err) {
    console.error("[quiz get] error:", err)
    return res.status(500).json({ ok: false, error: "Server error" })
  }
})

// POST /api/quiz/submit - Submit quiz answer (public)
router.post("/api/quiz/submit", async (req: Request, res: Response) => {
  try {
    const { quizId, fullName, phoneNumber, location, residenceCountry, answer } = req.body

    if (!quizId || !fullName || !phoneNumber || !location || !residenceCountry || !answer) {
      return res.status(400).json({ ok: false, error: "Missing required fields" })
    }

    // Get quiz to check correct answer
    const quiz = await RamadanQuiz.findById(quizId)
    if (!quiz || !quiz.isActive) {
      return res.status(404).json({ ok: false, error: "Quiz not found or inactive" })
    }

    // Check if user already submitted for this quiz
    const existing = await QuizSubmission.findOne({ quizId, phoneNumber })
    if (existing) {
      return res.status(400).json({ ok: false, error: "You have already submitted an answer for this quiz" })
    }

    const isCorrect = answer === quiz.correctAnswer
    const year = quiz.year
    const day = quiz.day

    const submission = new QuizSubmission({
      quizId,
      year,
      day,
      fullName,
      phoneNumber,
      location,
      residenceCountry,
      answer,
      isCorrect,
      ipAddress: req.ip || req.socket.remoteAddress
    })

    await submission.save()

    return res.json({ 
      ok: true, 
      message: "Answer submitted successfully",
      isCorrect 
    })
  } catch (err: any) {
    console.error("[quiz submit] error:", err)
    if (err.code === 11000) {
      return res.status(400).json({ ok: false, error: "You have already submitted an answer for this quiz" })
    }
    return res.status(500).json({ ok: false, error: "Server error" })
  }
})

// GET /api/admin/quiz - Get all quizzes (admin)
router.get("/api/admin/quiz", async (req: Request, res: Response) => {
  try {
    const year = req.query.year ? parseInt(req.query.year as string, 10) : 2026
    const quizzes = await RamadanQuiz.find({ year }).sort({ day: 1 }).lean()
    return res.json({ ok: true, items: quizzes })
  } catch (err) {
    console.error("[admin quiz get] error:", err)
    return res.status(500).json({ ok: false, error: "Server error" })
  }
})

// GET /api/admin/quiz/:id - Get single quiz (admin)
router.get("/api/admin/quiz/:id", async (req: Request, res: Response) => {
  try {
    const quiz = await RamadanQuiz.findById(req.params.id).lean()
    if (!quiz) {
      return res.status(404).json({ ok: false, error: "Quiz not found" })
    }
    return res.json({ ok: true, item: quiz })
  } catch (err) {
    console.error("[admin quiz get one] error:", err)
    return res.status(500).json({ ok: false, error: "Server error" })
  }
})

// POST /api/admin/quiz - Create quiz (admin)
router.post("/api/admin/quiz", upload.single('image'), async (req: Request, res: Response) => {
  try {
    const { year, day, title, heading, subheading, description, videoUrl, question, options, correctAnswer, isActive } = req.body

    if (!year || !day || !title || !options || !correctAnswer) {
      return res.status(400).json({ ok: false, error: "Missing required fields" })
    }
    
    // Question comes from video, use placeholder if not provided
    const questionText = question || 'Question from video'

    const yearNum = parseInt(year, 10)
    const dayNum = parseInt(day, 10)

    if (isNaN(yearNum) || isNaN(dayNum) || dayNum < 1 || dayNum > 30) {
      return res.status(400).json({ ok: false, error: "Invalid year or day" })
    }

    let parsedOptions
    try {
      parsedOptions = typeof options === 'string' ? JSON.parse(options) : options
    } catch {
      return res.status(400).json({ ok: false, error: "Invalid options format" })
    }

    if (!Array.isArray(parsedOptions) || parsedOptions.length < 2) {
      return res.status(400).json({ ok: false, error: "At least 2 options required" })
    }

    const file = (req as any).file
    const imagePath = file ? `/uploads/quiz/${file.filename}` : undefined

    const quiz = new RamadanQuiz({
      year: yearNum,
      day: dayNum,
      title,
      heading,
      subheading,
      description,
      imagePath,
      videoUrl,
      question: questionText,
      options: parsedOptions,
      correctAnswer,
      isActive: isActive === 'true' || isActive === true
    })

    await quiz.save()

    return res.json({ ok: true, item: quiz })
  } catch (err: any) {
    console.error("[admin quiz create] error:", err)
    if (err.code === 11000) {
      return res.status(400).json({ ok: false, error: "Quiz for this day already exists" })
    }
    return res.status(500).json({ ok: false, error: "Server error" })
  }
})

// PUT /api/admin/quiz/:id - Update quiz (admin)
router.put("/api/admin/quiz/:id", upload.single('image'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { year, day, title, heading, subheading, description, videoUrl, question, options, correctAnswer, isActive } = req.body

    const update: any = {
      title,
      heading,
      subheading,
      description,
      videoUrl,
      question: question || 'Question from video',
      correctAnswer,
      isActive: isActive === 'true' || isActive === true,
      updatedAt: new Date()
    }

    if (year) update.year = parseInt(year, 10)
    if (day) update.day = parseInt(day, 10)

    if (options) {
      let parsedOptions
      try {
        parsedOptions = typeof options === 'string' ? JSON.parse(options) : options
      } catch {
        return res.status(400).json({ ok: false, error: "Invalid options format" })
      }
      if (Array.isArray(parsedOptions) && parsedOptions.length >= 2) {
        update.options = parsedOptions
      }
    }

    const file = (req as any).file
    if (file) {
      update.imagePath = `/uploads/quiz/${file.filename}`
    }

    const quiz = await RamadanQuiz.findByIdAndUpdate(id, update, { new: true })

    if (!quiz) {
      return res.status(404).json({ ok: false, error: "Quiz not found" })
    }

    return res.json({ ok: true, item: quiz })
  } catch (err: any) {
    console.error("[admin quiz update] error:", err)
    if (err.code === 11000) {
      return res.status(400).json({ ok: false, error: "Quiz for this day already exists" })
    }
    return res.status(500).json({ ok: false, error: "Server error" })
  }
})

// DELETE /api/admin/quiz/:id - Delete quiz (admin)
router.delete("/api/admin/quiz/:id", async (req: Request, res: Response) => {
  try {
    const quiz = await RamadanQuiz.findByIdAndDelete(req.params.id)
    if (!quiz) {
      return res.status(404).json({ ok: false, error: "Quiz not found" })
    }
    return res.json({ ok: true })
  } catch (err) {
    console.error("[admin quiz delete] error:", err)
    return res.status(500).json({ ok: false, error: "Server error" })
  }
})

// GET /api/admin/quiz/submissions/test - Simple test endpoint to verify model works (must come before /submissions)
router.get("/api/admin/quiz/submissions/test", async (req: Request, res: Response) => {
  try {
    console.log("[admin quiz submissions test] Testing model...")
    
    // Test 1: Check if model exists
    if (!QuizSubmission) {
      return res.status(500).json({ 
        ok: false, 
        error: "QuizSubmission model is null/undefined"
      })
    }
    
    // Test 2: Count all documents
    const totalCount = await QuizSubmission.countDocuments({})
    
    // Test 3: Count by day and year
    const day1Count = await QuizSubmission.countDocuments({ day: 1, year: 2026 })
    
    // Test 4: Try to find one document
    const sample = await QuizSubmission.findOne({}).lean()
    
    return res.json({ 
      ok: true, 
      message: "QuizSubmission model is working",
      totalCount: totalCount,
      day1Count: day1Count,
      hasSample: !!sample,
      sample: sample ? {
        _id: sample._id,
        day: sample.day,
        year: sample.year,
        fullName: sample.fullName
      } : null
    })
  } catch (err: any) {
    console.error("[admin quiz submissions test] error:", err)
    return res.status(500).json({ 
      ok: false, 
      error: err.message || "Server error",
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    })
  }
})

// GET /api/admin/quiz/submissions/all - Get all submissions (for debugging) (must come before /submissions)
router.get("/api/admin/quiz/submissions/all", async (req: Request, res: Response) => {
  try {
    console.log("[admin quiz submissions all] Fetching all submissions...")
    const allSubmissions = await QuizSubmission.find({})
      .sort({ submittedAt: -1 })
      .limit(100)
      .lean()
    
    return res.json({
      ok: true,
      count: allSubmissions.length,
      items: allSubmissions
    })
  } catch (err: any) {
    console.error("[admin quiz submissions all] error:", err)
    return res.status(500).json({
      ok: false,
      error: err.message || "Server error"
    })
  }
})

// GET /api/admin/quiz/submissions - Get quiz submissions (admin)
// Query params: quizId, day, year
router.get("/api/admin/quiz/submissions", async (req: Request, res: Response) => {
  try {
    console.log("[admin quiz submissions] Request received with query:", req.query)
    
    const { quizId, day, year } = req.query
    
    // Build filter - same pattern as working "all" endpoint
    const filter: any = {}
    
    if (quizId && quizId !== '') {
      if (mongoose.Types.ObjectId.isValid(quizId as string)) {
        filter.quizId = new mongoose.Types.ObjectId(quizId as string)
      } else {
        return res.status(400).json({ ok: false, error: "Invalid quizId format" })
      }
    }
    
    if (day && day !== '') {
      const dayNum = parseInt(String(day), 10)
      if (!isNaN(dayNum) && dayNum > 0) {
        filter.day = dayNum
      }
    }
    
    if (year && year !== '') {
      const yearNum = parseInt(String(year), 10)
      if (!isNaN(yearNum) && yearNum > 0) {
        filter.year = yearNum
      }
    }

    console.log("[admin quiz submissions] Filter:", JSON.stringify(filter))

    // Verify model exists
    if (!QuizSubmission) {
      console.error("[admin quiz submissions] QuizSubmission model is null/undefined")
      return res.status(500).json({ ok: false, error: "QuizSubmission model not initialized" })
    }

    console.log("[admin quiz submissions] Model verified, executing query...")

    // Execute query - use the exact same pattern as the working "all" endpoint
    let submissions: any[] = []
    try {
      // Use the exact same query pattern as the working "all" endpoint
      // If filter is empty, it will return all (same as "all" endpoint)
      const query = QuizSubmission.find(filter)
      submissions = await query
        .sort({ submittedAt: -1 })
        .lean()
      
      console.log("[admin quiz submissions] Query result count:", submissions.length)
      
      // Try to populate quizId if submissions exist (optional, don't fail if it doesn't work)
      if (submissions.length > 0) {
        try {
          const populatedQuery = QuizSubmission.find(filter)
          const populated = await populatedQuery
            .populate('quizId', 'day year title')
            .sort({ submittedAt: -1 })
            .lean()
          submissions = populated
          console.log("[admin quiz submissions] Populate successful")
        } catch (popError: any) {
          console.warn("[admin quiz submissions] Populate failed, using raw data:", popError.message)
          // Continue with unpopulated data - this is fine
        }
      }
    } catch (queryError: any) {
      console.error("[admin quiz submissions] Query failed:", queryError.message)
      console.error("[admin quiz submissions] Query error stack:", queryError.stack)
      console.error("[admin quiz submissions] Filter used:", JSON.stringify(filter))
      throw queryError
    }

    console.log("[admin quiz submissions] Final submissions count:", submissions.length)

    // Calculate statistics - ensure all values are valid
    const total = submissions.length || 0
    const correct = submissions.filter((s: any) => s.isCorrect === true).length || 0
    const incorrect = total - correct
    const accuracy = total > 0 ? ((correct / total) * 100).toFixed(2) : '0.00'

    // Build response - use same format as "all" endpoint
    // Ensure all data is serializable
    const response = { 
      ok: true, 
      items: Array.isArray(submissions) ? submissions : [],
      stats: {
        total: Number(total) || 0,
        correct: Number(correct) || 0,
        incorrect: Number(incorrect) || 0,
        accuracy: String(accuracy) || '0.00'
      }
    }
    
    // Validate response before sending
    if (typeof response.ok !== 'boolean') {
      throw new Error('Invalid response format: ok must be boolean')
    }
    if (!Array.isArray(response.items)) {
      throw new Error('Invalid response format: items must be array')
    }

    console.log("[admin quiz submissions] Response prepared, sending...")
    console.log("[admin quiz submissions] Response stats:", JSON.stringify(response.stats))
    console.log("[admin quiz submissions] Items count:", response.items.length)
    console.log("[admin quiz submissions] Response ok:", response.ok)
    
    // Ensure response is sent properly
    if (res.headersSent) {
      console.error("[admin quiz submissions] WARNING: Headers already sent, cannot send response")
      return
    }
    
    try {
      return res.json(response)
    } catch (sendError: any) {
      console.error("[admin quiz submissions] Error sending response:", sendError)
      if (!res.headersSent) {
        return res.status(500).json({ 
          ok: false, 
          error: sendError.message || "Error sending response"
        })
      }
    }
  } catch (err: any) {
    console.error("[admin quiz submissions] ERROR:", err)
    console.error("[admin quiz submissions] Error name:", err.name)
    console.error("[admin quiz submissions] Error message:", err.message)
    if (err.stack) {
      console.error("[admin quiz submissions] Error stack:", err.stack)
    }
    
    // Always send a response
    if (!res.headersSent) {
      return res.status(500).json({ 
        ok: false, 
        error: err.message || "Server error",
        errorName: err.name,
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined
      })
    } else {
      console.error("[admin quiz submissions] Response already sent, cannot send error response")
    }
  }
})


// POST /api/admin/quiz/test-submission - Create a test submission (admin only, for testing)
router.post("/api/admin/quiz/test-submission", async (req: Request, res: Response) => {
  try {
    const { day, year } = req.body
    const testDay = day || 1
    const testYear = year || 2026

    // Find a quiz for this day/year
    const quiz = await RamadanQuiz.findOne({ year: testYear, day: testDay })
    if (!quiz) {
      return res.status(404).json({ 
        ok: false, 
        error: `No quiz found for day ${testDay}, year ${testYear}. Please create a quiz first.` 
      })
    }

    // Create a test submission
    const testSubmission = new QuizSubmission({
      quizId: quiz._id,
      year: testYear,
      day: testDay,
      fullName: `Test User ${Date.now()}`,
      phoneNumber: `+965${Math.floor(Math.random() * 10000000)}`,
      location: 'Test Location',
      residenceCountry: 'Kuwait',
      answer: quiz.options[0]?.value || 'one', // Use first option
      isCorrect: quiz.options[0]?.value === quiz.correctAnswer,
      ipAddress: req.ip || '127.0.0.1'
    })

    await testSubmission.save()

    return res.json({ 
      ok: true, 
      message: "Test submission created successfully",
      submission: testSubmission
    })
  } catch (err: any) {
    console.error("[admin test submission] error:", err)
    if (err.code === 11000) {
      return res.status(400).json({ ok: false, error: "A submission with this phone number already exists for this quiz" })
    }
    return res.status(500).json({ ok: false, error: err.message || "Server error" })
  }
})

export default router
