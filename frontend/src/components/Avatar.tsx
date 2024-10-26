import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updatePosition } from '../store/playerSlice';

const Avatar: React.FC = () => {
  const player = useSelector((state: RootState) => state.player);
  const dispatch = useDispatch();

  const handleMove = (direction: 'left' | 'right' | 'up' | 'down') => {
    let newPosition = { ...player.position };
    switch (direction) {
      case 'left':
        newPosition.x -= 10;
        break;
      case 'right':
        newPosition.x += 10;
        break;
      case 'up':
        newPosition.y -= 10;
        break;
      case 'down':
        newPosition.y += 10;
        break;
    }
    dispatch(updatePosition(newPosition));
  };

  return (
    <div>
      <p>Player Position: X: {player.position.x}, Y: {player.position.y}</p>
      <button onClick={() => handleMove('left')}>Move Left</button>
      <button onClick={() => handleMove('right')}>Move Right</button>
      <button onClick={() => handleMove('up')}>Move Up</button>
      <button onClick={() => handleMove('down')}>Move Down</button>
    </div>
  );
};

export default Avatar;
