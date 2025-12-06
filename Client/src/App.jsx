import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import PlantDetailPage from './pages/PlantDetailPage';
import SearchResultsPage from './pages/SearchResultsPage';

function App() {
  return (
    <div>
      <Routes>
        {/* Route for the homepage */}
        <Route path="/" element={<HomePage />} />

        {/* Route for the category pages */}
        <Route path="/category/:categoryName" element={<CategoryPage />} />

        <Route path="/plant/:id" element={<PlantDetailPage />}/>
        <Route path="/search" element={<SearchResultsPage />}/>
      </Routes>
    </div>
  );
}

export default App;
