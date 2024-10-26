import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updatePosition } from '../store/playerSlice';
import { setRoom } from '../store/gameSlice';

const GameRoom: React.FC = () => {
  const player = useSelector((state: RootState) => state.player);
  const currentRoom = useSelector((state: RootState) => state.game.currentRoom);
  const dispatch = useDispatch();

  const movePlayer = () => {
    dispatch(updatePosition({ x: player.position.x + 10, y: player.position.y }));
  };

  const changeRoom = () => {
    dispatch(setRoom('battle-arena'));
  };

  return (
    <div>
      <h1>Game Room</h1>
      <p>Player: {player.username}</p>
      <button onClick={movePlayer}>Move Player</button>
      <button onClick={changeRoom}>Go to Battle Arena</button>
    </div>
  );
};

export default GameRoom;
