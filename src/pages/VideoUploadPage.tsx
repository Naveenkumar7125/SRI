


// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Upload, Folder, Eye, Activity, AlertTriangle, Clock, FileVideo, Download, Play, Pause } from 'lucide-react';
// import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
// import InsightCard from '../components/InsightCard';
// import { generateChartData, generateAlerts } from '../utils/dataGenerator';
// import { UploadedFile } from '../types';

// interface VideoSummary {
//   duration: string;
//   objectsDetected: number;
//   keyEvents: string[];
//   suspiciousActivities: string[];
//   timestampHighlights: string[];
// }

// export default function VideoUploadPage() {
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadHistory, setUploadHistory] = useState<UploadedFile[]>([]);
//   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
//   const [selectedVideo, setSelectedVideo] = useState<UploadedFile | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const pieData = generateChartData('pie');
//   const lineData = generateChartData('line');
//   const previousAlerts = generateAlerts(5);

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setSelectedFiles(Array.from(e.target.files));
//     }
//   };

//   const handleFolderSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setSelectedFiles(Array.from(e.target.files));
//     }
//   };

//   // const handleAnalyze = async () => {
//   //   if (selectedFiles.length === 0) return;

//   //   setIsUploading(true);
//   //   setUploadProgress(0);

//   //   try {
//   //     for (const file of selectedFiles) {
//   //       const formData = new FormData();
//   //       formData.append('video', file);

//   //       // Upload video
//   //       const uploadResponse = await fetch('http://localhost:3001/api/upload', {
//   //         method: 'POST',
//   //         body: formData,
//   //       });

//   //       if (!uploadResponse.ok) {
//   //         throw new Error('Upload failed');
//   //       }

//   //       const uploadResult = await uploadResponse.json();

//   //       // Get video summary
//   //       const summaryResponse = await fetch('http://localhost:3001/api/summarize', {
//   //         method: 'POST',
//   //         headers: {
//   //           'Content-Type': 'application/json',
//   //         },
//   //         body: JSON.stringify({ videoPath: uploadResult.filePath }),
//   //       });

//   //       const summary = await summaryResponse.json();

//   //       const newFile: UploadedFile = {
//   //         id: `upload-${Date.now()}`,
//   //         name: file.name,
//   //         size: file.size,
//   //         uploadedAt: new Date().toLocaleString(),
//   //         status: 'completed',
//   //         videoUrl: uploadResult.fileUrl,
//   //         insights: {
//   //           objects: summary.objectsDetected,
//   //           patterns: summary.suspiciousActivities.length,
//   //           events: summary.keyEvents.length,
//   //           duration: summary.duration,
//   //         },
//   //         summary: summary,
//   //       };

//   //       setUploadHistory((prev) => [newFile, ...prev].slice(0, 5));
//   //       setSelectedVideo(newFile);
//   //     }
//   //   } catch (error) {
//   //     console.error('Upload failed:', error);
//   //   } finally {
//   //     setIsUploading(false);
//   //     setUploadProgress(100);
//   //     setSelectedFiles([]);
//   //   }
//   // };

//   const handleAnalyze = async () => {
//   if (selectedFiles.length === 0) return;

//   setIsUploading(true);
//   setUploadProgress(0);

//   try {
//     for (const file of selectedFiles) {
//       const formData = new FormData();
//       formData.append('video', file);

//       // ✅ Use XMLHttpRequest to track upload progress
//       const uploadResult = await new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.open('POST', 'http://localhost:3001/api/upload', true);

//         xhr.upload.onprogress = (event) => {
//           if (event.lengthComputable) {
//             const percent = Math.round((event.loaded / event.total) * 100);
//             setUploadProgress(percent);
//           }
//         };

//         xhr.onload = () => {
//           if (xhr.status === 200) {
//             resolve(JSON.parse(xhr.responseText));
//           } else {
//             reject(new Error(`Upload failed: ${xhr.status}`));
//           }
//         };

//         xhr.onerror = () => reject(new Error('Upload error'));
//         xhr.send(formData);
//       });

//       // ✅ Get video summary
//       const summaryResponse = await fetch('http://localhost:3001/api/summarize', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ videoPath: uploadResult.filePath }),
//       });

//       const summaryData = await summaryResponse.json();
//       const summary = summaryData.summary; // ✅ FIXED: Extract actual summary object

//       const newFile: UploadedFile = {
//         id: `upload-${Date.now()}`,
//         name: file.name,
//         size: file.size,
//         uploadedAt: new Date().toLocaleString(),
//         status: 'completed',
//         videoUrl: uploadResult.fileUrl,
//         insights: {
//           objects: summary.objectsDetected,
//           patterns: summary.suspiciousActivities.length,
//           events: summary.keyEvents.length,
//           duration: summary.duration,
//         },
//         summary: summary,
//       };

//       setUploadHistory((prev) => [newFile, ...prev].slice(0, 5));
//       setSelectedVideo(newFile);
//     }
//   } catch (error) {
//     console.error('Upload failed:', error);
//     alert('Upload failed. Please try again.');
//   } finally {
//     setIsUploading(false);
//     setUploadProgress(100);
//     setSelectedFiles([]);
//   }
// };


//   const handleVideoSelect = (file: UploadedFile) => {
//     setSelectedVideo(file);
//     setIsPlaying(false);
//   };

//   const togglePlay = () => {
//     setIsPlaying(!isPlaying);
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
//       <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-heading text-neonBlue mb-2">Video Analysis & Insights</h1>
//         <p className="text-textPrimary/70">Upload surveillance footage for AI-powered threat detection</p>
//       </motion.div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Upload Center - Left Side */}
//         <motion.div
//           className="glass-effect rounded-xl p-8 space-y-6"
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//         >
//           <h2 className="text-2xl font-heading text-neonBlue mb-4">Upload Center</h2>

//           <div className="border-2 border-dashed border-neonBlue/30 rounded-xl p-8 text-center hover:border-neonBlue/60 transition-all glow-on-hover">
//             <Upload className="w-16 h-16 text-neonBlue mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-textPrimary mb-2">Single File Upload</h3>
//             <p className="text-textPrimary/70 mb-4">MP4, AVI, MOV supported</p>
//             <label className="cursor-pointer">
//               <input
//                 type="file"
//                 accept="video/*"
//                 onChange={handleFileSelect}
//                 className="hidden"
//                 multiple
//               />
//               <span className="inline-block px-6 py-3 bg-neonBlue text-navy font-semibold rounded-lg hover:bg-neonBlue/80 transition-all neon-glow">
//                 Select Files
//               </span>
//             </label>
//           </div>

//           <div className="border-2 border-dashed border-neonBlue/30 rounded-xl p-8 text-center hover:border-neonBlue/60 transition-all glow-on-hover">
//             <Folder className="w-16 h-16 text-neonBlue mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-textPrimary mb-2">Folder Upload</h3>
//             <p className="text-textPrimary/70 mb-4">Batch process multiple files</p>
//             <label className="cursor-pointer">
//               <input
//                 type="file"
//                 onChange={handleFolderSelect}
//                 className="hidden"
//                 webkitdirectory="true"
//                 multiple
//               />
//               <span className="inline-block px-6 py-3 bg-neonBlue text-navy font-semibold rounded-lg hover:bg-neonBlue/80 transition-all neon-glow">
//                 Select Folder
//               </span>
//             </label>
//           </div>

