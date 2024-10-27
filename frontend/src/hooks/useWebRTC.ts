// Connection setup
// Media Stream Api capture local audio and Video
// Interactive Connectivity Establishment peer to peer via Socket.io
// local steam+remote stream+Close connection 

// Step 1: Listen for incoming WebRTC call offers
// Step 2: Listen for incoming Interactive Connectivity Establishment candidates
// Step 3: Initialize WebRTC connection
// Step 4: Capture local media (audio/video stream)
// Step 5: Create a new WebRTC PeerConnection
// Step 6: Add local audio/video tracks to the peer connection
// Step 7: Handle remote tracks (stream from the peer)
// Step 8: Handle ICE candidates - send them to the server via Socket.io
// Step 9: If an offer is received, set it as the remote description and create an answer
// Step 10: Clean up WebRTC connection


import { useEffect, useRef, useState } from 'react';
import { useSocket } from './useSocket'; 

export const useWebRTC = (peerId: string) => {
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const { sendCallRequest, onReceiveCall, onReceiveICECandidate } = useSocket();

  useEffect(() => {
    onReceiveCall(async (offer) => {
      await initializeWebRTC(offer); 
    });
    onReceiveICECandidate((candidate) => {
      peerConnectionRef.current?.addIceCandidate(new RTCIceCandidate(candidate));
    });
  }, [onReceiveCall, onReceiveICECandidate]);

  const initializeWebRTC = async (offer?: RTCSessionDescriptionInit) => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStreamRef.current = stream;

}

