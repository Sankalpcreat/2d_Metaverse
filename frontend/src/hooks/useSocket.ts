
// Handle Incoming Movement: Listen for playerMoved events from other players and update their position in the Redux store.
// Send Player Movement: Emit the player's movement to the server using sendPlayerMovement.
// Return Hook API: Return the necessary function from the useSocket hook to use in components.
// Use the Hook in Components: Use the useSocket hook to send and receive real-time movement data in your game.

// Install Dependencies: Install Socket.io-client and Redux.
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';

// Create useSocket Hook: Establish a connection to the Socket.io server and handle the player's movement.
import { RootState } from '../store';
import { updatePosition } from '../store/playerSlice';

const SOCKET_SERVER_URL = 'http://localhost:4000';  

export const useSocket = () => {
  const dispatch = useDispatch();
  const player = useSelector((state: RootState) => state.player);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    
    newSocket.on('playerMoved', (data: { id: string, position: { x: number, y: number } }) => {
      if (data.id !== player.id) {
       
        dispatch(updatePosition(data.position)); 
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [dispatch, player.id]);


  const sendPlayerMovement = (position: { x: number, y: number }) => {
    if (socket) {
      socket.emit('movePlayer', { id: player.id, position });
    }
  };

  return { sendPlayerMovement };
};
