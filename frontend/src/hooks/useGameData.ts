import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setRoomId } from '../store/gameSlice';
import { useSocket } from './useSocket';

export const useGameData = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { sendCallRequest } = useSocket();

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await fetch('/api/gameData'); // Fetch game data from API
        const data = await response.json();
        dispatch(setRoomId(data.roomId)); // Set the room ID in Redux
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch game data', error);
      }
    };

    fetchGameData();
  }, [dispatch]);

  return { loading };
};