//           {selectedFiles.length > 0 && (
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//               <div className="bg-steel/50 rounded-lg p-4 mb-4">
//                 <p className="text-textPrimary font-semibold mb-2">
//                   {selectedFiles.length} file(s) selected
//                 </p>
//                 <div className="space-y-1 max-h-32 overflow-y-auto">
//                   {selectedFiles.map((file, index) => (
//                     <div key={index} className="text-sm text-textPrimary/70 flex items-center">
//                       <FileVideo className="w-4 h-4 mr-2" />
//                       {file.name}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {isUploading && (
//                 <div className="mb-4">
//                   <div className="flex justify-between text-sm text-textPrimary mb-2">
//                     <span>Processing...</span>
//                     <span>{uploadProgress}%</span>
//                   </div>
//                   <div className="w-full bg-steel rounded-full h-2 overflow-hidden">
//                     <motion.div
//                       className="h-full bg-neonBlue neon-glow"
//                       initial={{ width: 0 }}
//                       animate={{ width: `${uploadProgress}%` }}
//                     />
//                   </div>
//                 </div>
//               )}

//               <button
//                 onClick={handleAnalyze}
//                 disabled={isUploading}
//                 className="w-full px-6 py-4 bg-neonBlue text-navy font-heading text-lg rounded-lg hover:bg-neonBlue/80 transition-all neon-glow-strong disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isUploading ? 'ANALYZING...' : 'ANALYZE'}
//               </button>
//             </motion.div>
//           )}
//         </motion.div>

//         {/* Video Player & Summary - Right Side */}
//         <motion.div
//           className="glass-effect rounded-xl p-8 space-y-6"
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//         >
//           <h2 className="text-2xl font-heading text-neonBlue mb-4">Video Analysis</h2>
          
//           {selectedVideo ? (
//             <div className="space-y-6">
//               {/* Video Player */}
//               <div className="bg-black rounded-lg overflow-hidden">
//                 <div className="relative">
//                   <video
//                     src={selectedVideo.videoUrl}
//                     className="w-full h-auto max-h-96"
//                     controls
//                     onPlay={() => setIsPlaying(true)}
//                     onPause={() => setIsPlaying(false)}
//                   />
//                   <div className="absolute bottom-4 left-4">
//                     <button
//                       onClick={togglePlay}
//                       className="px-4 py-2 bg-neonBlue text-navy rounded-lg flex items-center space-x-2 neon-glow"
//                     >
//                       {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
//                       <span>{isPlaying ? 'Pause' : 'Play'}</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Video Summary */}
//               <div className="bg-steel/50 rounded-lg p-6">
//                 <h3 className="text-xl font-heading text-neonBlue mb-4">Analysis Summary</h3>
                
//                 {selectedVideo.summary && (
//                   <div className="space-y-4">
//                     <div className="grid grid-cols-2 gap-4 mb-4">
//                       <div className="text-center p-3 bg-navy/50 rounded-lg">
//                         <p className="text-2xl font-bold text-neonBlue">{selectedVideo.insights.objects}</p>
//                         <p className="text-sm text-textPrimary/70">Objects Detected</p>
//                       </div>
//                       <div className="text-center p-3 bg-navy/50 rounded-lg">
//                         <p className="text-2xl font-bold text-neonBlue">{selectedVideo.insights.events}</p>
//                         <p className="text-sm text-textPrimary/70">Key Events</p>
//                       </div>
//                     </div>

//                     <div className="space-y-3">
//                       <div>
//                         <h4 className="font-semibold text-textPrimary mb-2 flex items-center">
//                           <AlertTriangle className="w-4 h-4 text-alertRed mr-2" />
//                           Suspicious Activities
//                         </h4>
//                         <ul className="list-disc list-inside text-textPrimary/70 text-sm space-y-1">
//                           {selectedVideo.summary.suspiciousActivities.map((activity, index) => (
//                             <li key={index}>{activity}</li>
//                           ))}
//                         </ul>
//                       </div>

//                       <div>
//                         <h4 className="font-semibold text-textPrimary mb-2 flex items-center">
//                           <Clock className="w-4 h-4 text-neonBlue mr-2" />
//                           Timestamp Highlights
//                         </h4>
//                         <ul className="list-disc list-inside text-textPrimary/70 text-sm space-y-1">
//                           {selectedVideo.summary.timestampHighlights.map((highlight, index) => (
//                             <li key={index}>{highlight}</li>
//                           ))}
//                         </ul>
//                       </div>

//                       <div>
//                         <h4 className="font-semibold text-textPrimary mb-2 flex items-center">
//                           <Activity className="w-4 h-4 text-neonBlue mr-2" />
//                           Key Events
//                         </h4>
//                         <ul className="list-disc list-inside text-textPrimary/70 text-sm space-y-1">
//                           {selectedVideo.summary.keyEvents.map((event, index) => (
//                             <li key={index}>{event}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <div className="text-center py-12 text-textPrimary/50">
//               <FileVideo className="w-16 h-16 mx-auto mb-4 opacity-30" />
//               <p>No video selected for analysis</p>
//               <p className="text-sm mt-2">Upload and analyze a video to see the results here</p>
//             </div>
//           )}
//         </motion.div>
//       </div>

//       {/* Upload History Section */}
//       <motion.div
//         className="glass-effect rounded-xl p-6"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <h2 className="text-xl font-heading text-neonBlue mb-4">Upload History</h2>
//         {uploadHistory.length === 0 ? (
//           <div className="text-center py-8 text-textPrimary/50">
//             <FileVideo className="w-12 h-12 mx-auto mb-3 opacity-30" />
//             <p>No uploads yet</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {uploadHistory.map((file) => (
//               <motion.div
//                 key={file.id}
//                 className={`bg-steel/50 rounded-lg p-4 hover:bg-steel/70 transition-all cursor-pointer border-2 ${
//                   selectedVideo?.id === file.id ? 'border-neonBlue' : 'border-transparent'
//                 }`}
//                 onClick={() => handleVideoSelect(file)}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//               >
//                 <div className="flex items-start justify-between mb-2">
//                   <h3 className="font-semibold text-textPrimary text-sm truncate">{file.name}</h3>
//                   <span className="text-xs px-2 py-1 bg-successGreen/20 text-successGreen rounded">
//                     {file.status}
//                   </span>
//                 </div>
//                 <p className="text-xs text-textPrimary/70 mb-3">{file.uploadedAt}</p>
//                 {file.insights && (
//                   <div className="grid grid-cols-2 gap-2 text-xs">
//                     <div className="flex items-center">
//                       <Eye className="w-3 h-3 text-neonBlue mr-1" />
//                       <span className="text-textPrimary/70">{file.insights.objects} objects</span>
//                     </div>
//                     <div className="flex items-center">
//                       <Activity className="w-3 h-3 text-neonBlue mr-1" />
//                       <span className="text-textPrimary/70">{file.insights.patterns} patterns</span>
//                     </div>
//                     <div className="flex items-center">
//                       <AlertTriangle className="w-3 h-3 text-alertRed mr-1" />
//                       <span className="text-textPrimary/70">{file.insights.events} events</span>
//                     </div>
//                     <div className="flex items-center">
//                       <Clock className="w-3 h-3 text-neonBlue mr-1" />
//                       <span className="text-textPrimary/70">{file.insights.duration}</span>
//                     </div>
//                   </div>
//                 )}
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </motion.div>

