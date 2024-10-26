import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';  
import { Provider } from 'react-redux';
import store from './store';
import LoginPage from './pages/LoginPage'; 
import SignupPage from './pages/SignupPage';  
import GameRoom from './pages/GameRoom';  


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/game-room" element={<GameRoom />} />
        </Routes>
      </Router>
      </Provider>
  );
};

export default App;
