import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';  
import LoginPage from './pages/LoginPage'; 
import SignupPage from './pages/SignupPage';  
import GameRoom from './pages/GameRoom';  
import { AuthProvider } from './auth/AuthProvider';  //this is due to global state management because mutilplayer game

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/game-room" element={<GameRoom />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