//       {/* Rest of the components remain the same */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <InsightCard
//           title="Detected Objects"
//           count={142}
//           icon={Eye}
//           description="AI-identified objects with confidence scores"
//           trend="up"
//         />
//         <InsightCard
//           title="Behavioral Patterns"
//           count={38}
//           icon={Activity}
//           description="Suspicious activities flagged by behavior analysis"
//           trend="stable"
//         />
//         <InsightCard
//           title="Critical Events"
//           count={12}
//           icon={AlertTriangle}
//           description="High-priority security events requiring attention"
//           trend="down"
//         />
//         <InsightCard
//           title="Timestamp Highlights"
//           count={27}
//           icon={Clock}
//           description="Key moments with elevated threat levels"
//           trend="stable"
//         />
//       </div>

//       {/* Charts and alerts sections remain the same */}
//       {/* ... */}
//     </div>
//   );
// }




// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Upload, Folder, Eye, Activity, AlertTriangle, Clock, FileVideo, Download, Play, Pause, X, Trash2 } from 'lucide-react';
// import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
// import InsightCard from '../components/InsightCard';
// import { generateChartData, generateAlerts } from '../utils/dataGenerator';
// import { UploadedFile } from '../types';

// interface VideoSummary {
//   duration: string;
//   objectsDetected: number;
//   keyEvents: string[];
//   suspiciousActivities: string[];
//   timestampHighlights: string[];
// }

// interface DetectedFrame {
//   id: string;
//   videoId: string;
//   timestamp: string;
//   imageUrl: string;
//   objects: string[];
//   confidence: number;
// }

// export default function VideoUploadPage() {
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadHistory, setUploadHistory] = useState<UploadedFile[]>([]);
//   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
//   const [selectedVideo, setSelectedVideo] = useState<UploadedFile | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [detectedFrames, setDetectedFrames] = useState<DetectedFrame[]>([]);

//   const pieData = generateChartData('pie');
//   const lineData = generateChartData('line');
//   const previousAlerts = generateAlerts(5);

//   // Load data from localStorage on component mount
//   useEffect(() => {
//     const savedHistory = localStorage.getItem('uploadHistory');
//     const savedFrames = localStorage.getItem('detectedFrames');
    
//     if (savedHistory) {
//       setUploadHistory(JSON.parse(savedHistory));
//     }
//     if (savedFrames) {
//       setDetectedFrames(JSON.parse(savedFrames));
//     }
//   }, []);

//   // Save to localStorage whenever data changes
//   useEffect(() => {
//     localStorage.setItem('uploadHistory', JSON.stringify(uploadHistory));
//   }, [uploadHistory]);

//   useEffect(() => {
//     localStorage.setItem('detectedFrames', JSON.stringify(detectedFrames));
//   }, [detectedFrames]);

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setSelectedFiles(Array.from(e.target.files));
//     }
//   };

//   const handleFolderSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setSelectedFiles(Array.from(e.target.files));
//     }
//   };

//   const clearSelectedFiles = () => {
//     setSelectedFiles([]);
//   };

//   // Generate random frames for a video
//   const generateRandomFrames = (videoId: string, videoName: string) => {
//     const frameCount = Math.floor(Math.random() * 4) + 6; // 6-9 frames
//     const objectsList = ['Person', 'Vehicle', 'Animal', 'Package', 'Face', 'License Plate', 'Weapon', 'Backpack'];
    
//     return Array.from({ length: frameCount }, (_, index) => ({
//       id: `frame-${videoId}-${index}`,
//       videoId: videoId,
//       timestamp: `${Math.floor(Math.random() * 10)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
//       imageUrl: `https://picsum.photos/300/200?random=${Math.floor(Math.random() * 1000)}&video=${videoName}`,
//       objects: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => 
//         objectsList[Math.floor(Math.random() * objectsList.length)]
//       ),
//       confidence: Math.random() * 0.3 + 0.7 // 0.7-1.0
//     }));
//   };

//   const handleAnalyze = async () => {
//     if (selectedFiles.length === 0) return;

//     setIsUploading(true);
//     setUploadProgress(0);

//     try {
//       for (const file of selectedFiles) {
//         const formData = new FormData();
//         formData.append('video', file);

//         // Upload video
//         const uploadResponse = await fetch('http://localhost:3001/api/upload', {
//           method: 'POST',
//           body: formData,
//         });

//         if (!uploadResponse.ok) {
//           throw new Error('Upload failed');
//         }

//         const uploadResult = await uploadResponse.json();

//         // Get video summary
//         const summaryResponse = await fetch('http://localhost:3001/api/summarize', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ videoPath: uploadResult.filePath }),
//         });

//         const summaryData = await summaryResponse.json();
//         const summary = summaryData.summary;

//         const newFile: UploadedFile = {
//           id: `upload-${Date.now()}`,
//           name: file.name,
//           size: file.size,
//           uploadedAt: new Date().toLocaleString('en-US', {
//             month: 'numeric',
//             day: 'numeric',
//             year: 'numeric',
//             hour: 'numeric',
//             minute: 'numeric',
//             hour12: true
//           }),
//           status: 'completed',
//           videoUrl: uploadResult.fileUrl,
//           insights: {
//             objects: summary.objectsDetected,
//             patterns: summary.suspiciousActivities.length,
//             events: summary.keyEvents.length,
//             duration: summary.duration,
//           },
//           summary: summary,
//         };

//         // Generate frames for the new video
//         const newFrames = generateRandomFrames(newFile.id, newFile.name);
        
//         setUploadHistory((prev) => [newFile, ...prev]);
//         setDetectedFrames((prev) => [...newFrames, ...prev]);
//         setSelectedVideo(newFile);
//       }
//     } catch (error) {
//       console.error('Upload failed:', error);
//       // Fallback to mock data if backend is not available
//       const mockFiles: UploadedFile[] = selectedFiles.map((file, index) => {
//         const mockFile: UploadedFile = {
//           id: `upload-${Date.now()}-${index}`,
//           name: file.name,
//           size: file.size,
//           uploadedAt: new Date().toLocaleString('en-US', {
//             month: 'numeric',
//             day: 'numeric',
//             year: 'numeric',
//             hour: 'numeric',
//             minute: 'numeric',
//             hour12: true
//           }),
//           status: 'completed',
//           videoUrl: URL.createObjectURL(file),
//           insights: {
//             objects: Math.floor(Math.random() * 50 + 10),
//             patterns: Math.floor(Math.random() * 20 + 5),
//             events: Math.floor(Math.random() * 15 + 3),
//             duration: `${Math.floor(Math.random() * 10 + 1)}m ${Math.floor(Math.random() * 60)}s`,
//           },
//           summary: {
//             duration: `${Math.floor(Math.random() * 10 + 1)}m ${Math.floor(Math.random() * 60)}s`,
//             objectsDetected: Math.floor(Math.random() * 50 + 10),
//             keyEvents: [
//               "Person detected at 00:01:23",
//               "Vehicle movement at 00:02:45",
//               "Unusual activity at 00:04:12"
//             ],
//             suspiciousActivities: [
//               "Rapid movement in restricted area",
//               "Loitering near entrance"
//             ],
//             timestampHighlights: [
//               "00:01:15 - Person enters frame",
//               "00:02:30 - Vehicle approaches"
//             ]
//           }
//         };

