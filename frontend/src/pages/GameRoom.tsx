import React from 'react';
import {Map} from '../components/Map';
import {Avatar} from '../components/Avatar';
import {ObjectInteractions} from '../components/ObjectInteraction';
import{UI} from '../components/UI';

const GameRoom: React.FC = () => {
  return (
    <div>
      <UI />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Map />
        <Avatar />
        <ObjectInteractions />
      </div>
    </div>
  );
};

export default GameRoom;
