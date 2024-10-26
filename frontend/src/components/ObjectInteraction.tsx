import React from 'react';
import { useDispatch } from 'react-redux';
import { updateMultiplayerData } from '../store/gameSlice';

const ObjectInteractions: React.FC = () => {
  const dispatch = useDispatch();

  const handleInteract = (object: string) => {
   
    dispatch(updateMultiplayerData({ object, interaction: 'used' }));
  };

  return (
    <div>
      <p>Interact with Objects:</p>
      <button onClick={() => handleInteract('chair')}>Sit on Chair</button>
      <button onClick={() => handleInteract('door')}>Open Door</button>
    </div>
  );
};

export default ObjectInteractions;
