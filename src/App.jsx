import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Itinerary from './pages/Itinerary';
import ItineraryDetail from './pages/ItineraryDetail';
import PromptTemplate from './pages/PromptTemplate';
import Discover from './pages/Discover';
import Profile from './pages/Profile';
import UserInfoPage from './pages/UserInfoPage';

function App() {
  const isAuthPage = window.location.pathname === '/login' || 
                    window.location.pathname === '/signup';
  
  // Check if current path is user info page
  const isUserInfoPage = window.location.pathname.startsWith('/user/');

  return (
    <Router>
      <div className="relative w-full h-screen flex overflow-hidden">
        {/* Show sidebar only if not auth page and not user info page */}
        {!isAuthPage && !isUserInfoPage && <Sidebar />}
        
        <div className={`flex-1 relative ${!isAuthPage && !isUserInfoPage ? 'pl-24' : ''}`}>
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
            <Route path="/itinerary/:id" element={<ItineraryDetail />} />

            {/* Discover Route */}
            <Route path="/discover" element={<Discover />} />

            {/* Profile Routes */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/user/:id" element={<UserInfoPage />} />
            
            {/* Messages Route */}
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