import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import PlantDetailPage from './pages/PlantDetailPage';
import SearchResultsPage from './pages/SearchResultsPage';
import LoginPage from './pages/LoginPage';
import NearbyNurseries from './pages/NearbyNurseries';
import Identify from './pages/Identify';
import ProtectedRoute from './components/ProtectedRoute';
import AskVedaChat from './components/AskVedaChat';
import Sidebar from './components/Sidebar';
import ImageUploader from "./components/ImageUploader";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Routes>
        {/* Login is full screen, no sidebar */}
        <Route path="/login" element={<LoginPage />} />

        {/* All other routes share one single Sidebar */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex flex-row h-screen overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto relative">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/nearby-nurseries" element={<NearbyNurseries />} />
                    <Route path="/identify" element={<Identify />} />
                    <Route path="/category/:categoryName" element={<CategoryPage />} />
                    <Route path="/plant/:id" element={<PlantDetailPage />} />
                    <Route path="/search" element={<SearchResultsPage />} />
                  </Routes>
                </main>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
      <AskVedaChat />
    </div>
  );
}

export default App;