import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updatePosition } from '../store/playerSlice';

const SOCKET_SERVER_URL = 'http://localhost:4000';  
// Establish a connection to the Socket.io server when the component mounts and disconnect when it unmounts.

export const useSocket = () => {
  const dispatch = useDispatch();
  const player = useSelector((state: RootState) => state.player);

// Use useSelector to access the current player's state from the Redux store (including position and ID).
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    // Use socket.on to listen for the playerMoved event, which will provide the other player’s position.
    newSocket.on('playerMoved', (data: { id: string, position: { x: number, y: number } }) => {
      if (data.id !== player.id) {
       
        dispatch(updatePosition(data.position)); 
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [dispatch, player.id]);

  // When the player moves, emit the movePlayer event to the server, sending the player's ID and new position.

  const sendPlayerMovement = (position: { x: number, y: number }) => {
    if (socket) {
      socket.emit('movePlayer', { id: player.id, position });
    }
  };

  return { sendPlayerMovement };
};
