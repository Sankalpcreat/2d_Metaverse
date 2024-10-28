import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const UI: React.FC = () => {

  // Select player list from the Redux store
  const players = useSelector((state: RootState) => state.game.players); 
  return (
    <div className="ui-container">
      <div className="player-list">
        <h2>Players in the Room</h2>
        <ul>
          {players.map((player, index) => (
            <li key={index}>{player}</li>
          ))}
        </ul>
      </div>

     
      <div className="menu">
        <h3>Game Menu</h3>
        <button onClick={() => console.log('Game Started')}>Start Game</button>
        <button onClick={() => console.log('Game Settings')}>Settings</button>
        <button onClick={() => console.log('Exit Game')}>Exit</button>
      </div>
    </div>
  );
};
