// export interface Alert {
//   id: string;
//   type: string;
//   source: string;
//   time: string;
//   severity: 'critical' | 'high' | 'medium' | 'low';
//   status: 'active' | 'reviewed' | 'resolved';
//   confidence?: number;
//   location?: string;
//   snapshot?: string;
// }

// export interface DetectionInsight {
//   title: string;
//   count: number;
//   icon: string;
//   description: string;
//   trend?: 'up' | 'down' | 'stable';
// }

// export interface VideoFeed {
//   id: string;
//   name: string;
//   type: 'drone' | 'fixed' | 'body-cam' | 'robot';
//   status: 'live' | 'offline';
//   resolution: 'HD' | '4K';
//   location: string;
//   coordinates: string;
//   lastDetection?: string;
//   heatmapUrl?: string;
//   timestamp?: string;
// }

// export interface UploadedFile {
//   id: string;
//   name: string;
//   size: number;
//   uploadedAt: string;
//   status: 'processing' | 'completed' | 'failed';
//   insights?: {
//     objects: number;
//     patterns: number;
//     events: number;
//     duration: string;
//   };
// }

// export interface StatsSummary {
//   totalAlerts: number;
//   peakTime: string;
//   frequentThreat: string;
//   resolvedToday: number;
// }

// export interface ChartData {
//   name: string;
//   value: number;
//   color?: string;

// }






export interface VideoSummary {
  duration: string;
  objectsDetected: number;
  keyEvents: string[];
  suspiciousActivities: string[];
  timestampHighlights: string[];
  confidence?: number;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  uploadedAt: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  videoUrl?: string;
  insights: {
    objects: number;
    patterns: number;
    events: number;
    duration: string;
  };
  summary?: VideoSummary;
}

export interface DetectedFrame {
  id: string;
  videoId: string;
  timestamp: string;
  imageUrl: string;
  objects: string[];
  confidence: number;
}