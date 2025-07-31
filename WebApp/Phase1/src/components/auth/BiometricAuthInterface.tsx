import React, { useState, useRef } from 'react';
import { Fingerprint, Eye, Mic, Camera, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface BiometricMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  available: boolean;
  accuracy: number;
}

interface BiometricAuthInterfaceProps {
  onSuccess: (method: string, data: any) => void;
  onError: (error: string) => void;
  onCancel: () => void;
}

export const BiometricAuthInterface: React.FC<BiometricAuthInterfaceProps> = ({
  onSuccess,
  onError,
  onCancel,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureStatus, setCaptureStatus] = useState<'idle' | 'capturing' | 'success' | 'error'>('idle');
  const [captureProgress, setCaptureProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const biometricMethods: BiometricMethod[] = [
    {
      id: 'fingerprint',
      name: 'Fingerprint',
      description: 'Touch sensor authentication',
      icon: Fingerprint,
      available: true,
      accuracy: 99.8,
    },
    {
      id: 'face',
      name: 'Face Recognition',
      description: 'Facial biometric verification',
      icon: Eye,
      available: true,
      accuracy: 99.2,
    },
    {
      id: 'voice',
      name: 'Voice Recognition',
      description: 'Voice pattern authentication',
      icon: Mic,
      available: true,
      accuracy: 97.5,
    },
    {
      id: 'retinal',
      name: 'Retinal Scan',
      description: 'Eye retina pattern verification',
      icon: Eye,
      available: false,
      accuracy: 99.9,
    },
  ];

  const startCapture = async (methodId: string) => {
    setSelectedMethod(methodId);
    setIsCapturing(true);
    setCaptureStatus('capturing');
    setCaptureProgress(0);

    try {
      // Simulate biometric capture process
      const progressInterval = setInterval(() => {
        setCaptureProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setCaptureStatus('success');
            setTimeout(() => {
              onSuccess(methodId, { captured: true, confidence: 0.98 });
            }, 1000);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      // For face recognition, start camera
      if (methodId === 'face' && videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      }

    } catch (error) {
      setCaptureStatus('error');
      onError('Failed to access biometric sensor');
    }
  };

  const stopCapture = () => {
    setIsCapturing(false);
    setCaptureStatus('idle');
    setCaptureProgress(0);
    setSelectedMethod(null);

    // Stop camera if active
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const getStatusIcon = () => {
    switch (captureStatus) {
      case 'capturing':
        return <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>;
      case 'success':
        return <CheckCircle className="h-8 w-8 text-green-600" />;
      case 'error':
        return <XCircle className="h-8 w-8 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusMessage = () => {
    switch (captureStatus) {
      case 'capturing':
        return 'Capturing biometric data...';
      case 'success':
        return 'Biometric verification successful!';
      case 'error':
        return 'Biometric capture failed. Please try again.';
      default:
        return 'Select a biometric method to continue';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Biometric Authentication</h2>
        <p className="text-gray-600">
          Use your biometric data for secure authentication
        </p>
      </div>

      {/* Biometric Methods */}
      {!selectedMethod && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {biometricMethods.map((method) => {
            const Icon = method.icon;
            return (
              <Card
                key={method.id}
                className={`cursor-pointer transition-all duration-200 ${
                  method.available
                    ? 'hover:shadow-lg hover:border-blue-300'
                    : 'opacity-60 cursor-not-allowed'
                }`}
                onClick={() => method.available && startCapture(method.id)}
              >
                <div className="text-center space-y-3">
                  <div className="p-4 bg-blue-50 rounded-lg mx-auto w-fit">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900">{method.name}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                    <div className="mt-2 flex items-center justify-center space-x-2">
                      <span className="text-xs text-gray-500">Accuracy:</span>
                      <span className="text-xs font-medium text-green-600">{method.accuracy}%</span>
                    </div>
                  </div>
                  
                  {method.available ? (
                    <Button variant="outline" size="sm" className="w-full">
                      Use {method.name}
                    </Button>
                  ) : (
                    <span className="text-sm text-gray-500">Not Available</span>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Capture Interface */}
      {selectedMethod && (
        <Card className="text-center">
          <div className="space-y-6">
            {/* Method Info */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {biometricMethods.find(m => m.id === selectedMethod)?.name} Authentication
              </h3>
              <p className="text-gray-600">
                {biometricMethods.find(m => m.id === selectedMethod)?.description}
              </p>
            </div>

            {/* Capture Area */}
            <div className="relative">
              {selectedMethod === 'face' && (
                <div className="relative w-64 h-48 mx-auto bg-gray-100 rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                  />
                  {isCapturing && (
                    <div className="absolute inset-0 border-4 border-blue-500 rounded-lg animate-pulse"></div>
                  )}
                </div>
              )}

              {selectedMethod === 'fingerprint' && (
                <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center border-4 border-dashed border-gray-300">
                  <Fingerprint className={`h-16 w-16 ${isCapturing ? 'text-blue-600 animate-pulse' : 'text-gray-400'}`} />
                </div>
              )}

              {selectedMethod === 'voice' && (
                <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center border-4 border-dashed border-gray-300">
                  <Mic className={`h-16 w-16 ${isCapturing ? 'text-blue-600 animate-pulse' : 'text-gray-400'}`} />
                </div>
              )}
            </div>

            {/* Progress */}
            {isCapturing && (
              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-200"
                    style={{ width: `${captureProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">{captureProgress}% complete</p>
              </div>
            )}

            {/* Status */}
            <div className="flex flex-col items-center space-y-2">
              {getStatusIcon()}
              <p className="text-sm text-gray-600">{getStatusMessage()}</p>
            </div>

            {/* Instructions */}
            {selectedMethod === 'fingerprint' && captureStatus === 'capturing' && (
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  Place your finger on the sensor and hold steady
                </p>
              </div>
            )}

            {selectedMethod === 'face' && captureStatus === 'capturing' && (
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  Look directly at the camera and remain still
                </p>
              </div>
            )}

            {selectedMethod === 'voice' && captureStatus === 'capturing' && (
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  Please say: "My voice is my password"
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-center space-x-3">
              {isCapturing ? (
                <Button variant="outline" onClick={stopCapture}>
                  Cancel Capture
                </Button>
              ) : (
                <>
                  <Button variant="outline" onClick={() => setSelectedMethod(null)}>
                    Back
                  </Button>
                  <Button onClick={onCancel}>
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Security Notice */}
      <Card className="bg-yellow-50 border-yellow-200">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-900">Security Notice</h4>
            <p className="text-sm text-yellow-800 mt-1">
              Your biometric data is processed locally and never stored on our servers. 
              Only a mathematical representation is used for authentication.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};