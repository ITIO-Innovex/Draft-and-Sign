import React, { useState } from 'react';
import { Plus, Edit, Trash2, Star, StarOff, Eye } from 'lucide-react';
import { useProfileStore } from '../../store/profileStore';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { SignatureCreator } from './SignatureCreator';
import { SignaturePreview } from './SignaturePreview';
import { Signature } from '../../types';

export const SignatureLibrary: React.FC = () => {
  const { user, signatures, deleteSignature, setDefaultSignature } = useProfileStore();
  const [showCreator, setShowCreator] = useState(false);
  const [editingSignature, setEditingSignature] = useState<Signature | null>(null);
  const [previewSignature, setPreviewSignature] = useState<Signature | null>(null);

  const maxSignatures = user?.role === 'regularUser' ? 3 : Infinity;
  const canCreateMore = signatures.length < maxSignatures;

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this signature?')) {
      await deleteSignature(id);
    }
  };

  const handleSetDefault = async (id: number) => {
    await setDefaultSignature(id);
  };

  const getSignatureTypeIcon = (type: string) => {
    switch (type) {
      case 'drawn':
        return '✏️';
      case 'typed':
        return '📝';
      case 'uploaded':
        return '📁';
      default:
        return '✏️';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Signature Library</h1>
          <p className="mt-1 text-gray-600">
            Create and manage your digital signatures.
            {user?.role === 'regularUser' && (
              <span className="text-sm text-gray-500 ml-2">
                ({signatures.length}/{maxSignatures} signatures used)
              </span>
            )}
          </p>
        </div>
        
        <Button
          onClick={() => setShowCreator(true)}
          disabled={!canCreateMore}
          className="flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Signature
        </Button>
      </div>

      {/* Signatures Grid */}
      {signatures.length === 0 ? (
        <Card className="text-center py-12">
          <div className="space-y-4">
            <div className="text-6xl">✏️</div>
            <h3 className="text-lg font-medium text-gray-900">No signatures yet</h3>
            <p className="text-gray-600">
              Create your first digital signature to get started.
            </p>
            <Button onClick={() => setShowCreator(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Signature
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {signatures.map((signature) => (
            <Card key={signature.id} className="hover:shadow-lg transition-shadow duration-200">
              <div className="space-y-4">
                {/* Signature Preview */}
                <div className="h-24 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
                  {signature.type === 'drawn' ? (
                    <img
                      src={signature.data}
                      alt={signature.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : signature.type === 'typed' ? (
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
                  ) : (
                    <img
                      src={signature.data}
                      alt={signature.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  )}
                </div>

                {/* Signature Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{signature.name}</h3>
                    <div className="flex items-center space-x-1">
                      <span className="text-lg">{getSignatureTypeIcon(signature.type)}</span>
                      {signature.isDefault && (
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <p>Type: {signature.type.charAt(0).toUpperCase() + signature.type.slice(1)}</p>
                    <p>Created: {new Date(signature.createdAt).toLocaleDateString()}</p>
                    {signature.lastUsed && (
                      <p>Last used: {new Date(signature.lastUsed).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setPreviewSignature(signature)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingSignature(signature)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(signature.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSetDefault(signature.id)}
                    className={signature.isDefault ? 'text-yellow-600' : 'text-gray-400'}
                  >
                    {signature.isDefault ? (
                      <Star className="h-4 w-4 fill-current" />
                    ) : (
                      <StarOff className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Usage Limit Warning */}
      {user?.role === 'regularUser' && signatures.length >= maxSignatures && (
        <Card className="bg-yellow-50 border-yellow-200">
          <div className="flex items-center space-x-3">
            <div className="text-yellow-600">⚠️</div>
            <div>
              <h3 className="font-medium text-yellow-800">Signature Limit Reached</h3>
              <p className="text-sm text-yellow-700">
                You've reached the maximum of {maxSignatures} signatures for your plan. 
                Delete an existing signature to create a new one, or upgrade your plan for unlimited signatures.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Create/Edit Signature Modal */}
      <Modal
        isOpen={showCreator || editingSignature !== null}
        onClose={() => {
          setShowCreator(false);
          setEditingSignature(null);
        }}
        title={editingSignature ? 'Edit Signature' : 'Create New Signature'}
        size="lg"
      >
        <SignatureCreator
          signature={editingSignature}
          onClose={() => {
            setShowCreator(false);
            setEditingSignature(null);
          }}
        />
      </Modal>

      {/* Preview Modal */}
      <Modal
        isOpen={previewSignature !== null}
        onClose={() => setPreviewSignature(null)}
        title="Signature Preview"
        size="md"
      >
        {previewSignature && (
          <SignaturePreview
            signature={previewSignature}
            onClose={() => setPreviewSignature(null)}
          />
        )}
      </Modal>
    </div>
  );
};