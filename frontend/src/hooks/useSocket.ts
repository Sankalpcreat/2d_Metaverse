import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updatePlayerPosition } from '../store/gameSlice';

const SOCKET_SERVER_URL = 'http://localhost:3000'; // Replace with your server's URL

// Custom hook to manage the Socket.io connection and real-time player movement
export const useSocket = () => {
  const dispatch = useDispatch();
  const player = useSelector((state: RootState) => state.player);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
     // Establish a connection to the Socket.io server
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

// Listen for the 'playerMoved' event from the server
    newSocket.on('playerMoved', (data: { id: string, position: { x: number; y: number } }) => {
      if (data.id !== player.id) {
        dispatch(updatePlayerPosition({ id: data.id, x: data.position.x, y: data.position.y }));
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [dispatch, player.id]);

  // Function to send the player's movement data to the server
  const sendPlayerMovement = (position: { x: number, y: number }) => {
    if (socket) {
      socket.emit('movePlayer', { id: player.id, position });
    }
  };

  return { sendPlayerMovement };
};
