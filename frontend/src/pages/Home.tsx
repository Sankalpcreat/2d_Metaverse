import React from "react";
import Navbar from "../components/Navbar/Navbar";

const Home: React.FC = () => {
  return (
    <div className="h-screen w-screen bg-[#282d4e] text-white">
      <Navbar />
      <div>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Link to="/signup">Sign Up</Link>
      </div>
      <div>
        <Link to="/game-room">Enter Game Room</Link>
      </div>
    </div>
  );
};

export default Home;
