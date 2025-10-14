import { Video, Activity, Bell, BarChart3, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'upload', label: 'Video Analysis', icon: Video },
    { id: 'feeds', label: 'Live Feeds', icon: Activity },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'stats', label: 'Statistics', icon: BarChart3 },
  ];

  return (
    <nav className="bg-steel border-b border-neonBlue/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-neonBlue" />
            <h1 className="text-xl font-heading text-neonBlue">NSG SURVEILLANCE</h1>
          </div>

          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 ${
                    isActive
                      ? 'bg-neonBlue/20 text-neonBlue'
                      : 'text-textPrimary hover:bg-neonBlue/10 hover:text-neonBlue'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium hidden sm:inline">{item.label}</span>
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-neonBlue neon-glow"
                      layoutId="activeTab"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          <div className="flex items-center space-x-2">
            <div className="px-3 py-1 bg-successGreen/20 rounded-full flex items-center space-x-2">
              <div className="w-2 h-2 bg-successGreen rounded-full pulse-animation"></div>
              <span className="text-xs font-medium text-successGreen">SECURE</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
