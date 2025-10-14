import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Radio, MapPin, Clock, Calendar, Crosshair, AlertTriangle } from 'lucide-react';
import { generateVideoFeeds, createHeatmapDataUrl } from '../utils/dataGenerator';
import { VideoFeed } from '../types';

export default function LiveFeedsPage() {
  const [feeds, setFeeds] = useState<VideoFeed[]>([]);
  const [viewMode, setViewMode] = useState<'live' | 'heatmap'>('live');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'drone' | 'fixed' | 'body-cam'>('all');

  useEffect(() => {
    const initialFeeds = generateVideoFeeds();
    const feedsWithHeatmaps = initialFeeds.map((feed) => ({
      ...feed,
      heatmapUrl: createHeatmapDataUrl(),
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
            className="glass-effect rounded-xl overflow-hidden glow-on-hover"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="relative">
              <div className="aspect-video bg-gradient-overlay flex items-center justify-center relative overflow-hidden">
                {viewMode === 'heatmap' && feed.heatmapUrl ? (
                  <img src={feed.heatmapUrl} alt="Heatmap" className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-steel/50 to-navy/50">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Crosshair className="w-16 h-16 text-neonBlue/30 animate-pulse" />
                    </div>
                    <div className="absolute top-0 left-0 right-0 h-1 bg-neonBlue/50 animate-pulse"></div>
                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-20">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="border border-neonBlue/20"></div>
                      ))}
                    </div>
                  </div>
                )}

                {feed.status === 'live' && (
                  <div className="absolute top-3 right-3 px-3 py-1 bg-alertRed rounded-full flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full pulse-animation"></div>
                    <span className="text-white text-xs font-heading">LIVE</span>
                  </div>
                )}

                {feed.lastDetection && viewMode === 'live' && (
                  <div className="absolute top-3 left-3 px-3 py-1 bg-alertRed/90 rounded-lg flex items-center space-x-2 alert-glow">
                    <AlertTriangle className="w-4 h-4 text-white" />
                    <span className="text-white text-xs font-semibold">{feed.lastDetection}</span>
                  </div>
                )}

                <div className="absolute bottom-3 left-3 right-3 space-y-2">
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
