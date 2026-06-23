const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { analyze, getAnalysis, getHistory } = require('../controllers/resumeController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('PDF files only.'));
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/analyze',   upload.single('resume'), analyze);
router.get('/history',    getHistory);
router.get('/:id',        getAnalysis);

module.exports = router;