//         // Generate frames for mock file
//         const newFrames = generateRandomFrames(mockFile.id, mockFile.name);
//         setDetectedFrames((prev) => [...newFrames, ...prev]);

//         return mockFile;
//       });

//       setUploadHistory((prev) => [...mockFiles, ...prev]);
//       setSelectedVideo(mockFiles[0]);
//     } finally {
//       setIsUploading(false);
//       setUploadProgress(100);
//       setSelectedFiles([]);
//     }
//   };

//   const handleVideoSelect = (file: UploadedFile) => {
//     setSelectedVideo(file);
//     setIsPlaying(false);
//   };

//   const togglePlay = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const deleteVideo = (videoId: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setUploadHistory(prev => prev.filter(file => file.id !== videoId));
//     setDetectedFrames(prev => prev.filter(frame => frame.videoId !== videoId));
//     if (selectedVideo?.id === videoId) {
//       setSelectedVideo(null);
//     }
//   };

//   const getVideoFrames = (videoId: string) => {
//     return detectedFrames.filter(frame => frame.videoId === videoId);
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
//       <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-4xl font-heading text-neonBlue mb-2">Video Analysis & Insights</h1>
//         <p className="text-textPrimary/70">Upload surveillance footage for AI-powered threat detection</p>
//       </motion.div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Upload Center - Left Side */}
//         <motion.div
//           className="glass-effect rounded-xl p-8 space-y-6"
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//         >
//           <h2 className="text-2xl font-heading text-neonBlue mb-4">Upload Center</h2>

//           {/* Combined Upload Section */}
//           <div className="border-2 border-dashed border-neonBlue/30 rounded-xl p-8 text-center hover:border-neonBlue/60 transition-all glow-on-hover">
//             <div className="flex justify-center space-x-4 mb-4">
//               <Upload className="w-12 h-12 text-neonBlue" />
//               <Folder className="w-12 h-12 text-neonBlue" />
//             </div>
//             <h3 className="text-xl font-semibold text-textPrimary mb-2">Upload Files or Folder</h3>
//             <p className="text-textPrimary/70 mb-6">MP4, AVI, MOV supported | Batch process multiple files</p>
            
//             <div className="flex justify-center space-x-4">
//               <label className="cursor-pointer">
//                 <input
//                   type="file"
//                   onChange={handleFolderSelect}
//                   className="hidden"
//                   webkitdirectory="true"
//                   multiple
//                 />
//                 <span className="inline-block px-6 py-3 bg-neonBlue/20 text-neonBlue font-semibold rounded-lg hover:bg-neonBlue/30 transition-all border-2 border-neonBlue/50">
//                   Select Folder
//                 </span>
//               </label>
              
//               <label className="cursor-pointer">
//                 <input
//                   type="file"
//                   accept="video/*"
//                   onChange={handleFileSelect}
//                   className="hidden"
//                   multiple
//                 />
//                 <span className="inline-block px-6 py-3 bg-neonBlue text-navy font-semibold rounded-lg hover:bg-neonBlue/80 transition-all neon-glow">
//                   Select Files
//                 </span>
//               </label>
//             </div>
//           </div>

//           {/* Selected Files Section */}
//           {selectedFiles.length > 0 && (
//             <motion.div 
//               className="bg-steel/50 rounded-xl p-6 space-y-4"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//             >
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="text-textPrimary font-semibold">
//                     {selectedFiles.length} file(s) selected
//                   </p>
//                   <p className="text-textPrimary/70 text-sm">
//                     Total size: {(selectedFiles.reduce((acc, file) => acc + file.size, 0) / (1024 * 1024)).toFixed(2)} MB
//                   </p>
//                 </div>
//                 <button
//                   onClick={clearSelectedFiles}
//                   className="p-2 text-alertRed hover:bg-alertRed/20 rounded-lg transition-all"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>

//               <div className="space-y-2 max-h-40 overflow-y-auto">
//                 {selectedFiles.map((file, index) => (
//                   <div key={index} className="flex items-center justify-between p-3 bg-navy/30 rounded-lg">
//                     <div className="flex items-center space-x-3">
//                       <FileVideo className="w-5 h-5 text-neonBlue" />
//                       <div>
//                         <p className="text-textPrimary text-sm font-medium">{file.name}</p>
//                         <p className="text-textPrimary/70 text-xs">
//                           {(file.size / (1024 * 1024)).toFixed(2)} MB
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Analysis Description */}
//               <div className="bg-navy/40 rounded-lg p-4">
//                 <p className="text-textPrimary text-sm">
//                   <strong>Analysis Description</strong>
//                 </p>
//                 <p className="text-textPrimary/70 text-sm">
//                   Selected {selectedFiles.length} file(s) – {selectedFiles.length} video(s) | Total size: {(selectedFiles.reduce((acc, file) => acc + file.size, 0) / (1024 * 1024)).toFixed(2)} MB. Ready for analysis.
//                 </p>
//               </div>

//               {isUploading && (
//                 <div className="space-y-2">
//                   <div className="flex justify-between text-sm text-textPrimary">
//                     <span>Processing...</span>
//                     <span>{uploadProgress}%</span>
//                   </div>
//                   <div className="w-full bg-steel rounded-full h-2 overflow-hidden">
//                     <motion.div
//                       className="h-full bg-neonBlue neon-glow"
//                       initial={{ width: 0 }}
//                       animate={{ width: `${uploadProgress}%` }}
//                     />
//                   </div>
//                 </div>
//               )}

//               <button
//                 onClick={handleAnalyze}
//                 disabled={isUploading}
//                 className="w-full px-6 py-4 bg-neonBlue text-navy font-heading text-lg rounded-lg hover:bg-neonBlue/80 transition-all neon-glow-strong disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isUploading ? 'ANALYZING...' : 'ANALYZE CONTENT'}
//               </button>
//             </motion.div>
//           )}
//         </motion.div>

//         {/* Video Player & Summary - Right Side */}
//         <motion.div
//           className="glass-effect rounded-xl p-8 space-y-6"
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//         >
//           <h2 className="text-2xl font-heading text-neonBlue mb-4">Video Analysis</h2>
          
