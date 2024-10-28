import { useEffect, useRef, useState, useCallback } from 'react';
import { useSocket } from './useSocket';

export const useWebRTC = () => {
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const { sendCallRequest, onReceiveCall, onReceiveICECandidate } = useSocket();
  const [isConnected, setIsConnected] = useState(false);

  const initializeWebRTC = useCallback(async (offer?: RTCSessionDescriptionInit) => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStreamRef.current = stream;

    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });
    peerConnectionRef.current = peerConnection;

    stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

    peerConnection.ontrack = (event) => {
      remoteStreamRef.current = event.streams[0];
    };

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        sendCallRequest('iceCandidate', event.candidate);
      }
    };

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

  useEffect(() => {
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
