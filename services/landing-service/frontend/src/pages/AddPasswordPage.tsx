import React from 'react'
import { Lock, FileText, Download, Shield } from 'lucide-react'
import PDFToolLayout from '../components/shared/PDFToolLayout'

const AddPasswordPage = () => {
  const handleProcess = async (files: File[], settings: any) => {
    console.log('Processing password addition:', files, settings)
  }

  const processingSettings = (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password Protection
        </label>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">User Password (for opening)</label>
            <input
              type="password"
              placeholder="Enter password to open PDF"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Owner Password (for editing)</label>
            <input
              type="password"
              placeholder="Enter password for editing permissions"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Permissions
        </label>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="text-primary-600" defaultChecked />
            <span className="text-sm">Allow printing</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="text-primary-600" />
            <span className="text-sm">Allow copying text and images</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="text-primary-600" />
            <span className="text-sm">Allow document modification</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="text-primary-600" />
            <span className="text-sm">Allow form filling</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="text-primary-600" />
            <span className="text-sm">Allow commenting and annotations</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Encryption Level
        </label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
          <option value="128">128-bit RC4 (Standard)</option>
          <option value="256" selected>256-bit AES (Recommended)</option>
        </select>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-800">Password Security</h4>
            <p className="text-sm text-blue-700 mt-1">
              Use strong passwords with a mix of letters, numbers, and special characters. Keep your passwords secure - we cannot recover them if lost.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <PDFToolLayout
      toolName="Add Password to PDF"
      toolDescription="Secure your PDF documents with password protection. Control access and set permissions for viewing, editing, printing, and copying."
      toolIcon={Lock}
      acceptedFormats={['.pdf']}
      outputFormats={['pdf']}
      maxFileSize="100MB"
      processingTime="10-20 seconds"
      features={[
        "Password protection for opening",
        "Owner password for editing permissions",
        "256-bit AES encryption",
        "Granular permission controls",
        "Prevent copying and printing",
        "Batch protection support",
        "Digital rights management",
        "Compliance with security standards"
      ]}
      howToSteps={[
        {
          title: "Upload PDF",
          description: "Select the PDF file you want to protect"
        },
        {
          title: "Set Passwords",
          description: "Create user and owner passwords"
        },
        {
          title: "Configure Permissions",
          description: "Set what users can and cannot do"
        },
        {
          title: "Apply Protection",
          description: "Download your secured PDF file"
        }
      ]}
      faqs={[
        {
          question: "What's the difference between user and owner passwords?",
          answer: "User password is required to open the PDF. Owner password allows changing permissions and security settings."
        },
        {
          question: "How secure is the encryption?",
          answer: "We use 256-bit AES encryption, which is the same standard used by banks and government agencies."
        },
        {
          question: "Can I remove password protection later?",
          answer: "Yes, you can use our 'Unlock PDF' tool to remove password protection if you have the owner password."
        },
        {
          question: "What permissions can I control?",
          answer: "You can control printing, copying, editing, form filling, and commenting permissions."
        },
        {
          question: "Will protection work on all PDF viewers?",
          answer: "Yes, PDF password protection is a standard feature supported by all major PDF viewers and browsers."
        },
        {
          question: "How secure are my files during processing?",
          answer: "Your files are protected with 256-bit SSL encryption during upload and processing. We use the same security standards as banks and financial institutions."
        },
        {
          question: "How long do you store my files?",
          answer: "We automatically delete all uploaded files after 1 hour for your privacy and security. You can also manually delete files immediately after processing."
        },
        {
          question: "Is this tool really free to use?",
          answer: "Yes! Our PDF tools are completely free to use with no hidden costs. You can process unlimited files without any charges."
        },
        {
          question: "Why do you delete files automatically?",
          answer: "We automatically delete files after 1 hour to protect your privacy and ensure your sensitive documents don't remain on our servers longer than necessary."
        },
        {
          question: "Do I need to create an account to use this tool?",
          answer: "No account is required for basic usage. However, creating a free account gives you access to additional features like file history and batch processing."
        },
        {
          question: "Can I process multiple files at once?",
          answer: "Yes, our batch processing feature allows you to upload and protect multiple files simultaneously, saving you time and effort."
        },
        {
          question: "What happens if my internet connection is interrupted?",
          answer: "If your connection is interrupted during upload, you can resume the upload when reconnected. Processed files are temporarily stored for 1 hour."
        }
      ]}
      relatedTools={[
        {
          name: "Unlock PDF",
          path: "/unlock-pdf",
          description: "Remove password protection from PDFs"
        },
        {
          name: "Watermark PDF",
          path: "/watermark-pdf",
          description: "Add watermarks for document protection"
        },
        {
          name: "Digital Signature",
          path: "/digital-signature",
          description: "Add digital signatures for authenticity"
        }
      ]}
      onProcess={handleProcess}
      processingSettings={processingSettings}
      securityFeatures={[
        "Passwords are never stored on our servers",
        "256-bit SSL encryption during processing",
        "Files automatically deleted after 1 hour",
        "Secure HTTPS transmission",
        "No access to your document content"
      ]}
    />
  )
}

export default AddPasswordPage