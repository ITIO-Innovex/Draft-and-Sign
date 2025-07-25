import React, { useCallback, useState } from 'react';
import { X, Upload, FileText, AlertCircle } from 'lucide-react';

import { formatFileSize } from '../../lib/utils';
import { Button } from '../ui/button';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUPPORTED_TYPES = [
  'pdf', 'doc', 'docx', 'txt', 'rtf',
  'xls', 'xlsx', 'csv',
  'ppt', 'pptx',
  'jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff',
  'html', 'xml', 'json', 'zip'
];

export function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const uploadFiles = async (files: File[], folderId?: string | null) => console.log('Upload files:', files, 'to folder:', folderId);
  const userPermissions = { uploadLimit: 26214400 };
  const currentFolderId = null;
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(files);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
    }
  };

  const validateFiles = (files: File[]) => {
    const errors: string[] = [];
    
    files.forEach((file, index) => {
      const extension = file.name.split('.').pop()?.toLowerCase() || '';
      
      if (!SUPPORTED_TYPES.includes(extension)) {
        errors.push(`File ${index + 1}: Unsupported file type (.${extension})`);
      }
      
      if (userPermissions.uploadLimit !== -1 && file.size > userPermissions.uploadLimit) {
        errors.push(`File ${index + 1}: File size exceeds limit (${formatFileSize(userPermissions.uploadLimit)})`);
      }
    });
    
    return errors;
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    
    const errors = validateFiles(selectedFiles);
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    await uploadFiles(selectedFiles, currentFolderId);
    setSelectedFiles([]);
    onClose();
  };

  const removeFile = (index: number) => {
    setSelectedFiles(files => files.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Upload Documents</h2>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Upload Limits Info */}
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-blue-600" />
              <div className="text-sm text-blue-800">
                <p>
                  Upload limit: {userPermissions.uploadLimit === -1 
                    ? 'Unlimited' 
                    : formatFileSize(userPermissions.uploadLimit)} per file
                </p>
                <p className="text-xs mt-1">
                  Supported: PDF, Word, Excel, PowerPoint, Images, Text files
                </p>
              </div>
            </div>
          </div>

          {/* Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Drop files here or click to browse
            </h3>
            <p className="text-gray-500 mb-4">
              Select multiple files to upload them all at once
            </p>
            
            <input
              type="file"
              multiple
              accept={SUPPORTED_TYPES.map(type => `.${type}`).join(',')}
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button variant="outline" className="cursor-pointer">
                Browse Files
              </Button>
            </label>
          </div>

          {/* Selected Files */}
          {selectedFiles.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Selected Files ({selectedFiles.length})
              </h4>
              <div className="max-h-32 overflow-y-auto border border-gray-200 rounded-lg">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => removeFile(index)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {selectedFiles.length > 0 && (
              <>Total: {formatFileSize(selectedFiles.reduce((total, file) => total + file.size, 0))}</>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleUpload}
              disabled={selectedFiles.length === 0}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Upload {selectedFiles.length > 0 && `(${selectedFiles.length})`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}