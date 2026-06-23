const fs = require('fs');
const pdfParse = require('pdf-parse');
const pool = require('../db/pool');
const { analyzeResume } = require('../services/llm');

async function analyze(req, res) {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });

  try {
    // 1. Extract text from PDF
    const buffer = fs.readFileSync(req.file.path);
    const pdf = await pdfParse(buffer);
    const rawText = pdf.text;

    if (!rawText || rawText.trim().length < 50) {
      return res.status(400).json({ error: 'Could not extract text. Make sure it is not a scanned/image PDF.' });
    }

    // 2. Analyze with AI
    console.log('Sending to AI...');
    const analysis = await analyzeResume(rawText);
    console.log('AI analysis complete.');

    // 3. Save to PostgreSQL
    const { rows } = await pool.query(
      `INSERT INTO resume_analyses
         (filename, raw_text, summary, skills_found, strengths, weaknesses,
          recommended_roles, resume_score, interview_questions, improvement_suggestions)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       RETURNING id, filename, summary, skills_found, strengths, weaknesses,
                 recommended_roles, resume_score, interview_questions,
                 improvement_suggestions, created_at`,
      [
        req.file.originalname,
        rawText,
        analysis.summary,
        JSON.stringify(analysis.skills_found),
        JSON.stringify(analysis.strengths),
        JSON.stringify(analysis.weaknesses),
        JSON.stringify(analysis.recommended_roles),
        analysis.resume_score,
        JSON.stringify(analysis.interview_questions),
        JSON.stringify(analysis.improvement_suggestions),
      ]
    );

    fs.unlinkSync(req.file.path);
    return res.status(201).json({ id: rows[0].id, analysis: rows[0] });
  } catch (err) {
    console.error('Analyze error:', err);
    if (req.file?.path && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    return res.status(500).json({ error: err.message || 'Analysis failed. Please try again.' });
  }
}

async function getAnalysis(req, res) {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM resume_analyses WHERE id = $1',
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Analysis not found.' });
    return res.json(rows[0]);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch analysis.' });
  }
}

async function getHistory(req, res) {
  try {
    const { rows } = await pool.query(
      'SELECT id, filename, resume_score, created_at FROM resume_analyses ORDER BY created_at DESC LIMIT 20'
    );
    return res.json(rows);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch history.' });
  }
}

module.exports = { analyze, getAnalysis, getHistory };
