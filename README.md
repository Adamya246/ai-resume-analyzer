# 📄 AI Resume Analyzer

An AI-powered Resume Analyzer that evaluates resumes, provides ATS-style feedback, and generates personalized interview questions using Large Language Models.

---

## ✨ Features

### 📤 Resume Upload

* Upload resumes in **PDF format**
* Maximum file size: **5 MB**
* Drag & Drop interface
* Automatic PDF text extraction using `pdf-parse`

---

### 🤖 AI Analysis

Powered by:

* OpenRouter
* NVIDIA Nemotron Ultra 550B
* Model:
  `nvidia/nemotron-3-ultra-550b-a55b:free`

The AI generates:

✅ Resume Summary
✅ Technical Skills Analysis
✅ Strengths
✅ Weaknesses
✅ Recommended Roles
✅ ATS-style Resume Score
✅ AI-generated Interview Questions
✅ Improvement Suggestions

---

### 📊 Visual Analytics

* Circular Resume Score Ring
* Role Match Progress Bars
* Structured Results Dashboard
* Clean Dark UI

---

### 🕒 Analysis History

All analyses are stored in PostgreSQL.

Users can:

* View previous analyses
* Compare scores
* Revisit AI suggestions
* Track resume improvements over time

---

## 🛠 Tech Stack

### Frontend

* ⚛ React
* 🎨 Tailwind CSS

### Backend

* 🟢 Node.js
* 🚂 Express.js

### Database

* 🐘 PostgreSQL

### AI

* 🤖 OpenRouter
* 🧠 NVIDIA Nemotron Ultra 550B

### PDF Processing

* 📄 pdf-parse

---

## 🏗 Architecture

```text
User

↓

Upload PDF

↓

React + Tailwind

↓

Node + Express

↓

pdf-parse

↓

OpenRouter API

↓

NVIDIA Nemotron Ultra 550B

↓

Structured JSON Response

↓

PostgreSQL

↓

Results + History Dashboard
```

---

## 🎯 Key Features

* PDF Upload with Drag & Drop
* AI Resume Scoring
* Skill Gap Detection
* Career Role Recommendations
* AI-generated Interview Questions
* Historical Analysis Dashboard
* Responsive Dark UI

---

## 💡 Project Motivation

This project was built to explore the integration of:

* Large Language Models
* Document Parsing
* Structured AI Prompts
* PostgreSQL Data Persistence
* Modern Full-Stack Web Development

into a practical application that helps students and professionals improve their resumes and prepare for interviews.

---

## 🎓 Resume Description

> Built a full-stack AI Resume Analyzer using React, Node.js, PostgreSQL, and OpenRouter's LLM API. The app extracts text from uploaded PDFs using pdf-parse, sends it to an LLM with a structured JSON prompt, and displays a resume score, skill analysis, career recommendations, and AI-generated interview questions. All analyses are stored in PostgreSQL with a history dashboard.
