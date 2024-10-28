import { useEffect, useRef, useState, useCallback } from 'react';
import { useSocket } from './useSocket';

export const useWebRTC = () => {
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const { sendCallRequest, onReceiveCall, onReceiveICECandidate } = useSocket();
  const [isConnected, setIsConnected] = useState(false);

  const initializeWebRTC = useCallback(async (offer?: RTCSessionDescriptionInit) => {
     // Step 1: Access the user's media devices (camera and microphone)
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStreamRef.current = stream;
 // Step 2: Create a new RTCPeerConnection instance
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });
    peerConnectionRef.current = peerConnection;
    // Step 3: Add local media tracks (audio and video) to the peer connection

    stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
    // Step 4: Listen for remote media tracks from the peer and save the remote stream
    peerConnection.ontrack = (event) => {
      remoteStreamRef.current = event.streams[0];
    };
    // Step 5: Listen for ICE candidates and send them to the signaling server
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        sendCallRequest('iceCandidate', event.candidate);
      }
    };
   // Step 6: If an offer is provided (callee scenario), set the remote description and create an answer
    if (offer) {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      sendCallRequest('answer', answer);
    } else {
        // Step 7: If no offer (caller scenario), create and send an offer
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      sendCallRequest('offer', offer);
    }

    setIsConnected(true);
  }, [sendCallRequest]);

  useEffect(() => {
      // Listen for an incoming offer and initialize WebRTC as the callee 
    onReceiveCall(async (offer) => {
      await initializeWebRTC(offer);
    });

    onReceiveICECandidate((candidate) => {
      peerConnectionRef.current?.addIceCandidate(new RTCIceCandidate(candidate));
    });
  }, [initializeWebRTC, onReceiveCall, onReceiveICECandidate]);

  const closeConnection = () => {
    peerConnectionRef.current?.close();
    peerConnectionRef.current = null;
    localStreamRef.current?.getTracks().forEach(track => track.stop());
    setIsConnected(false);
  };

  return {
    localStream: localStreamRef.current,
    remoteStream: remoteStreamRef.current,
    isConnected,
    closeConnection,
  };
};
