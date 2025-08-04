import React from 'react';
import { Download, Copy, Share2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Signature } from '../../types';

interface SignaturePreviewProps {
  signature: Signature;
  onClose: () => void;
}

export const SignaturePreview: React.FC<SignaturePreviewProps> = ({
  signature,
  onClose,
}) => {
  const downloadSignature = () => {
    const link = document.createElement('a');
    link.download = `${signature.name}.png`;
    link.href = signature.data;
    link.click();
  };

  const copyToClipboard = async () => {
    try {
      // Convert data URL to blob
      const response = await fetch(signature.data);
      const blob = await response.blob();
      
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ]);
      
      // Show success message (you could use a toast here)
      alert('Signature copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy signature:', error);
      alert('Failed to copy signature to clipboard');
    }
  };

  const shareSignature = async () => {
    if (navigator.share) {
      try {
        const response = await fetch(signature.data);
        const blob = await response.blob();
        const file = new File([blob], `${signature.name}.png`, { type: blob.type });
        
        await navigator.share({
          title: signature.name,
          text: `My signature: ${signature.name}`,
          files: [file],
        });
      } catch (error) {
        console.error('Failed to share signature:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      copyToClipboard();
    }
  };

  return (
    <div className="space-y-6">
      {/* Signature Info */}
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">{signature.name}</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>Type: {signature.type.charAt(0).toUpperCase() + signature.type.slice(1)}</p>
          <p>Created: {new Date(signature.createdAt).toLocaleDateString()}</p>
          {signature.lastUsed && (
            <p>Last used: {new Date(signature.lastUsed).toLocaleDateString()}</p>
          )}
          {signature.isDefault && (
            <p className="text-blue-600 font-medium">⭐ Default Signature</p>
          )}
        </div>
      </div>

      {/* Signature Display */}
      <div className="border-2 border-gray-200 rounded-lg p-8 bg-gray-50">
        <div className="flex items-center justify-center min-h-32">
          {signature.type === 'drawn' || signature.type === 'uploaded' ? (
            <img
              src={signature.data}
              alt={signature.name}
              className="max-w-full max-h-32 object-contain"
            />
          ) : (
            <div
              className="text-center"
              style={{
                fontFamily: signature.font || 'Arial',
                fontSize: `${signature.size || 24}px`,
                color: signature.color || '#000000',
                fontStyle: signature.style?.includes('italic') ? 'italic' : 'normal',
                fontWeight: signature.style?.includes('bold') ? 'bold' : 'normal',
              }}
            >
              {signature.data}
            </div>
          )}
        </div>
      </div>

      {/* Different Size Previews */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Size Previews</h4>
        <div className="grid grid-cols-3 gap-4">
          {['Small', 'Medium', 'Large'].map((size, index) => {
            const scale = [0.5, 0.75, 1][index];
            return (
              <div key={size} className="text-center">
                <p className="text-sm text-gray-600 mb-2">{size}</p>
                <div className="border border-gray-200 rounded p-4 bg-white min-h-16 flex items-center justify-center">
                  {signature.type === 'drawn' || signature.type === 'uploaded' ? (
                    <img
                      src={signature.data}
                      alt={signature.name}
                      className="max-w-full max-h-12 object-contain"
                      style={{ transform: `scale(${scale})` }}
                    />
                  ) : (
                    <div
                      style={{
                        fontFamily: signature.font || 'Arial',
                        fontSize: `${(signature.size || 24) * scale}px`,
                        color: signature.color || '#000000',
                        fontStyle: signature.style?.includes('italic') ? 'italic' : 'normal',
                        fontWeight: signature.style?.includes('bold') ? 'bold' : 'normal',
                      }}
                    >
                      {signature.data}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Technical Details */}
      {signature.type === 'typed' && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Technical Details</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Font: {signature.font}</p>
            <p>Size: {signature.size}px</p>
            <p>Color: {signature.color}</p>
            <p>Style: {signature.style || 'Normal'}</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={downloadSignature}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          
          <Button variant="outline" size="sm" onClick={copyToClipboard}>
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          
          <Button variant="outline" size="sm" onClick={shareSignature}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
        
        <Button onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};