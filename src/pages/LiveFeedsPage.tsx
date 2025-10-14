// // import { useState, useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import { Radio, MapPin, Clock, Calendar, Crosshair, AlertTriangle } from 'lucide-react';
// // import { generateVideoFeeds, createHeatmapDataUrl } from '../utils/dataGenerator';
// // import { VideoFeed } from '../types';

// // export default function LiveFeedsPage() {
// //   const [feeds, setFeeds] = useState<VideoFeed[]>([]);
// //   const [viewMode, setViewMode] = useState<'live' | 'heatmap'>('live');
// //   const [selectedCategory, setSelectedCategory] = useState<'all' | 'drone' | 'fixed' | 'body-cam'>('all');

// //   useEffect(() => {
// //     const initialFeeds = generateVideoFeeds();
// //     const feedsWithHeatmaps = initialFeeds.map((feed) => ({
// //       ...feed,
// //       heatmapUrl: createHeatmapDataUrl(),
// //     }));
// //     setFeeds(feedsWithHeatmaps);

// //     const interval = setInterval(() => {
// //       setFeeds((prev) =>
// //         prev.map((feed) => ({
// //           ...feed,
// //           timestamp: new Date().toLocaleString(),
// //           heatmapUrl: createHeatmapDataUrl(),
// //         }))
// //       );
// //     }, 5000);

// //     return () => clearInterval(interval);
// //   }, []);

// //   const filteredFeeds = feeds.filter((feed) => {
// //     if (selectedCategory === 'all') return true;
// //     return feed.type === selectedCategory;
// //   });

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
// //       <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
// //         <div className="flex items-center justify-between mb-2">
// //           <h1 className="text-4xl font-heading text-neonBlue">Live Surveillance</h1>
// //           <div className="flex items-center space-x-2 px-4 py-2 bg-alertRed/20 rounded-lg">
// //             <Radio className="w-5 h-5 text-alertRed pulse-animation" />
// //             <span className="text-alertRed font-heading text-lg">LIVE</span>
// //           </div>
// //         </div>
// //         <p className="text-textPrimary/70">Real-time threat detection and monitoring</p>
// //       </motion.div>

// //       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// //         <div className="flex space-x-2">
// //           {['all', 'drone', 'fixed', 'body-cam'].map((category) => (
// //             <button
// //               key={category}
// //               onClick={() => setSelectedCategory(category as typeof selectedCategory)}
// //               className={`px-4 py-2 rounded-lg font-medium transition-all ${
// //                 selectedCategory === category
// //                   ? 'bg-neonBlue text-navy neon-glow'
// //                   : 'bg-steel text-textPrimary hover:bg-steel/70'
// //               }`}
// //             >
// //               {category === 'all' ? 'All Feeds' : category.replace('-', ' ').toUpperCase()}
// //             </button>
// //           ))}
// //         </div>

