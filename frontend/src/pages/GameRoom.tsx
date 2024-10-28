import React from 'react';
import { Map } from '../components/Map';  
import { Avatar } from '../components/Avatar'; 
import { ObjectInteractions } from '../components/ObjectInteraction'; 
import { UI } from '../components/UI'; 

export const GameRoom: React.FC = () => {
  return (
    <div className="game-room">
      <h1>Game Room</h1>
      <div className="game-container">
        <Map /> 
        <Avatar />
        <ObjectInteractions /> 
        <UI /> 
      </div>
    </div>
  );
};

export default GameRoom;
