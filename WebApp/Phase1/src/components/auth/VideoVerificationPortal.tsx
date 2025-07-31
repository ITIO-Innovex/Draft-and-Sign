import React, { useState, useRef, useEffect } from 'react';
import { Video, Camera, Mic, MicOff, VideoOff, Phone, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';

interface VideoVerificationPortalProps {
  onSuccess: (verificationData: any) => void;
  onError: (error: string) => void;
  onCancel: () => void;
}

interface VerificationAgent {
  id: string;
  name: string;
  avatar: string;
  languages: string[];
  rating: number;
  available: boolean;
}

export const VideoVerificationPortal: React.FC<VideoVerificationPortalProps> = ({
  onSuccess,
  onError,
  onCancel,
}) => {
  const [step, setStep] = useState<'prepare' | 'connect' | 'verify' | 'complete'>('prepare');
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [verificationCode, setVerificationCode] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<VerificationAgent | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'failed'>('connecting');
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'in_progress' | 'success' | 'failed'>('pending');
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const mockAgents: VerificationAgent[] = [
    {
      id: 'agent_1',
      name: 'Sarah Johnson',
      avatar: 'SJ',
      languages: ['English', 'Spanish'],
      rating: 4.9,
      available: true,
    },
    {
      id: 'agent_2',
      name: 'Michael Chen',
      avatar: 'MC',
      languages: ['English', 'Mandarin'],
      rating: 4.8,
      available: true,
    },
    {
      id: 'agent_3',
      name: 'Emma Rodriguez',
      avatar: 'ER',
      languages: ['English', 'Spanish', 'French'],
      rating: 4.9,
      available: false,
    },
  ];

  useEffect(() => {
    if (step === 'prepare') {
      startLocalVideo();
    }
  }, [step]);

  const startLocalVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      onError('Failed to access camera and microphone');
    }
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoEnabled;
      }
    }
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isAudioEnabled;
      }
    }
  };

  const startVerification = (agent: VerificationAgent) => {
    setSelectedAgent(agent);
    setStep('connect');
    setConnectionStatus('connecting');
    
    // Simulate connection process
    setTimeout(() => {
      setConnectionStatus('connected');
      setStep('verify');
      setVerificationStatus('in_progress');
      
      // Simulate verification process
      setTimeout(() => {
        setVerificationStatus('success');
        setStep('complete');
        setTimeout(() => {
          onSuccess({
            agent: agent.name,
            verificationCode,
            timestamp: new Date().toISOString(),
            method: 'video_verification',
          });
        }, 2000);
      }, 10000);
    }, 3000);
  };

  const endCall = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    onCancel();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Video Identity Verification</h2>
        <p className="text-gray-600">
          Connect with a verification agent for live identity confirmation
        </p>
      </div>

      {/* Preparation Step */}
      {step === 'prepare' && (
        <div className="space-y-6">
          {/* Camera Preview */}
          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Camera Setup</h3>
              
              <div className="relative">
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  className="w-full h-64 bg-gray-100 rounded-lg object-cover"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  <Button
                    variant={isVideoEnabled ? "outline" : "danger"}
                    size="sm"
                    onClick={toggleVideo}
                  >
                    {isVideoEnabled ? <Camera className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant={isAudioEnabled ? "outline" : "danger"}
                    size="sm"
                    onClick={toggleAudio}
                  >
                    {isAudioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Before you start:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Ensure you have good lighting</li>
                  <li>• Have your government-issued ID ready</li>
                  <li>• Find a quiet location</li>
                  <li>• Check your camera and microphone</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Available Agents */}
          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Available Verification Agents</h3>
              
              <div className="space-y-3">
                {mockAgents.filter(agent => agent.available).map((agent) => (
                  <div
                    key={agent.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => startVerification(agent)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-white">{agent.avatar}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{agent.name}</p>
                        <p className="text-sm text-gray-600">
                          Languages: {agent.languages.join(', ')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-yellow-600">★ {agent.rating}</span>
                      <Button size="sm">
                        Connect
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Connection Step */}
      {step === 'connect' && (
        <Card className="text-center">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
              <span className="text-lg font-medium text-white">{selectedAgent?.avatar}</span>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Connecting to {selectedAgent?.name}
              </h3>
              <p className="text-gray-600">
                Please wait while we establish the connection...
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
            
            <Button variant="outline" onClick={endCall}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Verification Step */}
      {step === 'verify' && (
        <div className="space-y-6">
          {/* Video Call Interface */}
          <Card>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Video Verification with {selectedAgent?.name}
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Connected</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Remote Video */}
                <div className="relative">
                  <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-lg font-medium text-white">{selectedAgent?.avatar}</span>
                      </div>
                      <p className="text-sm text-gray-600">{selectedAgent?.name}</p>
                    </div>
                  </div>
                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                    Agent
                  </div>
                </div>
                
                {/* Local Video */}
                <div className="relative">
                  <video
                    ref={localVideoRef}
                    autoPlay
                    muted
                    className="w-full h-48 bg-gray-100 rounded-lg object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                    You
                  </div>
                  <div className="absolute bottom-2 right-2 flex space-x-1">
                    <Button
                      variant={isVideoEnabled ? "outline" : "danger"}
                      size="sm"
                      onClick={toggleVideo}
                    >
                      {isVideoEnabled ? <Camera className="h-3 w-3" /> : <VideoOff className="h-3 w-3" />}
                    </Button>
                    <Button
                      variant={isAudioEnabled ? "outline" : "danger"}
                      size="sm"
                      onClick={toggleAudio}
                    >
                      {isAudioEnabled ? <Mic className="h-3 w-3" /> : <MicOff className="h-3 w-3" />}
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button variant="danger" onClick={endCall}>
                  <Phone className="mr-2 h-4 w-4" />
                  End Call
                </Button>
              </div>
            </div>
          </Card>

          {/* Verification Instructions */}
          <Card className="bg-blue-50 border-blue-200">
            <div className="space-y-3">
              <h4 className="font-medium text-blue-900">Verification Instructions</h4>
              <div className="text-sm text-blue-800 space-y-2">
                <p>1. Show your government-issued ID to the camera</p>
                <p>2. Follow the agent's instructions for document verification</p>
                <p>3. Answer any security questions if requested</p>
                <p>4. Wait for verification confirmation</p>
              </div>
            </div>
          </Card>

          {/* Verification Code Input */}
          <Card>
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Verification Code</h4>
              <p className="text-sm text-gray-600">
                The agent will provide you with a verification code during the call.
              </p>
              <Input
                label="Enter Verification Code"
                placeholder="Enter the code provided by the agent"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>
          </Card>
        </div>
      )}

      {/* Completion Step */}
      {step === 'complete' && (
        <Card className="text-center">
          <div className="space-y-6">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Verification Successful!
              </h3>
              <p className="text-gray-600">
                Your identity has been successfully verified by {selectedAgent?.name}.
              </p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-sm text-green-800 space-y-1">
                <p><strong>Verification Code:</strong> {verificationCode}</p>
                <p><strong>Agent:</strong> {selectedAgent?.name}</p>
                <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                <p><strong>Time:</strong> {new Date().toLocaleTimeString()}</p>
              </div>
            </div>
            
            <Button onClick={() => onSuccess({
              agent: selectedAgent?.name,
              verificationCode,
              timestamp: new Date().toISOString(),
              method: 'video_verification',
            })}>
              Continue
            </Button>
          </div>
        </Card>
      )}

      {/* Security Notice */}
      <Card className="bg-yellow-50 border-yellow-200">
        <div className="space-y-2">
          <h4 className="font-medium text-yellow-900">Privacy & Security</h4>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Video calls are encrypted end-to-end</li>
            <li>• Recordings are stored securely for compliance purposes</li>
            <li>• Your personal information is protected according to our privacy policy</li>
            <li>• Verification agents are trained and certified professionals</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};