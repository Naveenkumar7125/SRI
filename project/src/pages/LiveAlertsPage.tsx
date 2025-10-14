import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, CheckCircle, ArrowUpCircle, Filter, Search } from 'lucide-react';
import { generateAlerts } from '../utils/dataGenerator';
import { Alert } from '../types';

export default function LiveAlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterSource, setFilterSource] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setAlerts(generateAlerts(15));

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newAlert = generateAlerts(1)[0];
        setAlerts((prev) => [newAlert, ...prev].slice(0, 20));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleMarkReviewed = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) => (alert.id === alertId ? { ...alert, status: 'reviewed' } : alert))
    );
  };

  const handleResolve = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) => (alert.id === alertId ? { ...alert, status: 'resolved' } : alert))
    );
    setSelectedAlert(null);
  };

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity;
    const matchesSource = filterSource === 'all' || alert.source === filterSource;
    const matchesSearch =
      searchQuery === '' ||
      alert.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesSource && matchesSearch;
  });

  const severityCounts = {
    critical: alerts.filter((a) => a.severity === 'critical').length,
    high: alerts.filter((a) => a.severity === 'high').length,
    medium: alerts.filter((a) => a.severity === 'medium').length,
    low: alerts.filter((a) => a.severity === 'low').length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-heading text-neonBlue mb-2">Live Alerts & Events</h1>
        <p className="text-textPrimary/70">Real-time threat monitoring and incident management</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          className="glass-effect rounded-xl p-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-textPrimary/70 text-sm">Critical</span>
            <div className="w-3 h-3 bg-alertRed rounded-full pulse-animation"></div>
          </div>
          <p className="text-3xl font-heading text-alertRed">{severityCounts.critical}</p>
        </motion.div>

        <motion.div
          className="glass-effect rounded-xl p-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-textPrimary/70 text-sm">High</span>
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          </div>
          <p className="text-3xl font-heading text-orange-500">{severityCounts.high}</p>
        </motion.div>

        <motion.div
          className="glass-effect rounded-xl p-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-textPrimary/70 text-sm">Medium</span>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          </div>
          <p className="text-3xl font-heading text-yellow-500">{severityCounts.medium}</p>
        </motion.div>

        <motion.div
          className="glass-effect rounded-xl p-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-textPrimary/70 text-sm">Low</span>
            <div className="w-3 h-3 bg-neonBlue rounded-full"></div>
          </div>
          <p className="text-3xl font-heading text-neonBlue">{severityCounts.low}</p>
        </motion.div>
      </div>

      <motion.div
        className="glass-effect rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textPrimary/50" />
            <input
              type="text"
              placeholder="Search alerts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-steel rounded-lg text-textPrimary border border-neonBlue/20 focus:border-neonBlue focus:outline-none"
            />
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textPrimary/50" />
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="pl-10 pr-8 py-3 bg-steel rounded-lg text-textPrimary border border-neonBlue/20 focus:border-neonBlue focus:outline-none appearance-none cursor-pointer"
              >
                <option value="all">All Severity</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="px-4 py-3 bg-steel rounded-lg text-textPrimary border border-neonBlue/20 focus:border-neonBlue focus:outline-none appearance-none cursor-pointer"
            >
              <option value="all">All Sources</option>
              <option value="Drone 1">Drone 1</option>
              <option value="Drone 2">Drone 2</option>
              <option value="Body Cam Alpha">Body Cam Alpha</option>
              <option value="Fixed Cam 3">Fixed Cam 3</option>
              <option value="Robot Patrol">Robot Patrol</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neonBlue/20">
                <th className="text-left py-4 px-4 text-textPrimary font-heading">Alert Type</th>
                <th className="text-left py-4 px-4 text-textPrimary font-heading">Source</th>
                <th className="text-left py-4 px-4 text-textPrimary font-heading">Time</th>
                <th className="text-left py-4 px-4 text-textPrimary font-heading">Severity</th>
                <th className="text-left py-4 px-4 text-textPrimary font-heading">Status</th>
                <th className="text-left py-4 px-4 text-textPrimary font-heading">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredAlerts.map((alert, index) => (
                  <motion.tr
                    key={alert.id}
                    className={`border-b border-steel hover:bg-steel/30 cursor-pointer transition-all ${
                      alert.severity === 'critical' ? 'bg-alertRed/5' : ''
                    }`}
                    onClick={() => setSelectedAlert(alert)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-5 h-5 text-alertRed" />
                        <span className="text-textPrimary font-medium">{alert.type}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-textPrimary">{alert.source}</td>
                    <td className="py-4 px-4 text-textPrimary">{alert.time}</td>
                    <td className="py-4 px-4">
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
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          alert.status === 'active'
                            ? 'bg-alertRed/20 text-alertRed'
                            : alert.status === 'reviewed'
                            ? 'bg-yellow-500/20 text-yellow-500'
                            : 'bg-successGreen/20 text-successGreen'
                        }`}
                      >
                        {alert.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkReviewed(alert.id);
                        }}
                        className="px-3 py-1 bg-neonBlue/20 text-neonBlue rounded hover:bg-neonBlue/30 transition-all text-sm font-medium"
                      >
                        Review
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedAlert && (
          <motion.div
            className="fixed inset-0 bg-navy/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAlert(null)}
          >
            <motion.div
              className="glass-effect rounded-xl p-8 max-w-2xl w-full neon-glow-strong"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-heading text-neonBlue mb-2">Alert Details</h2>
                  <p className="text-textPrimary/70">Review and take action on this alert</p>
                </div>
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="text-textPrimary hover:text-alertRed transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="aspect-video bg-gradient-overlay rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <AlertTriangle className="w-16 h-16 text-alertRed mx-auto mb-4" />
                    <p className="text-textPrimary/50">Snapshot unavailable</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-textPrimary/70 text-sm mb-1">Alert Type</p>
                    <p className="text-textPrimary font-semibold">{selectedAlert.type}</p>
                  </div>
                  <div>
                    <p className="text-textPrimary/70 text-sm mb-1">Source</p>
                    <p className="text-textPrimary font-semibold">{selectedAlert.source}</p>
                  </div>
                  <div>
                    <p className="text-textPrimary/70 text-sm mb-1">Time</p>
                    <p className="text-textPrimary font-semibold">{selectedAlert.time}</p>
                  </div>
                  <div>
                    <p className="text-textPrimary/70 text-sm mb-1">Severity</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedAlert.severity === 'critical'
                          ? 'bg-alertRed/20 text-alertRed'
                          : selectedAlert.severity === 'high'
                          ? 'bg-orange-500/20 text-orange-500'
                          : selectedAlert.severity === 'medium'
                          ? 'bg-yellow-500/20 text-yellow-500'
                          : 'bg-neonBlue/20 text-neonBlue'
                      }`}
                    >
                      {selectedAlert.severity.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-textPrimary/70 text-sm mb-1">Location</p>
                    <p className="text-textPrimary font-semibold">{selectedAlert.location}</p>
                  </div>
                  <div>
                    <p className="text-textPrimary/70 text-sm mb-1">Confidence</p>
                    <p className="text-textPrimary font-semibold">{selectedAlert.confidence}%</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => handleResolve(selectedAlert.id)}
                    className="flex-1 px-6 py-3 bg-successGreen rounded-lg font-heading text-white hover:bg-successGreen/80 transition-all flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>RESOLVE</span>
                  </button>
                  <button className="flex-1 px-6 py-3 bg-alertRed rounded-lg font-heading text-white hover:bg-alertRed/80 transition-all flex items-center justify-center space-x-2 alert-glow">
                    <ArrowUpCircle className="w-5 h-5" />
                    <span>ESCALATE</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
