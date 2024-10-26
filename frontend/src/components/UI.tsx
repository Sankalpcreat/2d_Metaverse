
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const UI: React.FC = () => {
  const player = useSelector((state: RootState) => state.player);
  const gameState = useSelector((state: RootState) => state.game);

  return (
    <div>
      <h2>Game UI</h2>
      <p>Current Room: {gameState.currentRoom}</p>
      <p>Player: {player.username}</p>
      <p>Position: X: {player.position.x}, Y: {player.position.y}</p>
   
    </div>
  );
};

export default UI;