//           {selectedVideo ? (
//             <div className="space-y-6">
//               {/* Video Player */}
//               <div className="bg-black rounded-lg overflow-hidden">
//                 <div className="relative">
//                   <video
//                     src={selectedVideo.videoUrl}
//                     className="w-full h-auto max-h-96"
//                     controls
//                     onPlay={() => setIsPlaying(true)}
//                     onPause={() => setIsPlaying(false)}
//                   />
//                   <div className="absolute bottom-4 left-4">
//                     <button
//                       onClick={togglePlay}
//                       className="px-4 py-2 bg-neonBlue text-navy rounded-lg flex items-center space-x-2 neon-glow"
//                     >
//                       {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
//                       <span>{isPlaying ? 'Pause' : 'Play'}</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Video Summary */}
//               <div className="bg-steel/50 rounded-lg p-6">
//                 <h3 className="text-xl font-heading text-neonBlue mb-4">Analysis Summary</h3>
                
//                 {selectedVideo.summary && (
//                   <div className="space-y-4">
//                     <div className="grid grid-cols-2 gap-4 mb-4">
//                       <div className="text-center p-3 bg-navy/50 rounded-lg">
//                         <p className="text-2xl font-bold text-neonBlue">{selectedVideo.insights.objects}</p>
//                         <p className="text-sm text-textPrimary/70">Objects Detected</p>
//                       </div>
//                       <div className="text-center p-3 bg-navy/50 rounded-lg">
//                         <p className="text-2xl font-bold text-neonBlue">{selectedVideo.insights.events}</p>
//                         <p className="text-sm text-textPrimary/70">Key Events</p>
//                       </div>
//                     </div>

//                     <div className="space-y-3">
//                       <div>
//                         <h4 className="font-semibold text-textPrimary mb-2 flex items-center">
//                           <AlertTriangle className="w-4 h-4 text-alertRed mr-2" />
//                           Suspicious Activities
//                         </h4>
//                         <ul className="list-disc list-inside text-textPrimary/70 text-sm space-y-1">
//                           {selectedVideo.summary.suspiciousActivities.map((activity, index) => (
//                             <li key={index}>{activity}</li>
//                           ))}
//                         </ul>
//                       </div>

//                       <div>
//                         <h4 className="font-semibold text-textPrimary mb-2 flex items-center">
//                           <Clock className="w-4 h-4 text-neonBlue mr-2" />
//                           Timestamp Highlights
//                         </h4>
//                         <ul className="list-disc list-inside text-textPrimary/70 text-sm space-y-1">
//                           {selectedVideo.summary.timestampHighlights.map((highlight, index) => (
//                             <li key={index}>{highlight}</li>
//                           ))}
//                         </ul>
//                       </div>

//                       <div>
//                         <h4 className="font-semibold text-textPrimary mb-2 flex items-center">
//                           <Activity className="w-4 h-4 text-neonBlue mr-2" />
//                           Key Events
//                         </h4>
//                         <ul className="list-disc list-inside text-textPrimary/70 text-sm space-y-1">
//                           {selectedVideo.summary.keyEvents.map((event, index) => (
//                             <li key={index}>{event}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <div className="text-center py-12 text-textPrimary/50">
//               <FileVideo className="w-16 h-16 mx-auto mb-4 opacity-30" />
//               <p>No video selected for analysis</p>
//               <p className="text-sm mt-2">Upload and analyze a video to see the results here</p>
//             </div>
//           )}
//         </motion.div>
//       </div>

//       {/* Upload History Section */}
//       <motion.div
//         className="glass-effect rounded-xl p-6"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <h2 className="text-xl font-heading text-neonBlue mb-4">Upload History</h2>
//         {uploadHistory.length === 0 ? (
//           <div className="text-center py-8 text-textPrimary/50">
//             <FileVideo className="w-12 h-12 mx-auto mb-3 opacity-30" />
//             <p>No uploads yet</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {uploadHistory.map((file) => (
//               <motion.div
//                 key={file.id}
//                 className={`bg-steel/50 rounded-lg p-4 hover:bg-steel/70 transition-all cursor-pointer border-2 ${
//                   selectedVideo?.id === file.id ? 'border-neonBlue' : 'border-transparent'
//                 } relative group`}
//                 onClick={() => handleVideoSelect(file)}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//               >
//                 <button
//                   onClick={(e) => deleteVideo(file.id, e)}
//                   className="absolute -top-2 -right-2 p-1 bg-alertRed text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
//                 >
//                   <Trash2 className="w-3 h-3" />
//                 </button>
                
//                 <div className="flex items-start justify-between mb-2">
//                   <h3 className="font-semibold text-textPrimary text-sm truncate flex-1 mr-2">{file.name}</h3>
//                   <span className="text-xs px-2 py-1 bg-successGreen/20 text-successGreen rounded flex-shrink-0">
//                     {file.status}
//                   </span>
//                 </div>
//                 <p className="text-xs text-textPrimary/70 mb-3">{file.uploadedAt}</p>
//                 {file.insights && (
//                   <div className="grid grid-cols-2 gap-2 text-xs">
//                     <div className="flex items-center">
//                       <Eye className="w-3 h-3 text-neonBlue mr-1" />
//                       <span className="text-textPrimary/70">{file.insights.objects} objects</span>
//                     </div>
//                     <div className="flex items-center">
//                       <Activity className="w-3 h-3 text-neonBlue mr-1" />
//                       <span className="text-textPrimary/70">{file.insights.patterns} patterns</span>
//                     </div>
//                     <div className="flex items-center">
//                       <AlertTriangle className="w-3 h-3 text-alertRed mr-1" />
//                       <span className="text-textPrimary/70">{file.insights.events} events</span>
//                     </div>
//                     <div className="flex items-center">
//                       <Clock className="w-3 h-3 text-neonBlue mr-1" />
//                       <span className="text-textPrimary/70">{file.insights.duration}</span>
//                     </div>
//                   </div>
//                 )}
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </motion.div>

//       {/* Detected Frames Section */}
//       {selectedVideo && (
//         <motion.div
//           className="glass-effect rounded-xl p-6"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-heading text-neonBlue">Detected Frames - {selectedVideo.name}</h2>
//             <span className="text-textPrimary/70 text-sm">
//               {getVideoFrames(selectedVideo.id).length} frames detected
//             </span>
//           </div>
          
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
//             {getVideoFrames(selectedVideo.id).map((frame) => (
//               <motion.div
//                 key={frame.id}
//                 className="bg-steel/50 rounded-lg overflow-hidden hover:bg-steel/70 transition-all group"
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//               >
//                 <div className="relative">
//                   <img
//                     src={frame.imageUrl}
//                     alt={`Frame at ${frame.timestamp}`}
//                     className="w-full h-32 object-cover"
//                   />
//                   <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
//                     {frame.timestamp}
//                   </div>
//                   <div className="absolute top-2 right-2 bg-successGreen/90 text-white text-xs px-2 py-1 rounded">
//                     {(frame.confidence * 100).toFixed(0)}%
//                   </div>
//                 </div>
//                 <div className="p-3">
//                   <p className="text-textPrimary text-sm font-semibold mb-2">Detected Objects</p>
//                   <div className="flex flex-wrap gap-1">
//                     {frame.objects.map((object, index) => (
//                       <span
//                         key={index}
//                         className="text-xs bg-neonBlue/20 text-neonBlue px-2 py-1 rounded"
//                       >
//                         {object}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       )}

