import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Results() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/resume/${id}`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => { setError('Failed to load results.'); setLoading(false); });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400">Loading results...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center text-red-400">{error}</div>
  );

  if (!data) return null;

  const score = data.resume_score || 0;
  const skills = data.skills_found || [];
  const strengths = data.strengths || [];
  const weaknesses = data.weaknesses || [];
  const roles = data.recommended_roles || [];
  const questions = data.interview_questions || [];
  const suggestions = data.improvement_suggestions || [];

  // Score color
  const scoreColor = score >= 75 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444';
  const circumference = 2 * Math.PI * 54;
  const progress = (score / 100) * circumference;

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Resume Analysis</h1>
            <p className="text-gray-400 mt-1">{data.filename}</p>
          </div>
          <button onClick={() => navigate('/analyze')}
            className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl text-sm font-medium transition">
            Analyze Another
          </button>
        </div>

        {/* Score + Summary row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Score Card */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col items-center justify-center">
            <p className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Resume Score</p>
            <svg width="128" height="128" className="-rotate-90">
              <circle cx="64" cy="64" r="54" fill="none" stroke="#1f2937" strokeWidth="10" />
              <circle cx="64" cy="64" r="54" fill="none" stroke={scoreColor} strokeWidth="10"
                strokeDasharray={`${progress} ${circumference}`} strokeLinecap="round" />
            </svg>
            <div style={{ marginTop: -72, marginBottom: 24, fontSize: 32, fontWeight: 700, color: scoreColor }}>
              {score}
            </div>
            <p className="text-gray-500 text-xs text-center">out of 100</p>
          </div>

          {/* Summary Card */}
          <div className="md:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3">Profile Summary</h2>
            <p className="text-gray-300 leading-relaxed">{data.summary}</p>
          </div>
        </div>

        {/* Skills */}
        <Section title="Skills Found" emoji="🛠">
          <div className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <span key={i} className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-lg text-sm font-medium">
                {s}
              </span>
            ))}
          </div>
        </Section>

        {/* Strengths + Weaknesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Section title="Strengths" emoji="✅" noBg>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <ul className="space-y-2">
                {strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span className="text-green-400 mt-0.5">✓</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          </Section>
          <Section title="Weaknesses" emoji="⚠️" noBg>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <ul className="space-y-2">
                {weaknesses.map((w, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span className="text-red-400 mt-0.5">✗</span> {w}
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        </div>

        {/* Recommended Roles */}
        <Section title="Recommended Roles" emoji="🎯">
          <div className="space-y-3">
            {roles.map((r, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="w-44 text-gray-300 text-sm shrink-0">{r.role}</span>
                <div className="flex-1 bg-gray-800 rounded-full h-2.5">
                  <div className="h-2.5 rounded-full transition-all duration-700"
                    style={{ width: `${r.score}%`, background: r.score >= 75 ? '#22c55e' : r.score >= 50 ? '#f59e0b' : '#ef4444' }} />
                </div>
                <span className="w-10 text-right text-sm font-semibold text-gray-300">{r.score}%</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Interview Questions */}
        <Section title="Interview Questions" emoji="🎤">
          <div className="space-y-3">
            {questions.map((q, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded text-xs font-medium shrink-0 mt-0.5">
                  {q.category}
                </span>
                <p className="text-gray-300 text-sm leading-relaxed">{q.question}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Improvement Suggestions */}
        <Section title="Improvement Suggestions" emoji="💡">
          <ul className="space-y-2">
            {suggestions.map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                <span className="text-yellow-400 mt-0.5 shrink-0">→</span> {s}
              </li>
            ))}
          </ul>
        </Section>

        {/* Footer actions */}
        <div className="flex gap-3 mt-8">
          <button onClick={() => navigate('/analyze')}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition">
            Analyze Another Resume
          </button>
          <button onClick={() => navigate('/history')}
            className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold transition">
            View History
          </button>
        </div>

      </div>
    </div>
  );
}

function Section({ title, emoji, children, noBg }) {
  return (
    <div className="mb-4">
      <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
        <span>{emoji}</span> {title}
      </h2>
      {noBg ? children : (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          {children}
        </div>
      )}
    </div>
  );
}
