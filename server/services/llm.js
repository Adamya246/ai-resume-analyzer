require('dotenv').config();

async function analyzeResume(rawText) {
  const prompt = `
You are an expert resume analyzer and career coach.
Analyze the following resume and return ONLY a valid JSON object.
No markdown. No code blocks. No explanation. Just the JSON.

Resume:
"""
${rawText.slice(0, 8000)}
"""

Return exactly this JSON structure:
{
  "summary": "2-3 sentence professional summary of this candidate.",
  "skills_found": ["skill1", "skill2", "skill3"],
  "strengths": ["Strength 1", "Strength 2", "Strength 3"],
  "weaknesses": ["Weakness 1", "Weakness 2", "Weakness 3"],
  "recommended_roles": [
    { "role": "Role Name", "score": 85 },
    { "role": "Role Name", "score": 70 },
    { "role": "Role Name", "score": 60 }
  ],
  "resume_score": 75,
  "interview_questions": [
    { "category": "Category", "question": "Question text?" },
    { "category": "Category", "question": "Question text?" },
    { "category": "Category", "question": "Question text?" },
    { "category": "Category", "question": "Question text?" },
    { "category": "Category", "question": "Question text?" }
  ],
  "improvement_suggestions": ["Suggestion 1", "Suggestion 2", "Suggestion 3"]
}

Rules:
- resume_score must be integer between 0 and 100
- recommended_roles scores must be integers between 0 and 100
- skills_found should list all technical and soft skills found
- Return ONLY the JSON, nothing else
`.trim();

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'nvidia/nemotron-3-ultra-550b-a55b:free',
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'OpenRouter error');

  const raw = data.choices[0].message.content;
  const cleaned = raw
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    console.error('LLM JSON parse failed. Raw:', raw.slice(0, 300));
    throw new Error('AI returned invalid JSON. Please try again.');
  }
}

module.exports = { analyzeResume };
