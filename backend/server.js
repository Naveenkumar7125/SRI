// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const cors = require('cors');

// const app = express();
// const PORT = 3001;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadDir = 'uploads/videos';
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 100 * 1024 * 1024 // 100MB limit
//   },
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = /mp4|avi|mov|mkv|wmv/;
//     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = allowedTypes.test(file.mimetype);

//     if (mimetype && extname) {
//       return cb(null, true);
//     } else {
//       cb(new Error('Only video files are allowed'));
//     }
//   }
// });

// // Mock video analysis function (replace with actual AI model)
// function analyzeVideo(videoPath) {
//   // In a real application, you would use:
//   // - OpenCV for computer vision
//   // - TensorFlow/PyTorch for AI models
//   // - FFmpeg for video processing
  
//   const mockAnalysis = {
//     duration: `${Math.floor(Math.random() * 10 + 1)}m ${Math.floor(Math.random() * 60)}s`,
//     objectsDetected: Math.floor(Math.random() * 50 + 10),
//     keyEvents: [
//       "Person detected at 00:01:23",
//       "Vehicle movement at 00:02:45",
//       "Unusual activity at 00:04:12",
//       "Multiple persons gathering at 00:05:30"
//     ],
//     suspiciousActivities: [
//       "Rapid movement in restricted area",
//       "Loitering near entrance",
//       "Unauthorized access attempt"
//     ],
//     timestampHighlights: [
//       "00:01:15 - Person enters frame",
//       "00:02:30 - Vehicle approaches",
//       "00:04:05 - Suspicious package detected",
//       "00:06:20 - Group dispersal"
//     ],
//     confidence: (Math.random() * 0.3 + 0.7).toFixed(2) // 0.7-1.0
//   };

//   return mockAnalysis;
// }

// // Upload endpoint
// app.post('/api/upload', upload.single('video'), (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No video file uploaded' });
//     }

//     const fileUrl = `http://localhost:${PORT}/uploads/videos/${req.file.filename}`;
    
//     res.json({
//       message: 'Video uploaded successfully',
//       fileName: req.file.originalname,
//       filePath: req.file.path,
//       fileUrl: fileUrl,
//       size: req.file.size
//     });
//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).json({ error: 'Upload failed' });
//   }
// });

// // Video summarization endpoint
// app.post('/api/summarize', (req, res) => {
//   try {
//     const { videoPath } = req.body;
    
//     if (!videoPath) {
//       return res.status(400).json({ error: 'Video path is required' });
//     }

//     // Check if file exists
//     if (!fs.existsSync(videoPath)) {
//       return res.status(404).json({ error: 'Video file not found' });
//     }

//     // Analyze video and generate summary
//     const analysis = analyzeVideo(videoPath);

//     res.json({
//       success: true,
//       summary: analysis
//     });
//   } catch (error) {
//     console.error('Summarization error:', error);
//     res.status(500).json({ error: 'Summarization failed' });
//   }
// });

// // Get upload history endpoint
// app.get('/api/uploads', (req, res) => {
//   try {
//     const uploadsDir = 'uploads/videos';
//     if (!fs.existsSync(uploadsDir)) {
//       return res.json([]);
//     }

//     const files = fs.readdirSync(uploadsDir).map(file => {
//       const filePath = path.join(uploadsDir, file);
//       const stats = fs.statSync(filePath);
      
//       return {
//         name: file,
//         size: stats.size,
//         uploadedAt: stats.birthtime,
//         url: `http://localhost:${PORT}/uploads/videos/${file}`
//       };
//     });

//     res.json(files);
//   } catch (error) {
//     console.error('Error fetching uploads:', error);
//     res.status(500).json({ error: 'Failed to fetch upload history' });
//   }
// });

// // Health check endpoint
// app.get('/api/health', (req, res) => {
//   res.json({ status: 'OK', timestamp: new Date().toISOString() });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
//   console.log(`Upload directory: ./uploads/videos/`);
// });





// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';
// import cors from 'cors';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// // These two lines replace __dirname and __filename in ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const app = express();
// const PORT = 3001;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));



// // const express = require('express');
// // const multer = require('multer');
// // const path = require('path');
// // const fs = require('fs');
// // const cors = require('cors');

// // const app = express();
// // const PORT = 3001;

// // // Middleware
// // app.use(cors());
// // app.use(express.json());
// // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Ensure upload folder exists
// const uploadDir = path.join(__dirname, 'uploads/videos');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
//   console.log('📁 Created upload directory:', uploadDir);
// }

// // Multer configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 100 * 1024 * 1024 // 100 MB limit
//   },
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = /mp4|avi|mov|mkv|wmv/;
//     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = allowedTypes.test(file.mimetype);

//     if (mimetype && extname) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only video files are allowed (mp4, avi, mov, mkv, wmv)'));
//     }
//   }
// });

// // Mock AI video analysis (replace later with actual model)
// function analyzeVideo(videoPath) {
//   const mockAnalysis = {
//     duration: `${Math.floor(Math.random() * 10 + 1)}m ${Math.floor(Math.random() * 60)}s`,
//     objectsDetected: Math.floor(Math.random() * 50 + 10),
//     keyEvents: [
//       "Person detected at 00:01:23",
//       "Vehicle movement at 00:02:45",
//       "Unusual activity at 00:04:12"
//     ],
//     suspiciousActivities: [
//       "Rapid movement in restricted area",
//       "Unauthorized access attempt"
//     ],
//     timestampHighlights: [
//       "00:01:15 - Person enters frame",
//       "00:02:30 - Vehicle approaches",
//       "00:04:05 - Suspicious package detected"
//     ],
//     confidence: (Math.random() * 0.3 + 0.7).toFixed(2)
//   };
//   return mockAnalysis;
// }

// // ✅ Upload endpoint
// app.post('/api/upload', upload.single('video'), (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No video file uploaded' });
//     }

//     const filePath = req.file.path;
//     const fileUrl = `http://localhost:${PORT}/uploads/videos/${req.file.filename}`;

//     res.json({
//       success: true,
//       message: 'Video uploaded successfully',
//       fileName: req.file.originalname,
//       savedAs: req.file.filename,
//       filePath,
//       fileUrl,
//       size: req.file.size
//     });
//   } catch (error) {
//     console.error('❌ Upload error:', error);
//     res.status(500).json({ error: 'Upload failed' });
//   }
// });

// // ✅ Summarization endpoint
// app.post('/api/summarize', (req, res) => {
//   try {
//     const { videoPath } = req.body;

//     if (!videoPath || !fs.existsSync(videoPath)) {
//       return res.status(400).json({ error: 'Invalid or missing video path' });
//     }

//     const summary = analyzeVideo(videoPath);

//     res.json({
//       success: true,
//       summary
//     });
//   } catch (error) {
//     console.error('❌ Summarization error:', error);
//     res.status(500).json({ error: 'Summarization failed' });
//   }
// });

// // ✅ Get uploaded videos history
// app.get('/api/uploads', (req, res) => {
//   try {
//     const files = fs.readdirSync(uploadDir).map(file => {
//       const filePath = path.join(uploadDir, file);
//       const stats = fs.statSync(filePath);
//       return {
//         name: file,
//         size: (stats.size / (1024 * 1024)).toFixed(2) + ' MB',
//         uploadedAt: stats.birthtime,
//         url: `http://localhost:${PORT}/uploads/videos/${file}`
//       };
//     });

//     res.json(files);
//   } catch (error) {
//     console.error('❌ Error fetching uploads:', error);
//     res.status(500).json({ error: 'Failed to fetch uploads' });
//   }
// });

// // ✅ Health check
// app.get('/api/health', (req, res) => {
//   res.json({ status: 'OK', time: new Date().toISOString() });
// });

