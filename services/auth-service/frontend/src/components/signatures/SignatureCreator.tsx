import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Palette, Type, Upload, Undo, Redo, RotateCcw } from 'lucide-react';
import { useProfileStore } from '../../store/profileStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Signature } from '../../types';

const signatureSchema = z.object({
  name: z.string().min(1, 'Signature name is required'),
  type: z.enum(['drawn', 'typed', 'uploaded']),
  data: z.string().min(1, 'Signature data is required'),
  font: z.string().optional(),
  color: z.string().optional(),
  size: z.number().optional(),
  style: z.string().optional(),
});

interface SignatureCreatorProps {
  signature?: Signature | null;
  onClose: () => void;
}

export const SignatureCreator: React.FC<SignatureCreatorProps> = ({
  signature,
  onClose,
}) => {
  const { addSignature, updateSignature, isLoading } = useProfileStore();
  const [activeTab, setActiveTab] = useState<'drawn' | 'typed' | 'uploaded'>('drawn');
  const [isDrawing, setIsDrawing] = useState(false);
  const [paths, setPaths] = useState<string[]>([]);
  const [undoStack, setUndoStack] = useState<string[][]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(signatureSchema),
    defaultValues: {
      name: signature?.name || '',
      type: signature?.type || 'drawn',
      data: signature?.data || '',
      font: signature?.font || 'Arial',
      color: signature?.color || '#000000',
      size: signature?.size || 24,
      style: signature?.style || 'normal',
    },
  });

  const watchedValues = watch();

  useEffect(() => {
    if (signature) {
      setActiveTab(signature.type);
      reset({
        name: signature.name,
        type: signature.type,
        data: signature.data,
        font: signature.font || 'Arial',
        color: signature.color || '#000000',
        size: signature.size || 24,
        style: signature.style || 'normal',
      });
    }
  }, [signature, reset]);

  // Canvas drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL();
      setPaths([...paths, dataURL]);
      setUndoStack([...undoStack, [...paths]]);
      setValue('data', dataURL);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setPaths([]);
        setUndoStack([]);
        setValue('data', '');
      }
    }
  };

  const undoLastStroke = () => {
    if (undoStack.length > 0) {
      const previousPaths = undoStack[undoStack.length - 1];
      setPaths(previousPaths);
      setUndoStack(undoStack.slice(0, -1));
      
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          // Redraw previous paths
          if (previousPaths.length > 0) {
            setValue('data', previousPaths[previousPaths.length - 1]);
          } else {
            setValue('data', '');
          }
        }
      }
    }
  };

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataURL = event.target?.result as string;
        setValue('data', dataURL);
      };
      reader.readAsDataURL(file);
    }
  };

  // Generate typed signature
  const generateTypedSignature = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 120;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = watchedValues.color || '#000000';
      ctx.font = `${watchedValues.style?.includes('italic') ? 'italic' : 'normal'} ${
        watchedValues.style?.includes('bold') ? 'bold' : 'normal'
      } ${watchedValues.size || 24}px ${watchedValues.font || 'Arial'}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      ctx.fillText(watchedValues.data || '', canvas.width / 2, canvas.height / 2);
      
      const dataURL = canvas.toDataURL();
      setValue('data', dataURL);
    }
  };

  useEffect(() => {
    if (activeTab === 'typed' && watchedValues.data) {
      generateTypedSignature();
    }
  }, [watchedValues.font, watchedValues.color, watchedValues.size, watchedValues.style, watchedValues.data, activeTab]);

  const onSubmit = async (data: any) => {
    try {
      if (signature) {
        await updateSignature(signature.id, data);
      } else {
        await addSignature(data);
      }
      onClose();
    } catch (error) {
      console.error('Error saving signature:', error);
    }
  };

  const fonts = [
    'Arial', 'Times New Roman', 'Helvetica', 'Georgia', 'Verdana',
    'Courier New', 'Comic Sans MS', 'Impact', 'Trebuchet MS', 'Palatino'
  ];

  const colors = [
    '#000000', '#1e40af', '#dc2626', '#059669', '#7c2d12',
    '#4338ca', '#be185d', '#0891b2', '#ea580c', '#6b21a8'
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Signature Name */}
      <Input
        {...register('name')}
        label="Signature Name"
        placeholder="Enter a name for this signature"
        error={errors.name?.message}
      />

      {/* Signature Type Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'drawn', label: 'Draw', icon: '✏️' },
            { id: 'typed', label: 'Type', icon: '📝' },
            { id: 'uploaded', label: 'Upload', icon: '📁' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id as any);
                setValue('type', tab.id as any);
              }}
              className={`
                flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Drawing Tab */}
      {activeTab === 'drawn' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Draw Your Signature</h3>
            <div className="flex items-center space-x-2">
              <Button type="button" variant="outline" size="sm" onClick={undoLastStroke}>
                <Undo className="h-4 w-4" />
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={clearCanvas}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <canvas
              ref={canvasRef}
              width={500}
              height={200}
              className="w-full h-48 border border-gray-200 rounded cursor-crosshair"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              style={{ touchAction: 'none' }}
            />
            <p className="text-sm text-gray-500 mt-2 text-center">
              Click and drag to draw your signature
            </p>
          </div>
        </div>
      )}

      {/* Typing Tab */}
      {activeTab === 'typed' && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Type Your Signature</h3>
          
          <Input
            {...register('data')}
            label="Signature Text"
            placeholder="Enter your name or initials"
            error={errors.data?.message}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Family
              </label>
              <select
                {...register('font')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {fonts.map((font) => (
                  <option key={font} value={font} style={{ fontFamily: font }}>
                    {font}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Size
              </label>
              <input
                {...register('size', { valueAsNumber: true })}
                type="range"
                min="16"
                max="48"
                className="w-full"
              />
              <div className="text-sm text-gray-500 text-center">
                {watchedValues.size}px
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color
              </label>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setValue('color', color)}
                    className={`
                      w-8 h-8 rounded border-2 transition-all duration-200
                      ${watchedValues.color === color ? 'border-gray-400 scale-110' : 'border-gray-200'}
                    `}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Style
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={watchedValues.style?.includes('bold')}
                    onChange={(e) => {
                      const currentStyle = watchedValues.style || '';
                      const newStyle = e.target.checked
                        ? currentStyle.includes('bold') ? currentStyle : `${currentStyle} bold`.trim()
                        : currentStyle.replace('bold', '').trim();
                      setValue('style', newStyle);
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm">Bold</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={watchedValues.style?.includes('italic')}
                    onChange={(e) => {
                      const currentStyle = watchedValues.style || '';
                      const newStyle = e.target.checked
                        ? currentStyle.includes('italic') ? currentStyle : `${currentStyle} italic`.trim()
                        : currentStyle.replace('italic', '').trim();
                      setValue('style', newStyle);
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm">Italic</span>
                </label>
              </div>
            </div>
          </div>

          {/* Preview */}
          {watchedValues.data && (
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
              <div className="flex items-center justify-center h-24 bg-white rounded border">
                <div
                  style={{
                    fontFamily: watchedValues.font || 'Arial',
                    fontSize: `${watchedValues.size || 24}px`,
                    color: watchedValues.color || '#000000',
                    fontStyle: watchedValues.style?.includes('italic') ? 'italic' : 'normal',
                    fontWeight: watchedValues.style?.includes('bold') ? 'bold' : 'normal',
                  }}
                >
                  {watchedValues.data}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Upload Tab */}
      {activeTab === 'uploaded' && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Upload Signature Image</h3>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose Image File
                </Button>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                PNG, JPG, or SVG up to 10MB
              </p>
            </div>
          </div>

          {watchedValues.data && (
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
              <div className="flex items-center justify-center h-24 bg-white rounded border">
                <img
                  src={watchedValues.data}
                  alt="Signature preview"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" loading={isLoading} disabled={!watchedValues.data}>
          {signature ? 'Update Signature' : 'Create Signature'}
        </Button>
      </div>
    </form>
  );
};