//       {/* Rest of the components */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <InsightCard
//           title="Detected Objects"
//           count={142}
//           icon={Eye}
//           description="AI-identified objects with confidence scores"
//           trend="up"
//         />
//         <InsightCard
//           title="Behavioral Patterns"
//           count={38}
//           icon={Activity}
//           description="Suspicious activities flagged by behavior analysis"
//           trend="stable"
//         />
//         <InsightCard
//           title="Critical Events"
//           count={12}
//           icon={AlertTriangle}
//           description="High-priority security events requiring attention"
//           trend="down"
//         />
//         <InsightCard
//           title="Timestamp Highlights"
//           count={27}
//           icon={Clock}
//           description="Key moments with elevated threat levels"
//           trend="stable"
//         />
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <motion.div
//           className="glass-effect rounded-xl p-6"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <h2 className="text-xl font-heading text-neonBlue mb-4">Detection Categories</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={pieData}
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={60}
//                 outerRadius={100}
//                 dataKey="value"
//                 label={(entry) => `${entry.name}: ${entry.value}`}
//               >
//                 {pieData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Pie>
//               <Tooltip contentStyle={{ backgroundColor: '#2E3B4E', border: '1px solid #00B4D8' }} />
//             </PieChart>
//           </ResponsiveContainer>
//         </motion.div>

//         <motion.div
//           className="glass-effect rounded-xl p-6"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <h2 className="text-xl font-heading text-neonBlue mb-4">Event Timeline</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={lineData}>
//               <XAxis dataKey="name" stroke="#E0E0E0" />
//               <YAxis stroke="#E0E0E0" />
//               <Tooltip contentStyle={{ backgroundColor: '#2E3B4E', border: '1px solid #00B4D8' }} />
//               <Line
//                 type="monotone"
//                 dataKey="value"
//                 stroke="#00B4D8"
//                 strokeWidth={3}
//                 dot={{ fill: '#00B4D8', r: 6 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </motion.div>
//       </div>

//       {/* Previous Alerts Section */}
//       <motion.div
//         className="glass-effect rounded-xl p-6"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl font-heading text-neonBlue">Previous Alerts</h2>
//           <button className="px-4 py-2 bg-neonBlue/20 text-neonBlue rounded-lg hover:bg-neonBlue/30 transition-all flex items-center space-x-2">
//             <Download className="w-4 h-4" />
//             <span>Export History</span>
//           </button>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-neonBlue/20">
//                 <th className="text-left py-3 px-4 text-textPrimary font-semibold">Alert Type</th>
//                 <th className="text-left py-3 px-4 text-textPrimary font-semibold">Source</th>
//                 <th className="text-left py-3 px-4 text-textPrimary font-semibold">Time</th>
//                 <th className="text-left py-3 px-4 text-textPrimary font-semibold">Severity</th>
//               </tr>
//             </thead>
//             <tbody>
//               {previousAlerts.map((alert) => (
//                 <tr key={alert.id} className="border-b border-steel hover:bg-steel/30 transition-all">
//                   <td className="py-3 px-4 text-textPrimary">{alert.type}</td>
//                   <td className="py-3 px-4 text-textPrimary">{alert.source}</td>
//                   <td className="py-3 px-4 text-textPrimary">{alert.time}</td>
//                   <td className="py-3 px-4">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                         alert.severity === 'critical'
//                           ? 'bg-alertRed/20 text-alertRed'
//                           : alert.severity === 'high'
//                           ? 'bg-orange-500/20 text-orange-500'
//                           : alert.severity === 'medium'
//                           ? 'bg-yellow-500/20 text-yellow-500'
//                           : 'bg-neonBlue/20 text-neonBlue'
//                       }`}
//                     >
//                       {alert.severity.toUpperCase()}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </motion.div>
//     </div>
//   );
// }



import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Folder, Eye, Activity, AlertTriangle, Clock, FileVideo, Download, Play, Pause, X, Trash2 } from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import InsightCard from '../components/InsightCard';
import { generateChartData, generateAlerts } from '../utils/dataGenerator';
import { UploadedFile } from '../types';

interface VideoSummary {
  duration: string;
  objectsDetected: number;
  keyEvents: string[];
  suspiciousActivities: string[];
  timestampHighlights: string[];
}

interface DetectedFrame {
  id: string;
  videoId: string;
  timestamp: string;
  imageUrl: string;
  objects: string[];
  confidence: number;
}

