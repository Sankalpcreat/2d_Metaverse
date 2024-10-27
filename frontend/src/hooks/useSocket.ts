// 1-connection to the socket.io server 
// 2-playerMoved -check the movement from other player and update their update position in redux store
// 3-send the current player movement data to the server

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
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
