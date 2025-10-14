import { Alert, VideoFeed, ChartData, StatsSummary } from '../types';

export const generateAlerts = (count: number = 10): Alert[] => {
  const types = ['Weapon Detected', 'Suspicious Movement', 'Unauthorized Access', 'Perimeter Breach', 'Loitering'];
  const sources = ['Drone 1', 'Drone 2', 'Body Cam Alpha', 'Fixed Cam 3', 'Robot Patrol'];
  const severities: Alert['severity'][] = ['critical', 'high', 'medium', 'low'];
  const statuses: Alert['status'][] = ['active', 'reviewed', 'resolved'];
  const locations = ['North Perimeter', 'East Gate', 'Building A', 'Parking Zone', 'South Entrance'];

  return Array.from({ length: count }, (_, i) => ({
    id: `alert-${i + 1}`,
    type: types[Math.floor(Math.random() * types.length)],
    source: sources[Math.floor(Math.random() * sources.length)],
    time: new Date(Date.now() - Math.random() * 86400000).toLocaleTimeString(),
    severity: severities[Math.floor(Math.random() * severities.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    confidence: Math.floor(Math.random() * 30 + 70),
    location: locations[Math.floor(Math.random() * locations.length)],
  }));
};

export const generateVideoFeeds = (): VideoFeed[] => {
  return [
    {
      id: 'feed-1',
      name: 'Drone 1',
      type: 'drone',
      status: 'live',
      resolution: '4K',
      location: 'North Perimeter',
      coordinates: '34.0522°N, 118.2437°W',
      lastDetection: 'Suspicious Movement',
      timestamp: new Date().toLocaleString(),
    },
    {
      id: 'feed-2',
      name: 'Drone 2',
      type: 'drone',
      status: 'live',
      resolution: '4K',
      location: 'East Gate',
      coordinates: '34.0530°N, 118.2420°W',
      timestamp: new Date().toLocaleString(),
    },
    {
      id: 'feed-3',
      name: 'Body Cam Alpha',
      type: 'body-cam',
      status: 'live',
      resolution: 'HD',
      location: 'Building A',
      coordinates: '34.0525°N, 118.2440°W',
      lastDetection: 'Weapon Detected',
      timestamp: new Date().toLocaleString(),
    },
    {
      id: 'feed-4',
      name: 'Fixed Cam 3',
      type: 'fixed',
      status: 'live',
      resolution: 'HD',
      location: 'South Entrance',
      coordinates: '34.0518°N, 118.2435°W',
      timestamp: new Date().toLocaleString(),
    },
    {
      id: 'feed-5',
      name: 'Robot Patrol',
      type: 'robot',
      status: 'live',
      resolution: '4K',
      location: 'Parking Zone',
      coordinates: '34.0520°N, 118.2445°W',
      timestamp: new Date().toLocaleString(),
    },
    {
      id: 'feed-6',
      name: 'Drone 3',
      type: 'drone',
      status: 'offline',
      resolution: '4K',
      location: 'West Wing',
      coordinates: '34.0515°N, 118.2450°W',
      timestamp: new Date().toLocaleString(),
    },
  ];
};

export const generateChartData = (type: 'pie' | 'line' | 'bar'): ChartData[] => {
  if (type === 'pie') {
    return [
      { name: 'Weapons', value: 23, color: '#FF4C4C' },
      { name: 'Movement', value: 45, color: '#00B4D8' },
      { name: 'Access', value: 18, color: '#21C55D' },
      { name: 'Breach', value: 14, color: '#FFA500' },
    ];
  }

  if (type === 'line') {
    return Array.from({ length: 7 }, (_, i) => ({
      name: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      value: Math.floor(Math.random() * 50 + 20),
    }));
  }

  return [
    { name: 'Weapons', value: 23 },
    { name: 'Movement', value: 45 },
    { name: 'Access', value: 18 },
    { name: 'Breach', value: 14 },
    { name: 'Loitering', value: 32 },
  ];
};

export const generateStatsSummary = (): StatsSummary => {
  return {
    totalAlerts: Math.floor(Math.random() * 200 + 100),
    peakTime: '14:30 - 15:45',
    frequentThreat: 'Suspicious Movement',
    resolvedToday: Math.floor(Math.random() * 50 + 30),
  };
};

export const createHeatmapDataUrl = (): string => {
  const canvas = document.createElement('canvas');
  canvas.width = 320;
  canvas.height = 180;
  const ctx = canvas.getContext('2d');

  if (!ctx) return '';

  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, 320, 180);

  const gradient = ctx.createRadialGradient(160, 90, 20, 160, 90, 100);
  gradient.addColorStop(0, 'rgba(255, 76, 76, 0.8)');
  gradient.addColorStop(0.5, 'rgba(255, 165, 0, 0.6)');
  gradient.addColorStop(1, 'rgba(255, 255, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 320, 180);

  for (let i = 0; i < 5; i++) {
    const x = Math.random() * 320;
    const y = Math.random() * 180;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, 30);
    grad.addColorStop(0, 'rgba(255, 76, 76, 0.6)');
    grad.addColorStop(1, 'rgba(255, 76, 76, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 320, 180);
  }

  return canvas.toDataURL();
};
