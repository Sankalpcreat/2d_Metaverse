import { useEffect, useRef, useState, useCallback } from 'react';
import { useSocket } from './useSocket';

export const useWebRTC = () => { 
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const { sendCallRequest, onReceiveCall, onReceiveICECandidate } = useSocket();
  const [isConnected, setIsConnected] = useState(false);

// Setup Media Streams: Capture local audio/video using getUserMedia.
  const initializeWebRTC = useCallback(async (offer?: RTCSessionDescriptionInit) => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStreamRef.current = stream;

// Create Peer Connection: Initialize the RTCPeerConnection with ICE servers.
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });
    peerConnectionRef.current = peerConnection;


// Add Local Media to Connection: Add local media tracks (audio/video) to the WebRTC connection.
    stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));

// Handle Remote Media: Capture and display the remote peer’s media stream.

    peerConnection.ontrack = (event) => {
      remoteStreamRef.current = event.streams[0];
    };
// Handle ICE Candidates: Gather and send ICE candidates to the signaling server.

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        sendCallRequest('iceCandidate', event.candidate);
      }
    };

// Exchange Signaling (Offer/Answer): Send and receive WebRTC offers and answers via signaling.

    if (offer) {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      sendCallRequest('answer', answer);
    } else {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      sendCallRequest('offer', offer);
    }

    setIsConnected(true);
  }, [sendCallRequest]);  


// Handle Incoming Offers/Answers: Set up WebRTC connections upon receiving offers/answers.
  useEffect(() => {
    onReceiveCall(async (offer) => {
      await initializeWebRTC(offer);
    });
// Listen for ICE Candidates: Add ICE candidates received from the peer to the connection.
    onReceiveICECandidate((candidate) => {
      peerConnectionRef.current?.addIceCandidate(new RTCIceCandidate(candidate));
    });
  }, [initializeWebRTC, onReceiveCall, onReceiveICECandidate]);  // Added dependencies

  // Close and Clean Up: Properly close the connection and stop media streams when the call ends.
  const closeConnection = () => {
    peerConnectionRef.current?.close();
    peerConnectionRef.current = null;
    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    setIsConnected(false);
  };
// Manage Connection Status: Track the connection state to manage the UI or trigger actions.
  return {
    localStream: localStreamRef.current,
    remoteStream: remoteStreamRef.current,
    isConnected,
    closeConnection,
  };
};