// // ✅ Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at: http://localhost:${PORT}`);
//   console.log(`📂 Upload directory: ${uploadDir}`);
// });

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit per file
  },
});

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyBgVGVc_75ZyCpbkKzjYkDMdiBY3uF3J-w');

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend server is running' });
});

// Analyze frames with Gemini AI
app.post('/api/analyze-frames', upload.any(), async (req, res) => {
  try {
    console.log('Received request to analyze frames');
    
    const { prompt, api_key } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ 
        error: 'No frames provided',
        details: 'Please upload at least one frame for analysis'
      });
    }

    if (!prompt) {
      return res.status(400).json({ 
        error: 'No prompt provided',
        details: 'Analysis prompt is required'
      });
    }

    console.log(`Processing ${files.length} frames with Gemini AI...`);

    // Use provided API key or fallback to environment variable
    const effectiveApiKey = api_key || process.env.GEMINI_API_KEY;
    if (!effectiveApiKey) {
      return res.status(400).json({
        error: 'API key required',
        details: 'Please provide a Gemini API key'
      });
    }

    const genAI = new GoogleGenerativeAI(effectiveApiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Prepare images for Gemini
    const imageParts = files.map(file => ({
      inlineData: {
        data: file.buffer.toString('base64'),
        mimeType: file.mimetype
      }
    }));

    // Combine images and prompt
    const contents = [
      ...imageParts,
      { text: prompt }
    ];

    console.log('Sending request to Gemini AI...');

    // Generate content with Gemini
    const result = await model.generateContent({
      contents: contents,
      generationConfig: {
        temperature: 0.7,
        topK: 32,
        topP: 1,
        maxOutputTokens: 2048,
      },
    });

    const analysis = result.response.text();
    
    console.log('Successfully received analysis from Gemini AI');

    res.json({ 
      analysis: analysis,
      framesProcessed: files.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Gemini API error:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Analysis failed';
    let errorDetails = error.message;

    if (error.message.includes('API_KEY_INVALID')) {
      errorMessage = 'Invalid API key';
      errorDetails = 'Please check your Gemini API key and try again';
    } else if (error.message.includes('quota')) {
      errorMessage = 'API quota exceeded';
      errorDetails = 'Gemini API quota has been exceeded. Please try again later';
    } else if (error.message.includes('network') || error.message.includes('ECONNREFUSED')) {
      errorMessage = 'Network error';
      errorDetails = 'Unable to connect to Gemini API. Please check your internet connection';
    }

    res.status(500).json({ 
      error: errorMessage,
      details: errorDetails,
      fallback: true
    });
  }
});

// Upload endpoint (for compatibility with existing frontend)
app.post('/api/upload', upload.single('video'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No video file provided' });
    }

    // For demo purposes, return a mock response
    const fileUrl = `http://localhost:3001/uploads/${Date.now()}-${req.file.originalname}`;
    
    res.json({
      message: 'Video uploaded successfully',
      filePath: `/uploads/${req.file.originalname}`,
      fileUrl: fileUrl,
      size: req.file.size,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Summarize endpoint (for compatibility with existing frontend)
app.post('/api/summarize', (req, res) => {
  try {
    const { videoPath } = req.body;
    
    // Mock summary for demo purposes
    const summary = {
      duration: "2m 45s",
      objectsDetected: Math.floor(Math.random() * 50 + 10),
      keyEvents: [
        "Person detected at 00:01:23",
        "Vehicle movement at 00:02:45",
        "Unusual activity at 00:04:12"
      ],
      suspiciousActivities: [
        "Rapid movement in restricted area",
        "Loitering near entrance"
      ],
      timestampHighlights: [
        "00:01:15 - Person enters frame",
        "00:02:30 - Vehicle approaches"
      ]
    };

    res.json({ summary });
  } catch (error) {
    console.error('Summarize error:', error);
    res.status(500).json({ error: 'Summary generation failed' });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    path: req.originalUrl 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔮 Gemini AI endpoint: http://localhost:${PORT}/api/analyze-frames`);
});