export default function VideoUploadPage() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadHistory, setUploadHistory] = useState<UploadedFile[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<UploadedFile | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [detectedFrames, setDetectedFrames] = useState<DetectedFrame[]>([]);

  const pieData = generateChartData('pie');
  const lineData = generateChartData('line');
  const previousAlerts = generateAlerts(5);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('uploadHistory');
    const savedFrames = localStorage.getItem('detectedFrames');
    
    if (savedHistory) {
      setUploadHistory(JSON.parse(savedHistory));
    }
    if (savedFrames) {
      setDetectedFrames(JSON.parse(savedFrames));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('uploadHistory', JSON.stringify(uploadHistory));
  }, [uploadHistory]);

  useEffect(() => {
    localStorage.setItem('detectedFrames', JSON.stringify(detectedFrames));
  }, [detectedFrames]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleFolderSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const clearSelectedFiles = () => {
    setSelectedFiles([]);
  };

  // Generate random frames for a video
  const generateRandomFrames = (videoId: string, videoName: string) => {
    const frameCount = 3; // Only 3 frames as requested
    const objectsList = ['Person', 'Vehicle', 'Animal', 'Package', 'Face', 'License Plate', 'Weapon', 'Backpack'];
    
    return Array.from({ length: frameCount }, (_, index) => ({
      id: `frame-${videoId}-${index}`,
      videoId: videoId,
      timestamp: `${Math.floor(Math.random() * 10)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      imageUrl: `https://picsum.photos/400/250?random=${Math.floor(Math.random() * 1000)}&video=${videoName}`,
      objects: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => 
        objectsList[Math.floor(Math.random() * objectsList.length)]
      ),
      confidence: Math.random() * 0.3 + 0.7 // 0.7-1.0
    }));
  };

  const handleAnalyze = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append('video', file);

        // Upload video
        const uploadResponse = await fetch('http://localhost:3001/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error('Upload failed');
        }

        const uploadResult = await uploadResponse.json();

        // Get video summary
        const summaryResponse = await fetch('http://localhost:3001/api/summarize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ videoPath: uploadResult.filePath }),
        });

        const summaryData = await summaryResponse.json();
        const summary = summaryData.summary;

        const newFile: UploadedFile = {
          id: `upload-${Date.now()}`,
          name: file.name,
          size: file.size,
          uploadedAt: new Date().toLocaleString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          }),
          status: 'completed',
          videoUrl: uploadResult.fileUrl,
          insights: {
            objects: summary.objectsDetected,
            patterns: summary.suspiciousActivities.length,
            events: summary.keyEvents.length,
            duration: summary.duration,
          },
          summary: summary,
        };

        // Generate frames for the new video
        const newFrames = generateRandomFrames(newFile.id, newFile.name);
        
        setUploadHistory((prev) => [newFile, ...prev]);
        setDetectedFrames((prev) => [...newFrames, ...prev]);
        setSelectedVideo(newFile);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      // Fallback to mock data if backend is not available
      const mockFiles: UploadedFile[] = selectedFiles.map((file, index) => {
        const mockFile: UploadedFile = {
          id: `upload-${Date.now()}-${index}`,
          name: file.name,
          size: file.size,
          uploadedAt: new Date().toLocaleString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          }),
          status: 'completed',
          videoUrl: URL.createObjectURL(file),
          insights: {
            objects: Math.floor(Math.random() * 50 + 10),
            patterns: Math.floor(Math.random() * 20 + 5),
            events: Math.floor(Math.random() * 15 + 3),
            duration: `${Math.floor(Math.random() * 10 + 1)}m ${Math.floor(Math.random() * 60)}s`,
          },
          summary: {
            duration: `${Math.floor(Math.random() * 10 + 1)}m ${Math.floor(Math.random() * 60)}s`,
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
          }
        };

        // Generate frames for mock file
        const newFrames = generateRandomFrames(mockFile.id, mockFile.name);
        setDetectedFrames((prev) => [...newFrames, ...prev]);

        return mockFile;
      });

      setUploadHistory((prev) => [...mockFiles, ...prev]);
      setSelectedVideo(mockFiles[0]);
    } finally {
      setIsUploading(false);
      setUploadProgress(100);
      setSelectedFiles([]);
    }
  };

  const handleVideoSelect = (file: UploadedFile) => {
    setSelectedVideo(file);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const deleteVideo = (videoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadHistory(prev => prev.filter(file => file.id !== videoId));
    setDetectedFrames(prev => prev.filter(frame => frame.videoId !== videoId));
    if (selectedVideo?.id === videoId) {
      setSelectedVideo(null);
    }
  };

  const getVideoFrames = (videoId: string) => {
    return detectedFrames.filter(frame => frame.videoId === videoId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-heading text-neonBlue mb-2">Video Analysis & Insights</h1>
        <p className="text-textPrimary/70">Upload surveillance footage for AI-powered threat detection</p>
      </motion.div>

      {/* Full Screen Upload Section */}
      {!selectedVideo && (
        <motion.div
          className="glass-effect rounded-xl p-12 text-center border-2 border-dashed border-neonBlue/30 hover:border-neonBlue/60 transition-all glow-on-hover min-h-[400px] flex flex-col justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-center space-x-6 mb-8">
            <Upload className="w-20 h-20 text-neonBlue" />
            <Folder className="w-20 h-20 text-neonBlue" />
          </div>
          <h2 className="text-3xl font-heading text-neonBlue mb-4">Upload Video for Analysis</h2>
          <p className="text-textPrimary/70 text-lg mb-8 max-w-2xl mx-auto">
            MP4, AVI, MOV supported | Batch process multiple files | AI-powered threat detection and analysis
          </p>
          
          <div className="flex justify-center space-x-6 mb-8">
            <label className="cursor-pointer">
              <input
                type="file"
                onChange={handleFolderSelect}
                className="hidden"
                webkitdirectory="true"
                multiple
              />
              <span className="inline-block px-8 py-4 bg-neonBlue/20 text-neonBlue font-semibold rounded-lg hover:bg-neonBlue/30 transition-all border-2 border-neonBlue/50 text-lg">
                Select Folder
              </span>
            </label>
            
            <label className="cursor-pointer">
              <input
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
                multiple
              />
              <span className="inline-block px-8 py-4 bg-neonBlue text-navy font-semibold rounded-lg hover:bg-neonBlue/80 transition-all neon-glow text-lg">
                Select Files
              </span>
            </label>
          </div>

          {/* Selected Files Section */}
          {selectedFiles.length > 0 && (
            <motion.div 
              className="bg-steel/50 rounded-xl p-6 space-y-4 max-w-2xl w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-textPrimary font-semibold text-lg">
                    {selectedFiles.length} file(s) selected
                  </p>
                  <p className="text-textPrimary/70">
                    Total size: {(selectedFiles.reduce((acc, file) => acc + file.size, 0) / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={clearSelectedFiles}
                  className="p-2 text-alertRed hover:bg-alertRed/20 rounded-lg transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-3 max-h-48 overflow-y-auto">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-navy/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <FileVideo className="w-6 h-6 text-neonBlue" />
                      <div>
                        <p className="text-textPrimary font-medium">{file.name}</p>
                        <p className="text-textPrimary/70 text-sm">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {isUploading && (
                <div className="space-y-3">
                  <div className="flex justify-between text-textPrimary text-lg">
                    <span>Processing...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-steel rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="h-full bg-neonBlue neon-glow"
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <button
                onClick={handleAnalyze}
                disabled={isUploading}
                className="w-full px-8 py-4 bg-neonBlue text-navy font-heading text-xl rounded-lg hover:bg-neonBlue/80 transition-all neon-glow-strong disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {isUploading ? 'ANALYZING...' : 'ANALYZE CONTENT'}
              </button>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Video Analysis Section */}
      {selectedVideo && (
        <div className="space-y-8">
          {/* Video Player and Analysis Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video Player - Left Side (2/3 width) */}
            <motion.div
              className="lg:col-span-2 glass-effect rounded-xl p-6 space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-heading text-neonBlue mb-4">Video Analysis - {selectedVideo.name}</h2>
              
              {/* Large Video Player */}
              <div className="bg-black rounded-xl overflow-hidden">
                <div className="relative">
                  <video
                    src={selectedVideo.videoUrl}
                    className="w-full h-auto max-h-[500px]"
                    controls
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                  <div className="absolute bottom-6 left-6">
                    <button
                      onClick={togglePlay}
                      className="px-6 py-3 bg-neonBlue text-navy rounded-lg flex items-center space-x-3 neon-glow text-lg"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      <span className="font-semibold">{isPlaying ? 'Pause' : 'Play'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Detected Frames Below Video */}
              <div className="space-y-4">
                <h3 className="text-xl font-heading text-neonBlue">Detected Frames</h3>
                <div className="grid grid-cols-3 gap-4">
                  {getVideoFrames(selectedVideo.id).map((frame) => (
                    <motion.div
                      key={frame.id}
                      className="bg-steel/50 rounded-lg overflow-hidden hover:bg-steel/70 transition-all group"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="relative">
                        <img
                          src={frame.imageUrl}
                          alt={`Frame at ${frame.timestamp}`}
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {frame.timestamp}
                        </div>
                        <div className="absolute top-2 right-2 bg-successGreen/90 text-white text-xs px-2 py-1 rounded">
                          {(frame.confidence * 100).toFixed(0)}%
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-textPrimary text-sm font-semibold mb-2">Detected Objects</p>
                        <div className="flex flex-wrap gap-1">
                          {frame.objects.map((object, index) => (
                            <span
                              key={index}
                              className="text-xs bg-neonBlue/20 text-neonBlue px-2 py-1 rounded"
                            >
                              {object}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Session Summary - Right Side (1/3 width) */}
            <motion.div
              className="glass-effect rounded-xl p-6 space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-heading text-neonBlue mb-4">Session Summary</h2>
              
              {selectedVideo.summary && (
                <div className="space-y-6">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-navy/50 rounded-lg">
                      <p className="text-3xl font-bold text-neonBlue">{selectedVideo.insights.objects}</p>
                      <p className="text-sm text-textPrimary/70">Objects</p>
                    </div>
                    <div className="text-center p-4 bg-navy/50 rounded-lg">
                      <p className="text-3xl font-bold text-neonBlue">{selectedVideo.insights.events}</p>
                      <p className="text-sm text-textPrimary/70">Events</p>
                    </div>
                    <div className="text-center p-4 bg-navy/50 rounded-lg">
                      <p className="text-3xl font-bold text-neonBlue">{selectedVideo.insights.patterns}</p>
                      <p className="text-sm text-textPrimary/70">Patterns</p>
                    </div>
                    <div className="text-center p-4 bg-navy/50 rounded-lg">
                      <p className="text-lg font-bold text-neonBlue">{selectedVideo.insights.duration}</p>
                      <p className="text-sm text-textPrimary/70">Duration</p>
                    </div>
                  </div>

                  {/* Summary Sections */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-textPrimary mb-3 flex items-center">
                        <AlertTriangle className="w-5 h-5 text-alertRed mr-2" />
                        Suspicious Activities
                      </h4>
                      <ul className="list-disc list-inside text-textPrimary/70 text-sm space-y-2">
                        {selectedVideo.summary.suspiciousActivities.map((activity, index) => (
                          <li key={index}>{activity}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-textPrimary mb-3 flex items-center">
                        <Clock className="w-5 h-5 text-neonBlue mr-2" />
                        Timestamp Highlights
                      </h4>
                      <ul className="list-disc list-inside text-textPrimary/70 text-sm space-y-2">
                        {selectedVideo.summary.timestampHighlights.map((highlight, index) => (
                          <li key={index}>{highlight}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-textPrimary mb-3 flex items-center">
                        <Activity className="w-5 h-5 text-neonBlue mr-2" />
                        Key Events
                      </h4>
                      <ul className="list-disc list-inside text-textPrimary/70 text-sm space-y-2">
                        {selectedVideo.summary.keyEvents.map((event, index) => (
                          <li key={index}>{event}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Upload History Section */}
          <motion.div
            className="glass-effect rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-xl font-heading text-neonBlue mb-4">Upload History</h2>
            {uploadHistory.length === 0 ? (
              <div className="text-center py-8 text-textPrimary/50">
                <FileVideo className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No uploads yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {uploadHistory.map((file) => (
                  <motion.div
                    key={file.id}
                    className={`bg-steel/50 rounded-lg p-4 hover:bg-steel/70 transition-all cursor-pointer border-2 ${
                      selectedVideo?.id === file.id ? 'border-neonBlue' : 'border-transparent'
                    } relative group`}
                    onClick={() => handleVideoSelect(file)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <button
                      onClick={(e) => deleteVideo(file.id, e)}
                      className="absolute -top-2 -right-2 p-1 bg-alertRed text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-textPrimary text-sm truncate flex-1 mr-2">{file.name}</h3>
                      <span className="text-xs px-2 py-1 bg-successGreen/20 text-successGreen rounded flex-shrink-0">
                        {file.status}
                      </span>
                    </div>
                    <p className="text-xs text-textPrimary/70 mb-3">{file.uploadedAt}</p>
                    {file.insights && (
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center">
                          <Eye className="w-3 h-3 text-neonBlue mr-1" />
                          <span className="text-textPrimary/70">{file.insights.objects} objects</span>
                        </div>
                        <div className="flex items-center">
                          <Activity className="w-3 h-3 text-neonBlue mr-1" />
                          <span className="text-textPrimary/70">{file.insights.patterns} patterns</span>
                        </div>
                        <div className="flex items-center">
                          <AlertTriangle className="w-3 h-3 text-alertRed mr-1" />
                          <span className="text-textPrimary/70">{file.insights.events} events</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 text-neonBlue mr-1" />
                          <span className="text-textPrimary/70">{file.insights.duration}</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Rest of the components */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <InsightCard
          title="Detected Objects"
          count={142}
          icon={Eye}
          description="AI-identified objects with confidence scores"
          trend="up"
        />
        <InsightCard
          title="Behavioral Patterns"
          count={38}
          icon={Activity}
          description="Suspicious activities flagged by behavior analysis"
          trend="stable"
        />
        <InsightCard
          title="Critical Events"
          count={12}
          icon={AlertTriangle}
          description="High-priority security events requiring attention"
          trend="down"
        />
        <InsightCard
          title="Timestamp Highlights"
          count={27}
          icon={Clock}
          description="Key moments with elevated threat levels"
          trend="stable"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          className="glass-effect rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-heading text-neonBlue mb-4">Detection Categories</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                label={(entry) => `${entry.name}: ${entry.value}`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#2E3B4E', border: '1px solid #00B4D8' }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="glass-effect rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-heading text-neonBlue mb-4">Event Timeline</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis dataKey="name" stroke="#E0E0E0" />
              <YAxis stroke="#E0E0E0" />
              <Tooltip contentStyle={{ backgroundColor: '#2E3B4E', border: '1px solid #00B4D8' }} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#00B4D8"
                strokeWidth={3}
                dot={{ fill: '#00B4D8', r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Previous Alerts Section */}
      <motion.div
        className="glass-effect rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading text-neonBlue">Previous Alerts</h2>
          <button className="px-4 py-2 bg-neonBlue/20 text-neonBlue rounded-lg hover:bg-neonBlue/30 transition-all flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export History</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neonBlue/20">
                <th className="text-left py-3 px-4 text-textPrimary font-semibold">Alert Type</th>
                <th className="text-left py-3 px-4 text-textPrimary font-semibold">Source</th>
                <th className="text-left py-3 px-4 text-textPrimary font-semibold">Time</th>
                <th className="text-left py-3 px-4 text-textPrimary font-semibold">Severity</th>
              </tr>
            </thead>
            <tbody>
              {previousAlerts.map((alert) => (
                <tr key={alert.id} className="border-b border-steel hover:bg-steel/30 transition-all">
                  <td className="py-3 px-4 text-textPrimary">{alert.type}</td>
                  <td className="py-3 px-4 text-textPrimary">{alert.source}</td>
                  <td className="py-3 px-4 text-textPrimary">{alert.time}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        alert.severity === 'critical'
                          ? 'bg-alertRed/20 text-alertRed'
                          : alert.severity === 'high'
                          ? 'bg-orange-500/20 text-orange-500'
                          : alert.severity === 'medium'
                          ? 'bg-yellow-500/20 text-yellow-500'
                          : 'bg-neonBlue/20 text-neonBlue'
                      }`}
                    >
                      {alert.severity.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}