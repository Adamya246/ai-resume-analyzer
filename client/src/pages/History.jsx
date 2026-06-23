import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/resume/history')
      .then(r => r.json())
      .then(d => { setHistory(d); setLoading(false); })
      .catch(() => { setError('Failed to load history.'); setLoading(false); });
  }, []);

  const scoreColor = (score) =>
    score >= 75 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400';

  const scoreBg = (score) =>
    score >= 75 ? 'bg-green-500/10 border-green-500/20' : score >= 50 ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-red-500/10 border-red-500/20';

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) +
      ' · ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Analysis History</h1>
            <p className="text-gray-400 mt-1">Your previous resume analyses</p>
          </div>
          <button
            onClick={() => navigate('/analyze')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-semibold transition"
          >
            + New Analysis
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
            ⚠ {error}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && history.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📋</div>
            <p className="text-gray-400 text-lg mb-2">No analyses yet</p>
            <p className="text-gray-600 text-sm mb-6">Upload a resume to get started</p>
            <button
              onClick={() => navigate('/analyze')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition"
            >
              Upload Resume →
            </button>
          </div>
        )}

        {/* History list */}
        {!loading && history.length > 0 && (
          <div className="space-y-3">
            {history.map((item, i) => (
              <div
                key={item.id}
                onClick={() => navigate(`/results/${item.id}`)}
                className="bg-gray-900 border border-gray-800 hover:border-gray-600 rounded-2xl p-5 cursor-pointer transition-all duration-200 flex items-center gap-4 group"
              >
                {/* Index */}
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-500 text-sm font-medium shrink-0">
                  {i + 1}
                </div>

                {/* File icon */}
                <div className="text-2xl shrink-0">📄</div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-100 truncate">{item.filename}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{formatDate(item.created_at)}</p>
                </div>

                {/* Score badge */}
                <div className={`px-3 py-1.5 border rounded-lg text-sm font-bold shrink-0 ${scoreBg(item.resume_score)}`}>
                  <span className={scoreColor(item.resume_score)}>{item.resume_score}</span>
                  <span className="text-gray-600 text-xs font-normal"> /100</span>
                </div>

                {/* Arrow */}
                <div className="text-gray-600 group-hover:text-gray-400 transition shrink-0">→</div>
              </div>
            ))}
          </div>
        )}

        {/* Back button */}
        {!loading && (
          <button
            onClick={() => navigate('/')}
            className="mt-8 w-full py-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-sm font-medium text-gray-400 transition"
          >
            ← Back to Home
          </button>
        )}

      </div>
    </div>
  );
}
