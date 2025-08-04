import React, { useState } from 'react';
import { X, Plus, Trash2, ArrowDown, Settings } from 'lucide-react';
import { DocumentWorkflow, WorkflowStep } from '../../types/collaboration';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface WorkflowDesignerProps {
  documentId: string;
  onClose: () => void;
  onSave: (workflow: Omit<DocumentWorkflow, 'id' | 'createdAt'>) => void;
}

export function WorkflowDesigner({ documentId, onClose, onSave }: WorkflowDesignerProps) {
  const [workflowName, setWorkflowName] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [deadline, setDeadline] = useState('');
  const [steps, setSteps] = useState<Omit<WorkflowStep, 'id'>[]>([
    {
      name: '',
      description: '',
      assignee: '',
      assigneeName: '',
      status: 'pending',
      requiredApprovals: 1,
      currentApprovals: 0
    }
  ]);

  const addStep = () => {
    setSteps([
      ...steps,
      {
        name: '',
        description: '',
        assignee: '',
        assigneeName: '',
        status: 'pending',
        requiredApprovals: 1,
        currentApprovals: 0
      }
    ]);
  };

  const removeStep = (index: number) => {
    if (steps.length > 1) {
      setSteps(steps.filter((_, i) => i !== index));
    }
  };

  const updateStep = (index: number, field: string, value: any) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = { ...updatedSteps[index], [field]: value };
    setSteps(updatedSteps);
  };

  const handleSave = () => {
    if (!workflowName.trim() || steps.some(step => !step.name.trim())) {
      alert('Please fill in all required fields');
      return;
    }

    const workflow: Omit<DocumentWorkflow, 'id' | 'createdAt'> = {
      name: workflowName,
      documentId,
      status: 'active',
      steps: steps.map((step, index) => ({
        ...step,
        id: `step-${index + 1}`
      })),
      createdBy: 'current-user@example.com',
      priority,
      deadline: deadline || undefined
    };

    onSave(workflow);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Workflow Designer</h2>
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
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Workflow Settings */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Workflow Name *
              </label>
              <Input
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
                placeholder="Enter workflow name..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deadline (Optional)
                </label>
                <Input
                  type="datetime-local"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Workflow Steps */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Workflow Steps</h3>
              <Button onClick={addStep} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Step
              </Button>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        Step {index + 1}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                      >
                        <Settings className="w-3 h-3" />
                      </Button>
                      {steps.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeStep(index)}
                          className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Step Name *
                      </label>
                      <Input
                        value={step.name}
                        onChange={(e) => updateStep(index, 'name', e.target.value)}
                        placeholder="Enter step name..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Assignee Email *
                      </label>
                      <Input
                        value={step.assignee}
                        onChange={(e) => {
                          updateStep(index, 'assignee', e.target.value);
                          updateStep(index, 'assigneeName', e.target.value.split('@')[0]);
                        }}
                        placeholder="assignee@example.com"
                        type="email"
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={step.description}
                      onChange={(e) => updateStep(index, 'description', e.target.value)}
                      placeholder="Describe what needs to be done in this step..."
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                    />
                  </div>

                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Required Approvals
                    </label>
                    <Input
                      type="number"
                      min="1"
                      value={step.requiredApprovals}
                      onChange={(e) => updateStep(index, 'requiredApprovals', parseInt(e.target.value))}
                      className="w-24"
                    />
                  </div>

                  {/* Arrow to next step */}
                  {index < steps.length - 1 && (
                    <div className="flex justify-center mt-4">
                      <ArrowDown className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {steps.length} step{steps.length !== 1 ? 's' : ''} configured
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Create Workflow
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}