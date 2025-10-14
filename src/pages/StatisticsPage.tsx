import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, AlertTriangle, CheckCircle, Download, Calendar } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { generateChartData, generateStatsSummary } from '../utils/dataGenerator';

export default function StatisticsPage() {
  const [dateRange, setDateRange] = useState('7days');
  const [includeSnapshots, setIncludeSnapshots] = useState(false);

  const statsSummary = generateStatsSummary();
  const lineData = generateChartData('line');
  const barData = generateChartData('bar');

  const handleExport = (format: 'pdf' | 'csv') => {
    alert(`Exporting report as ${format.toUpperCase()}...`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-heading text-neonBlue mb-2">Statistical Insights</h1>
        <p className="text-textPrimary/70">Comprehensive analytics and trend analysis</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="glass-effect rounded-xl p-6 glow-on-hover"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-neonBlue/20 rounded-lg neon-glow">
              <AlertTriangle className="w-8 h-8 text-neonBlue" />
            </div>
            <TrendingUp className="w-6 h-6 text-successGreen" />
          </div>
          <h3 className="text-4xl font-heading text-neonBlue mb-2">{statsSummary.totalAlerts}</h3>
          <p className="text-lg font-semibold text-textPrimary mb-1">Total Alerts</p>
          <p className="text-sm text-textPrimary/70">Last 30 days</p>
        </motion.div>

        <motion.div
          className="glass-effect rounded-xl p-6 glow-on-hover"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
            <TrendingUp className="w-6 h-6 text-alertRed" />
          </div>
          <h3 className="text-4xl font-heading text-orange-500 mb-2">{statsSummary.peakTime}</h3>
          <p className="text-lg font-semibold text-textPrimary mb-1">Peak Detection Time</p>
          <p className="text-sm text-textPrimary/70">Highest activity window</p>
        </motion.div>

        <motion.div
          className="glass-effect rounded-xl p-6 glow-on-hover"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-alertRed/20 rounded-lg alert-glow">
              <AlertTriangle className="w-8 h-8 text-alertRed" />
            </div>
            <CheckCircle className="w-6 h-6 text-successGreen" />
          </div>
          <h3 className="text-2xl font-heading text-alertRed mb-2">{statsSummary.frequentThreat}</h3>
          <p className="text-lg font-semibold text-textPrimary mb-1">Most Frequent Threat</p>
          <p className="text-sm text-textPrimary/70">{statsSummary.resolvedToday} resolved today</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          className="glass-effect rounded-xl p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-heading text-neonBlue">Alert Frequency Trend</h2>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 bg-steel rounded-lg text-textPrimary border border-neonBlue/20 focus:border-neonBlue focus:outline-none appearance-none cursor-pointer"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
            </select>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2E3B4E" />
              <XAxis dataKey="name" stroke="#E0E0E0" />
              <YAxis stroke="#E0E0E0" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#2E3B4E',
                  border: '1px solid #00B4D8',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#00B4D8"
                strokeWidth={3}
                dot={{ fill: '#00B4D8', r: 6 }}
                activeDot={{ r: 8, stroke: '#00B4D8', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-3 bg-steel/50 rounded-lg">
              <p className="text-2xl font-heading text-successGreen">-12%</p>
              <p className="text-sm text-textPrimary/70">vs Last Week</p>
            </div>
            <div className="text-center p-3 bg-steel/50 rounded-lg">
              <p className="text-2xl font-heading text-neonBlue">38</p>
              <p className="text-sm text-textPrimary/70">Avg/Day</p>
            </div>
            <div className="text-center p-3 bg-steel/50 rounded-lg">
              <p className="text-2xl font-heading text-orange-500">+8%</p>
              <p className="text-sm text-textPrimary/70">vs Last Month</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="glass-effect rounded-xl p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-2xl font-heading text-neonBlue mb-6">Detection Type Comparison</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2E3B4E" />
              <XAxis dataKey="name" stroke="#E0E0E0" />
              <YAxis stroke="#E0E0E0" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#2E3B4E',
                  border: '1px solid #00B4D8',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="value" fill="#00B4D8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-6 space-y-2">
            {barData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-steel/30 rounded">
                <span className="text-textPrimary font-medium">{item.name}</span>
                <span className="text-neonBlue font-semibold">{item.value} incidents</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="glass-effect rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-heading text-neonBlue mb-6">Report Generator</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-textPrimary font-semibold mb-2">Date Range</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textPrimary/50" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-steel rounded-lg text-textPrimary border border-neonBlue/20 focus:border-neonBlue focus:outline-none appearance-none cursor-pointer"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-textPrimary font-semibold mb-2">Report Type</label>
            <select className="w-full px-4 py-3 bg-steel rounded-lg text-textPrimary border border-neonBlue/20 focus:border-neonBlue focus:outline-none appearance-none cursor-pointer">
              <option>Comprehensive</option>
              <option>Alerts Only</option>
              <option>Statistics Only</option>
              <option>Executive Summary</option>
            </select>
          </div>

          <div>
            <label className="block text-textPrimary font-semibold mb-2">Options</label>
            <div className="flex items-center space-x-2 h-12">
              <input
                type="checkbox"
                id="snapshots"
                checked={includeSnapshots}
                onChange={(e) => setIncludeSnapshots(e.target.checked)}
                className="w-5 h-5 text-neonBlue bg-steel border-neonBlue/20 rounded focus:ring-neonBlue"
              />
              <label htmlFor="snapshots" className="text-textPrimary cursor-pointer">
                Include Snapshots
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => handleExport('pdf')}
            className="flex-1 px-6 py-4 bg-neonBlue rounded-lg font-heading text-navy hover:bg-neonBlue/80 transition-all neon-glow flex items-center justify-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>EXPORT AS PDF</span>
          </button>
          <button
            onClick={() => handleExport('csv')}
            className="flex-1 px-6 py-4 bg-neonBlue/20 rounded-lg font-heading text-neonBlue hover:bg-neonBlue/30 transition-all flex items-center justify-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>EXPORT AS CSV</span>
          </button>
        </div>
      </motion.div>

      <motion.div
        className="glass-effect rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-heading text-neonBlue mb-6">Predictive Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-textPrimary">Threat Forecasting</h3>
            <div className="space-y-3">
              <div className="p-4 bg-steel/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-textPrimary font-medium">Next Hour Prediction</span>
                  <span className="text-neonBlue font-semibold">8-12 alerts</span>
                </div>
                <div className="w-full bg-navy rounded-full h-2">
                  <div className="bg-neonBlue h-2 rounded-full neon-glow" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div className="p-4 bg-steel/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-textPrimary font-medium">Peak Time Probability</span>
                  <span className="text-orange-500 font-semibold">78%</span>
                </div>
                <div className="w-full bg-navy rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div className="p-4 bg-steel/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-textPrimary font-medium">Critical Alert Risk</span>
                  <span className="text-alertRed font-semibold">Medium</span>
                </div>
                <div className="w-full bg-navy rounded-full h-2">
                  <div className="bg-alertRed h-2 rounded-full alert-glow" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-textPrimary">Anomaly Detection</h3>
            <div className="space-y-3">
              <div className="p-4 bg-alertRed/10 border border-alertRed/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-alertRed" />
                  <span className="text-textPrimary font-semibold">Unusual Pattern Detected</span>
                </div>
                <p className="text-sm text-textPrimary/70">
                  40% increase in perimeter breach attempts in North Sector
                </p>
              </div>
              <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <span className="text-textPrimary font-semibold">Time Anomaly</span>
                </div>
                <p className="text-sm text-textPrimary/70">
                  Off-hours activity spike detected at 03:15 AM
                </p>
              </div>
              <div className="p-4 bg-successGreen/10 border border-successGreen/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-successGreen" />
                  <span className="text-textPrimary font-semibold">Normal Operations</span>
                </div>
                <p className="text-sm text-textPrimary/70">
                  All other zones reporting expected activity levels
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
