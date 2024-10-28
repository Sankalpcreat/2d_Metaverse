import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updatePlayerPosition } from '../store/playerSlice';
import { useSocket } from './useSocket';


// Custom hook to handle player movement and send updates to the server
export const usePlayerMovement = () => {
  const dispatch = useDispatch();
  const { sendPlayerMovement } = useSocket();
  // useEffect hook to add keyboard event
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      let movement = { x: 0, y: 0 };

      if (event.key === 'ArrowLeft') {
        movement = { x: -10, y: 0 };
      } else if (event.key === 'ArrowRight') {
        movement = { x: 10, y: 0 };
      } else if (event.key === 'ArrowUp') {
        movement = { x: 0, y: -10 };
      } else if (event.key === 'ArrowDown') {
        movement = { x: 0, y: 10 };
      }

      if (movement.x !== 0 || movement.y !== 0) {
        dispatch(updatePlayerPosition(movement));
        sendPlayerMovement(movement);
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [dispatch, sendPlayerMovement]);

  return null;
};
