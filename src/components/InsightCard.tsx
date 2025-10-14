import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface InsightCardProps {
  title: string;
  count: number;
  icon: LucideIcon;
  description: string;
  trend?: 'up' | 'down' | 'stable';
}

export default function InsightCard({ title, count, icon: Icon, description, trend }: InsightCardProps) {
  return (
    <motion.div
      className="glass-effect rounded-xl p-6 glow-on-hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-neonBlue/20 rounded-lg neon-glow">
          <Icon className="w-6 h-6 text-neonBlue" />
        </div>
        {trend && (
          <span
            className={`text-xs font-medium px-2 py-1 rounded ${
              trend === 'up'
                ? 'bg-alertRed/20 text-alertRed'
                : trend === 'down'
                ? 'bg-successGreen/20 text-successGreen'
                : 'bg-neonBlue/20 text-neonBlue'
            }`}
          >
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
          </span>
        )}
      </div>

      <h3 className="text-3xl font-heading text-neonBlue mb-2">{count}</h3>
      <p className="text-lg font-semibold text-textPrimary mb-2">{title}</p>
      <p className="text-sm text-textPrimary/70">{description}</p>
    </motion.div>
  );
}
