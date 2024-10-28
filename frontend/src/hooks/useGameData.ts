import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setRoomId } from '../store/gameSlice';


// Custom hook to fetch game data and manage state
export const useGameData = () => {
  const [loading, setLoading] = useState(true);
    // Redux dispatch to send actions to the store
  const dispatch = useDispatch();
  const { sendCallRequest } = useSocket();

  useEffect(() => {
    // Asynchronous function to fetch the game data from the API
    const fetchGameData = async () => {
      try {
        const response = await fetch('/api/gameData'); // Fetch game data from API
        const data = await response.json();
        // Set the room ID in Redux
        dispatch(setRoomId(data.roomId)); 
     
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch game data', error);
      }
    };

    fetchGameData();
  }, [dispatch]);

  return { loading };
};
