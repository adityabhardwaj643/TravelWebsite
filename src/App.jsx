import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Itinerary from './pages/Itinerary';
import ItineraryDetail from './pages/ItineraryDetail';
import PromptTemplate from './pages/PromptTemplate';

function App() {
  const isAuthPage = window.location.pathname === '/login' ||
                    window.location.pathname === '/signup';

  return (
    <Router>
      <div className="relative w-full h-screen flex overflow-hidden">
        {!isAuthPage && <Sidebar />}
        <div className={`flex-1 relative ${!isAuthPage ? 'pl-24' : ''}`}>
          <Routes>
            {/* Default Home Route */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            
            {/* Auth Routes */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* Itinerary Routes */}
            <Route path="/itinerary" element={<Itinerary />} />
            <Route path="/create-itinerary" element={<PromptTemplate />} />
            {/* Make sure this route is exactly like this */}
            <Route path="/itinerary/:id" element={<ItineraryDetail />} />

            {/* Other Routes */}
            <Route path="/discover" element={
              <div className="p-8">
                <h1 className="text-4xl">Discover Page</h1>
              </div>
            } />
            <Route path="/profile" element={
              <div className="p-8">
                <h1 className="text-4xl">Profile Page</h1>
              </div>
            } />
            <Route path="/messages" element={
              <div className="p-8">
                <h1 className="text-4xl">Messages Page</h1>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;