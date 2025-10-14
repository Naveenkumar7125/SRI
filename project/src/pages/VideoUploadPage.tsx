import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Folder, Eye, Activity, AlertTriangle, Clock, FileVideo, Download } from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import InsightCard from '../components/InsightCard';
import { generateChartData, generateAlerts } from '../utils/dataGenerator';
import { UploadedFile } from '../types';

export default function VideoUploadPage() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadHistory, setUploadHistory] = useState<UploadedFile[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const pieData = generateChartData('pie');
  const lineData = generateChartData('line');
  const previousAlerts = generateAlerts(5);

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

  const handleAnalyze = () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);

          const newFiles: UploadedFile[] = selectedFiles.map((file, index) => ({
            id: `upload-${Date.now()}-${index}`,
            name: file.name,
            size: file.size,
            uploadedAt: new Date().toLocaleString(),
            status: 'completed',
            insights: {
              objects: Math.floor(Math.random() * 50 + 10),
              patterns: Math.floor(Math.random() * 20 + 5),
              events: Math.floor(Math.random() * 15 + 3),
              duration: `${Math.floor(Math.random() * 10 + 1)}m ${Math.floor(Math.random() * 60)}s`,
            },
          }));

          setUploadHistory((prev) => [...newFiles, ...prev].slice(0, 5));
          setSelectedFiles([]);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-heading text-neonBlue mb-2">Video Analysis & Insights</h1>
        <p className="text-textPrimary/70">Upload surveillance footage for AI-powered threat detection</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          className="glass-effect rounded-xl p-8 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-2xl font-heading text-neonBlue mb-4">Upload Center</h2>

          <div className="border-2 border-dashed border-neonBlue/30 rounded-xl p-8 text-center hover:border-neonBlue/60 transition-all glow-on-hover">
            <Upload className="w-16 h-16 text-neonBlue mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-textPrimary mb-2">Single File Upload</h3>
            <p className="text-textPrimary/70 mb-4">MP4, AVI, MOV supported</p>
            <label className="cursor-pointer">
              <input
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
                multiple
              />
              <span className="inline-block px-6 py-3 bg-neonBlue text-navy font-semibold rounded-lg hover:bg-neonBlue/80 transition-all neon-glow">
                Select Files
              </span>
            </label>
          </div>

          <div className="border-2 border-dashed border-neonBlue/30 rounded-xl p-8 text-center hover:border-neonBlue/60 transition-all glow-on-hover">
            <Folder className="w-16 h-16 text-neonBlue mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-textPrimary mb-2">Folder Upload</h3>
            <p className="text-textPrimary/70 mb-4">Batch process multiple files</p>
            <label className="cursor-pointer">
              <input
                type="file"
                onChange={handleFolderSelect}
                className="hidden"
                multiple
              />
              <span className="inline-block px-6 py-3 bg-neonBlue text-navy font-semibold rounded-lg hover:bg-neonBlue/80 transition-all neon-glow">
                Select Folder
              </span>
            </label>
          </div>

          {selectedFiles.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="bg-steel/50 rounded-lg p-4 mb-4">
                <p className="text-textPrimary font-semibold mb-2">
                  {selectedFiles.length} file(s) selected
                </p>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="text-sm text-textPrimary/70 flex items-center">
                      <FileVideo className="w-4 h-4 mr-2" />
                      {file.name}
                    </div>
                  ))}
                </div>
              </div>

              {isUploading && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-textPrimary mb-2">
                    <span>Processing...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-steel rounded-full h-2 overflow-hidden">
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
                className="w-full px-6 py-4 bg-neonBlue text-navy font-heading text-lg rounded-lg hover:bg-neonBlue/80 transition-all neon-glow-strong disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? 'ANALYZING...' : 'ANALYZE'}
              </button>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="glass-effect rounded-xl p-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-2xl font-heading text-neonBlue mb-4">Upload History</h2>
          {uploadHistory.length === 0 ? (
            <div className="text-center py-12 text-textPrimary/50">
              <FileVideo className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p>No uploads yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {uploadHistory.map((file) => (
                <motion.div
                  key={file.id}
                  className="bg-steel/50 rounded-lg p-4 hover:bg-steel/70 transition-all"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-textPrimary">{file.name}</h3>
                    <span className="text-xs px-2 py-1 bg-successGreen/20 text-successGreen rounded">
                      {file.status}
                    </span>
                  </div>
                  <p className="text-xs text-textPrimary/70 mb-3">{file.uploadedAt}</p>
                  {file.insights && (
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 text-neonBlue mr-2" />
                        <span className="text-textPrimary/70">{file.insights.objects} objects</span>
                      </div>
                      <div className="flex items-center">
                        <Activity className="w-4 h-4 text-neonBlue mr-2" />
                        <span className="text-textPrimary/70">{file.insights.patterns} patterns</span>
                      </div>
                      <div className="flex items-center">
                        <AlertTriangle className="w-4 h-4 text-alertRed mr-2" />
                        <span className="text-textPrimary/70">{file.insights.events} events</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-neonBlue mr-2" />
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