// //         <div className="flex space-x-2">
// //           <button
// //             onClick={() => setViewMode('live')}
// //             className={`px-4 py-2 rounded-lg font-medium transition-all ${
// //               viewMode === 'live'
// //                 ? 'bg-neonBlue text-navy neon-glow'
// //                 : 'bg-steel text-textPrimary hover:bg-steel/70'
// //             }`}
// //           >
// //             Live View
// //           </button>
// //           <button
// //             onClick={() => setViewMode('heatmap')}
// //             className={`px-4 py-2 rounded-lg font-medium transition-all ${
// //               viewMode === 'heatmap'
// //                 ? 'bg-neonBlue text-navy neon-glow'
// //                 : 'bg-steel text-textPrimary hover:bg-steel/70'
// //             }`}
// //           >
// //             Heatmap View
// //           </button>
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {filteredFeeds.map((feed, index) => (
// //           <motion.div
// //             key={feed.id}
// //             className="glass-effect rounded-xl overflow-hidden glow-on-hover"
// //             initial={{ opacity: 0, scale: 0.9 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             transition={{ delay: index * 0.1 }}
// //           >
// //             <div className="relative">
// //               <div className="aspect-video bg-gradient-overlay flex items-center justify-center relative overflow-hidden">
// //                 {viewMode === 'heatmap' && feed.heatmapUrl ? (
// //                   <img src={feed.heatmapUrl} alt="Heatmap" className="w-full h-full object-cover" />
// //                 ) : (
// //                   <div className="absolute inset-0 bg-gradient-to-br from-steel/50 to-navy/50">
// //                     <div className="absolute inset-0 flex items-center justify-center">
// //                       <Crosshair className="w-16 h-16 text-neonBlue/30 animate-pulse" />
// //                     </div>
// //                     <div className="absolute top-0 left-0 right-0 h-1 bg-neonBlue/50 animate-pulse"></div>
// //                     <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-20">
// //                       {Array.from({ length: 9 }).map((_, i) => (
// //                         <div key={i} className="border border-neonBlue/20"></div>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 )}

// //                 {feed.status === 'live' && (
// //                   <div className="absolute top-3 right-3 px-3 py-1 bg-alertRed rounded-full flex items-center space-x-2">
// //                     <div className="w-2 h-2 bg-white rounded-full pulse-animation"></div>
// //                     <span className="text-white text-xs font-heading">LIVE</span>
// //                   </div>
// //                 )}

// //                 {feed.lastDetection && viewMode === 'live' && (
// //                   <div className="absolute top-3 left-3 px-3 py-1 bg-alertRed/90 rounded-lg flex items-center space-x-2 alert-glow">
// //                     <AlertTriangle className="w-4 h-4 text-white" />
// //                     <span className="text-white text-xs font-semibold">{feed.lastDetection}</span>
// //                   </div>
// //                 )}

// //                 <div className="absolute bottom-3 left-3 right-3 space-y-2">
// //                   {viewMode === 'heatmap' && (
// //                     <div className="bg-steel/90 backdrop-blur-sm rounded-lg p-3 space-y-2">
// //                       <div className="flex items-center space-x-2 text-xs">
// //                         <Clock className="w-4 h-4 text-neonBlue" />
// //                         <span className="text-textPrimary font-semibold">
// //                           {new Date().toLocaleTimeString('en-US', { hour12: false })}
// //                         </span>
// //                       </div>
// //                       <div className="flex items-center space-x-2 text-xs">
// //                         <Calendar className="w-4 h-4 text-neonBlue" />
// //                         <span className="text-textPrimary font-semibold">
// //                           {new Date().toLocaleDateString('en-GB')}
// //                         </span>
// //                       </div>
// //                       <div className="flex items-center space-x-2 text-xs">
// //                         <MapPin className="w-4 h-4 text-neonBlue" />
// //                         <span className="text-textPrimary font-semibold">{feed.coordinates}</span>
// //                       </div>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="p-4 space-y-3">
// //               <div className="flex items-center justify-between">
// //                 <h3 className="text-lg font-heading text-neonBlue">{feed.name}</h3>
// //                 <span
// //                   className={`px-2 py-1 rounded text-xs font-semibold ${
// //                     feed.status === 'live'
// //                       ? 'bg-successGreen/20 text-successGreen'
// //                       : 'bg-alertRed/20 text-alertRed'
// //                   }`}
// //                 >
// //                   {feed.resolution}
// //                 </span>
// //               </div>

// //               <div className="space-y-2 text-sm">
// //                 <div className="flex items-center space-x-2">
// //                   <MapPin className="w-4 h-4 text-neonBlue" />
// //                   <span className="text-textPrimary/70">{feed.location}</span>
// //                 </div>
// //                 <div className="flex items-center space-x-2">
// //                   <Crosshair className="w-4 h-4 text-neonBlue" />
// //                   <span className="text-textPrimary/70">{feed.coordinates}</span>
// //                 </div>
// //               </div>

// //               <div className="flex items-center justify-between pt-2 border-t border-neonBlue/20">
// //                 <span className="text-xs text-textPrimary/50">
// //                   {feed.status === 'live' ? 'Connected' : 'Offline'}
// //                 </span>
// //                 <div
// //                   className={`w-2 h-2 rounded-full ${
// //                     feed.status === 'live' ? 'bg-successGreen pulse-animation' : 'bg-alertRed'
// //                   }`}
// //                 ></div>
// //               </div>
// //             </div>
// //           </motion.div>
// //         ))}
// //       </div>

// //       <motion.div
// //         className="glass-effect rounded-xl p-6"
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //       >
// //         <h2 className="text-2xl font-heading text-neonBlue mb-4">Emergency Controls</h2>
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //           <button className="px-6 py-4 bg-alertRed rounded-lg font-heading text-white hover:bg-alertRed/80 transition-all alert-glow">
// //             EMERGENCY LOCKDOWN
// //           </button>
// //           <button className="px-6 py-4 bg-neonBlue/20 rounded-lg font-heading text-neonBlue hover:bg-neonBlue/30 transition-all neon-glow">
// //             RECORD ALL FEEDS
// //           </button>
// //           <button className="px-6 py-4 bg-neonBlue/20 rounded-lg font-heading text-neonBlue hover:bg-neonBlue/30 transition-all neon-glow">
// //             ALERT AUTHORITIES
// //           </button>
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // }




// import { useState, useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';
// import { Radio, MapPin, Clock, Calendar, Crosshair, AlertTriangle } from 'lucide-react';
// import { generateVideoFeeds, createHeatmapDataUrl } from '../utils/dataGenerator';
// import { VideoFeed } from '../types';

// // Import video assets
// import cam1 from '../assets/cam1.mp4';
// import cam2 from '../assets/cam2.mp4';
// import cam3 from '../assets/cam3.mp4';
// import cam4 from '../assets/cam4.mp4';
// import cam5 from '../assets/cam5.mp4';
// import cam6 from '../assets/cam6.mp4';

// export default function LiveFeedsPage() {
//   const [feeds, setFeeds] = useState<VideoFeed[]>([]);
//   const [viewMode, setViewMode] = useState<'live' | 'heatmap'>('live');
//   const [selectedCategory, setSelectedCategory] = useState<'all' | 'drone' | 'fixed' | 'body-cam'>('all');
//   const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

//   // Available video assets for different feeds
//   const videoAssets = [cam1, cam2, cam3, cam4, cam5, cam6];

//   useEffect(() => {
//     const initialFeeds = generateVideoFeeds();
//     const feedsWithHeatmaps = initialFeeds.map((feed, index) => ({
//       ...feed,
//       heatmapUrl: createHeatmapDataUrl(),
//       videoUrl: videoAssets[index % videoAssets.length], // Assign video asset to each feed
//     }));
//     setFeeds(feedsWithHeatmaps);

//     const interval = setInterval(() => {
//       setFeeds((prev) =>
//         prev.map((feed) => ({
//           ...feed,
//           timestamp: new Date().toLocaleString(),
//           heatmapUrl: createHeatmapDataUrl(),
//         }))
//       );
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   // Handle video play and loop
//   useEffect(() => {
//     if (viewMode === 'live') {
//       // Play all videos when in live view
//       Object.values(videoRefs.current).forEach((video) => {
//         if (video) {
//           video.play().catch((error) => {
//             console.log('Video play failed:', error);
//           });
//         }
//       });
//     } else {
//       // Pause all videos when in heatmap view
//       Object.values(videoRefs.current).forEach((video) => {
//         if (video) {
//           video.pause();
//         }
//       });
//     }
//   }, [viewMode]);

//   const handleVideoRef = (feedId: string, element: HTMLVideoElement | null) => {
//     videoRefs.current[feedId] = element;
//     if (element && viewMode === 'live') {
//       element.loop = true;
//       element.muted = true;
//       element.playsInline = true;
//       element.play().catch((error) => {
//         console.log('Video play failed:', error);
//       });
//     }
//   };

//   const filteredFeeds = feeds.filter((feed) => {
//     if (selectedCategory === 'all') return true;
//     return feed.type === selectedCategory;
//   });

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
//       <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//         <div className="flex items-center justify-between mb-2">
//           <h1 className="text-4xl font-heading text-neonBlue">Live Surveillance</h1>
//           <div className="flex items-center space-x-2 px-4 py-2 bg-alertRed/20 rounded-lg">
//             <Radio className="w-5 h-5 text-alertRed pulse-animation" />
//             <span className="text-alertRed font-heading text-lg">LIVE</span>
//           </div>
//         </div>
//         <p className="text-textPrimary/70">Real-time threat detection and monitoring</p>
//       </motion.div>

//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div className="flex space-x-2">
//           {['all', 'drone', 'fixed', 'body-cam'].map((category) => (
//             <button
//               key={category}
//               onClick={() => setSelectedCategory(category as typeof selectedCategory)}
//               className={`px-4 py-2 rounded-lg font-medium transition-all ${
//                 selectedCategory === category
//                   ? 'bg-neonBlue text-navy neon-glow'
//                   : 'bg-steel text-textPrimary hover:bg-steel/70'
//               }`}
//             >
//               {category === 'all' ? 'All Feeds' : category.replace('-', ' ').toUpperCase()}
//             </button>
//           ))}
//         </div>

//         <div className="flex space-x-2">
//           <button
//             onClick={() => setViewMode('live')}
//             className={`px-4 py-2 rounded-lg font-medium transition-all ${
//               viewMode === 'live'
//                 ? 'bg-neonBlue text-navy neon-glow'
//                 : 'bg-steel text-textPrimary hover:bg-steel/70'
//             }`}
//           >
//             Live View
//           </button>
//           <button
//             onClick={() => setViewMode('heatmap')}
//             className={`px-4 py-2 rounded-lg font-medium transition-all ${
//               viewMode === 'heatmap'
//                 ? 'bg-neonBlue text-navy neon-glow'
//                 : 'bg-steel text-textPrimary hover:bg-steel/70'
//             }`}
//           >
//             Heatmap View
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredFeeds.map((feed, index) => (
//           <motion.div
//             key={feed.id}
//             className="glass-effect rounded-xl overflow-hidden glow-on-hover"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: index * 0.1 }}
//           >
//             <div className="relative">
//               <div className="aspect-video bg-gradient-overlay flex items-center justify-center relative overflow-hidden">
//                 {viewMode === 'heatmap' && feed.heatmapUrl ? (
//                   <img src={feed.heatmapUrl} alt="Heatmap" className="w-full h-full object-cover" />
//                 ) : (
//                   <>
//                     {/* Looping Video */}
//                     <video
//                       ref={(el) => handleVideoRef(feed.id, el)}
//                       src={feed.videoUrl}
//                       className="w-full h-full object-cover"
//                       loop
//                       muted
//                       playsInline
//                       autoPlay
//                     />
                    
//                     {/* Overlay Grid and UI Elements */}
//                     <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/10">
//                       <div className="absolute inset-0 flex items-center justify-center">
//                         <Crosshair className="w-16 h-16 text-neonBlue/20 animate-pulse" />
//                       </div>
//                       <div className="absolute top-0 left-0 right-0 h-1 bg-neonBlue/50 animate-pulse"></div>
//                       <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-10">
//                         {Array.from({ length: 9 }).map((_, i) => (
//                           <div key={i} className="border border-neonBlue/30"></div>
//                         ))}
//                       </div>
//                     </div>
//                   </>
//                 )}

//                 {feed.status === 'live' && (
//                   <div className="absolute top-3 right-3 px-3 py-1 bg-alertRed rounded-full flex items-center space-x-2 z-10">
//                     <div className="w-2 h-2 bg-white rounded-full pulse-animation"></div>
//                     <span className="text-white text-xs font-heading">LIVE</span>
//                   </div>
//                 )}

//                 {feed.lastDetection && viewMode === 'live' && (
//                   <div className="absolute top-3 left-3 px-3 py-1 bg-alertRed/90 rounded-lg flex items-center space-x-2 alert-glow z-10">
//                     <AlertTriangle className="w-4 h-4 text-white" />
//                     <span className="text-white text-xs font-semibold">{feed.lastDetection}</span>
//                   </div>
//                 )}

//                 <div className="absolute bottom-3 left-3 right-3 space-y-2 z-10">
//                   {viewMode === 'heatmap' && (
//                     <div className="bg-steel/90 backdrop-blur-sm rounded-lg p-3 space-y-2">
//                       <div className="flex items-center space-x-2 text-xs">
//                         <Clock className="w-4 h-4 text-neonBlue" />
//                         <span className="text-textPrimary font-semibold">
//                           {new Date().toLocaleTimeString('en-US', { hour12: false })}
//                         </span>
//                       </div>
//                       <div className="flex items-center space-x-2 text-xs">
//                         <Calendar className="w-4 h-4 text-neonBlue" />
//                         <span className="text-textPrimary font-semibold">
//                           {new Date().toLocaleDateString('en-GB')}
//                         </span>
//                       </div>
//                       <div className="flex items-center space-x-2 text-xs">
//                         <MapPin className="w-4 h-4 text-neonBlue" />
//                         <span className="text-textPrimary font-semibold">{feed.coordinates}</span>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="p-4 space-y-3">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-lg font-heading text-neonBlue">{feed.name}</h3>
//                 <span
//                   className={`px-2 py-1 rounded text-xs font-semibold ${
//                     feed.status === 'live'
//                       ? 'bg-successGreen/20 text-successGreen'
//                       : 'bg-alertRed/20 text-alertRed'
//                   }`}
//                 >
//                   {feed.resolution}
//                 </span>
//               </div>

//               <div className="space-y-2 text-sm">
//                 <div className="flex items-center space-x-2">
//                   <MapPin className="w-4 h-4 text-neonBlue" />
//                   <span className="text-textPrimary/70">{feed.location}</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Crosshair className="w-4 h-4 text-neonBlue" />
//                   <span className="text-textPrimary/70">{feed.coordinates}</span>
//                 </div>
//               </div>

//               <div className="flex items-center justify-between pt-2 border-t border-neonBlue/20">
//                 <span className="text-xs text-textPrimary/50">
//                   {feed.status === 'live' ? 'Connected' : 'Offline'}
//                 </span>
//                 <div
//                   className={`w-2 h-2 rounded-full ${
//                     feed.status === 'live' ? 'bg-successGreen pulse-animation' : 'bg-alertRed'
//                   }`}
//                 ></div>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       <motion.div
//         className="glass-effect rounded-xl p-6"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <h2 className="text-2xl font-heading text-neonBlue mb-4">Emergency Controls</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <button className="px-6 py-4 bg-alertRed rounded-lg font-heading text-white hover:bg-alertRed/80 transition-all alert-glow">
//             EMERGENCY LOCKDOWN
//           </button>
//           <button className="px-6 py-4 bg-neonBlue/20 rounded-lg font-heading text-neonBlue hover:bg-neonBlue/30 transition-all neon-glow">
//             RECORD ALL FEEDS
//           </button>
//           <button className="px-6 py-4 bg-neonBlue/20 rounded-lg font-heading text-neonBlue hover:bg-neonBlue/30 transition-all neon-glow">
//             ALERT AUTHORITIES
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }





import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, MapPin, Clock, Calendar, Crosshair, AlertTriangle, X } from 'lucide-react';
import { generateVideoFeeds, createHeatmapDataUrl } from '../utils/dataGenerator';
import { VideoFeed } from '../types';

// Import video assets
import cam1 from '../assets/cam1.mp4';
import cam2 from '../assets/cam2.mp4';
import cam3 from '../assets/cam3.mp4';
// import cam4 from '../assets/cam4.mp4';
// import cam5 from '../assets/cam5.mp4';
// import cam6 from '../assets/cam6.mp4';

export default function LiveFeedsPage() {
  const [feeds, setFeeds] = useState<VideoFeed[]>([]);
  const [viewMode, setViewMode] = useState<'live' | 'heatmap'>('live');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'drone' | 'fixed' | 'body-cam'>('all');
  const [selectedFeed, setSelectedFeed] = useState<VideoFeed | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  // Available video assets for different feeds
  const videoAssets = [cam1,cam2, cam3];

  useEffect(() => {
    const initialFeeds = generateVideoFeeds();
    const feedsWithHeatmaps = initialFeeds.map((feed, index) => ({
      ...feed,
      heatmapUrl: createHeatmapDataUrl(),
      videoUrl: videoAssets[index % videoAssets.length], // Assign video asset to each feed
    }));
    setFeeds(feedsWithHeatmaps);

    const interval = setInterval(() => {
      setFeeds((prev) =>
        prev.map((feed) => ({
          ...feed,
          timestamp: new Date().toLocaleString(),
          heatmapUrl: createHeatmapDataUrl(),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Handle video play and loop
  useEffect(() => {
    if (viewMode === 'live') {
      // Play all videos when in live view
      Object.values(videoRefs.current).forEach((video) => {
        if (video) {
          video.play().catch((error) => {
            console.log('Video play failed:', error);
          });
        }
      });
    } else {
      // Pause all videos when in heatmap view
      Object.values(videoRefs.current).forEach((video) => {
        if (video) {
          video.pause();
        }
      });
    }
  }, [viewMode]);

  // Handle modal video play
  useEffect(() => {
    if (isModalOpen && modalVideoRef.current) {
      modalVideoRef.current.play().catch((error) => {
        console.log('Modal video play failed:', error);
      });
    }
  }, [isModalOpen]);

  const handleVideoRef = (feedId: string, element: HTMLVideoElement | null) => {
    videoRefs.current[feedId] = element;
    if (element && viewMode === 'live') {
      element.loop = true;
      element.muted = true;
      element.playsInline = true;
      element.play().catch((error) => {
        console.log('Video play failed:', error);
      });
    }
  };

  const handleFeedClick = (feed: VideoFeed) => {
    setSelectedFeed(feed);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFeed(null);
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
  };

  const filteredFeeds = feeds.filter((feed) => {
    if (selectedCategory === 'all') return true;
    return feed.type === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-4xl font-heading text-neonBlue">Live Surveillance</h1>
          <div className="flex items-center space-x-2 px-4 py-2 bg-alertRed/20 rounded-lg">
            <Radio className="w-5 h-5 text-alertRed pulse-animation" />
            <span className="text-alertRed font-heading text-lg">LIVE</span>
          </div>
        </div>
        <p className="text-textPrimary/70">Real-time threat detection and monitoring</p>
      </motion.div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex space-x-2">
          {['all', 'drone', 'fixed', 'body-cam'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category as typeof selectedCategory)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-neonBlue text-navy neon-glow'
                  : 'bg-steel text-textPrimary hover:bg-steel/70'
              }`}
            >
              {category === 'all' ? 'All Feeds' : category.replace('-', ' ').toUpperCase()}
            </button>
          ))}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('live')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              viewMode === 'live'
                ? 'bg-neonBlue text-navy neon-glow'
                : 'bg-steel text-textPrimary hover:bg-steel/70'
            }`}
          >
            Live View
          </button>
          <button
            onClick={() => setViewMode('heatmap')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              viewMode === 'heatmap'
                ? 'bg-neonBlue text-navy neon-glow'
                : 'bg-steel text-textPrimary hover:bg-steel/70'
            }`}
          >
            Heatmap View
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFeeds.map((feed, index) => (
          <motion.div
            key={feed.id}
            className="glass-effect rounded-xl overflow-hidden glow-on-hover cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleFeedClick(feed)}
          >
            <div className="relative">
              <div className="aspect-video bg-gradient-overlay flex items-center justify-center relative overflow-hidden">
                {viewMode === 'heatmap' && feed.heatmapUrl ? (
                  <img src={feed.heatmapUrl} alt="Heatmap" className="w-full h-full object-cover" />
                ) : (
                  <>
                    {/* Looping Video */}
                    <video
                      ref={(el) => handleVideoRef(feed.id, el)}
                      src={feed.videoUrl}
                      className="w-full h-full object-cover"
                      loop
                      muted
                      playsInline
                      autoPlay
                    />
                    
                    {/* Overlay Grid and UI Elements */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/10">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Crosshair className="w-16 h-16 text-neonBlue/20 animate-pulse" />
                      </div>
                      <div className="absolute top-0 left-0 right-0 h-1 bg-neonBlue/50 animate-pulse"></div>
                      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-10">
                        {Array.from({ length: 9 }).map((_, i) => (
                          <div key={i} className="border border-neonBlue/30"></div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {feed.status === 'live' && (
                  <div className="absolute top-3 right-3 px-3 py-1 bg-alertRed rounded-full flex items-center space-x-2 z-10">
                    <div className="w-2 h-2 bg-white rounded-full pulse-animation"></div>
                    <span className="text-white text-xs font-heading">LIVE</span>
                  </div>
                )}

                {feed.lastDetection && viewMode === 'live' && (
                  <div className="absolute top-3 left-3 px-3 py-1 bg-alertRed/90 rounded-lg flex items-center space-x-2 alert-glow z-10">
                    <AlertTriangle className="w-4 h-4 text-white" />
                    <span className="text-white text-xs font-semibold">{feed.lastDetection}</span>
                  </div>
                )}

                <div className="absolute bottom-3 left-3 right-3 space-y-2 z-10">
                  {viewMode === 'heatmap' && (
                    <div className="bg-steel/90 backdrop-blur-sm rounded-lg p-3 space-y-2">
                      <div className="flex items-center space-x-2 text-xs">
                        <Clock className="w-4 h-4 text-neonBlue" />
                        <span className="text-textPrimary font-semibold">
                          {new Date().toLocaleTimeString('en-US', { hour12: false })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs">
                        <Calendar className="w-4 h-4 text-neonBlue" />
                        <span className="text-textPrimary font-semibold">
                          {new Date().toLocaleDateString('en-GB')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs">
                        <MapPin className="w-4 h-4 text-neonBlue" />
                        <span className="text-textPrimary font-semibold">{feed.coordinates}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-heading text-neonBlue">{feed.name}</h3>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    feed.status === 'live'
                      ? 'bg-successGreen/20 text-successGreen'
                      : 'bg-alertRed/20 text-alertRed'
                  }`}
                >
                  {feed.resolution}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-neonBlue" />
                  <span className="text-textPrimary/70">{feed.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Crosshair className="w-4 h-4 text-neonBlue" />
                  <span className="text-textPrimary/70">{feed.coordinates}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-neonBlue/20">
                <span className="text-xs text-textPrimary/50">
                  {feed.status === 'live' ? 'Connected' : 'Offline'}
                </span>
                <div
                  className={`w-2 h-2 rounded-full ${
                    feed.status === 'live' ? 'bg-successGreen pulse-animation' : 'bg-alertRed'
                  }`}
                ></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isModalOpen && selectedFeed && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="bg-navy/95 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border-2 border-neonBlue/50 neon-glow-strong"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-neonBlue/30 bg-gradient-to-r from-navy to-steel">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 px-3 py-1 bg-alertRed/20 rounded-lg">
                    <Radio className="w-4 h-4 text-alertRed pulse-animation" />
                    <span className="text-alertRed font-heading text-sm">LIVE FEED</span>
                  </div>
                  <h2 className="text-2xl font-heading text-neonBlue">{selectedFeed.name}</h2>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-alertRed/20 rounded-lg transition-all text-alertRed hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Video Player */}
                <div className="relative bg-black rounded-xl overflow-hidden">
                  <video
                    ref={modalVideoRef}
                    src={selectedFeed.videoUrl}
                    className="w-full h-auto max-h-[60vh]"
                    controls
                    autoPlay
                    muted={false}
                    playsInline
                  />
                  
                  {/* Overlay Elements */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center space-x-2 px-3 py-1 bg-alertRed/90 rounded-lg">
                        <div className="w-2 h-2 bg-white rounded-full pulse-animation"></div>
                        <span className="text-white text-sm font-heading">LIVE</span>
                      </div>
                    </div>
                    
                    {selectedFeed.lastDetection && (
                      <div className="absolute top-4 right-4 px-3 py-2 bg-alertRed/90 rounded-lg flex items-center space-x-2 alert-glow">
                        <AlertTriangle className="w-4 h-4 text-white" />
                        <span className="text-white text-sm font-semibold">{selectedFeed.lastDetection}</span>
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-steel/90 backdrop-blur-sm rounded-lg p-4 space-y-3">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-neonBlue" />
                            <div>
                              <p className="text-textPrimary/70 text-xs">Location</p>
                              <p className="text-textPrimary font-semibold">{selectedFeed.location}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Crosshair className="w-4 h-4 text-neonBlue" />
                            <div>
                              <p className="text-textPrimary/70 text-xs">Coordinates</p>
                              <p className="text-textPrimary font-semibold">{selectedFeed.coordinates}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-neonBlue" />
                            <div>
                              <p className="text-textPrimary/70 text-xs">Time</p>
                              <p className="text-textPrimary font-semibold">
                                {new Date().toLocaleTimeString('en-US', { hour12: false })}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-neonBlue" />
                            <div>
                              <p className="text-textPrimary/70 text-xs">Date</p>
                              <p className="text-textPrimary font-semibold">
                                {new Date().toLocaleDateString('en-GB')}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feed Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-steel/50 rounded-xl p-4">
                    <h3 className="text-lg font-heading text-neonBlue mb-3">Camera Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-textPrimary/70">Type:</span>
                        <span className="text-textPrimary font-semibold capitalize">{selectedFeed.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-textPrimary/70">Resolution:</span>
                        <span className="text-textPrimary font-semibold">{selectedFeed.resolution}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-textPrimary/70">Status:</span>
                        <span className={`font-semibold ${
                          selectedFeed.status === 'live' ? 'text-successGreen' : 'text-alertRed'
                        }`}>
                          {selectedFeed.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-steel/50 rounded-xl p-4">
                    <h3 className="text-lg font-heading text-neonBlue mb-3">Recent Activity</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-textPrimary/70">Last Detection:</span>
                        <span className="text-textPrimary font-semibold">
                          {selectedFeed.lastDetection || 'No alerts'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-textPrimary/70">Uptime:</span>
                        <span className="text-textPrimary font-semibold">24/7 Active</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-textPrimary/70">Signal:</span>
                        <span className="text-successGreen font-semibold">Strong</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="glass-effect rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-heading text-neonBlue mb-4">Emergency Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="px-6 py-4 bg-alertRed rounded-lg font-heading text-white hover:bg-alertRed/80 transition-all alert-glow">
            EMERGENCY LOCKDOWN
          </button>
          <button className="px-6 py-4 bg-neonBlue/20 rounded-lg font-heading text-neonBlue hover:bg-neonBlue/30 transition-all neon-glow">
            RECORD ALL FEEDS
          </button>
          <button className="px-6 py-4 bg-neonBlue/20 rounded-lg font-heading text-neonBlue hover:bg-neonBlue/30 transition-all neon-glow">
            ALERT AUTHORITIES
          </button>
        </div>
      </motion.div>
    </div>
  );
}