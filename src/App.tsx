import { useState } from 'react';
import Navigation from './components/Navigation';
import VideoUploadPage from './pages/VideoUploadPage';
import LiveFeedsPage from './pages/LiveFeedsPage';
import LiveAlertsPage from './pages/LiveAlertsPage';
import StatisticsPage from './pages/StatisticsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('feeds');

  const renderPage = () => {
    switch (currentPage) {
      case 'upload':
        return <VideoUploadPage />;
      case 'feeds':
        return <LiveFeedsPage />;
      case 'alerts':
        return <LiveAlertsPage />;
      case 'stats':
        return <StatisticsPage />;
      default:
        return <VideoUploadPage />;
    }
  };

  return (
    <div className="min-h-screen bg-navy">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>{renderPage()}</main>
    </div>
  );
}

export default App;
