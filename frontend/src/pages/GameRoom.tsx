import React from 'react';
import Map from '../components/Map'; 
import Avatar from '../components/Avatar'; 
import UI from '../components/UI';

const GameRoom:React.FC=()=>{
    return (
        <div>
            <h2>Welcome to 2d-Metaverse</h2>
            {/* here we will incluedes thigns related to phasor  */}
            <Map/>
            <Avatar/>
            <UI/>
        </div>
    )
}
export default GameRoom