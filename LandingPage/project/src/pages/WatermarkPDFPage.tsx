import React from 'react'
import { Droplets, Type, Image, Shield } from 'lucide-react'
import PDFToolLayout from '../components/shared/PDFToolLayout'

const WatermarkPDFPage = () => {
  const handleProcess = async (files: File[], settings: any) => {
    console.log('Processing PDF watermark:', files, settings)
  }

  const processingSettings = (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Watermark Type
        </label>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="radio" name="type" value="text" className="text-primary-600" defaultChecked />
            <Type className="h-4 w-4" />
            <span>Text Watermark</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="type" value="image" className="text-primary-600" />
            <Image className="h-4 w-4" />
            <span>Image Watermark</span>
          </label>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Watermark Text
        </label>
        <input
          type="text"
          placeholder="Enter watermark text"
          defaultValue="CONFIDENTIAL"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Position
        </label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
          <option value="center">Center</option>
          <option value="top-left">Top Left</option>
          <option value="top-right">Top Right</option>
          <option value="bottom-left">Bottom Left</option>
          <option value="bottom-right">Bottom Right</option>
          <option value="diagonal">Diagonal</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Opacity
        </label>
        <input
          type="range"
          min="10"
          max="100"
          defaultValue="30"
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Transparent</span>
          <span>Opaque</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Font Size
        </label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="extra-large">Extra Large</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" id="all-pages" className="text-primary-600" defaultChecked />
        <label htmlFor="all-pages" className="text-sm text-gray-700">
          Apply to all pages
        </label>
      </div>
    </div>
  )

  return (
    <PDFToolLayout
      toolName="Watermark PDF"
      toolDescription="Add text or image watermarks to PDF documents. Protect your documents with custom watermarks and branding."
      toolIcon={Droplets}
      acceptedFormats={['.pdf']}
      outputFormats={['pdf']}
      maxFileSize="100MB"
      processingTime="15-30 seconds"
      features={[
        "Text and image watermarks",
        "Custom positioning options",
        "Adjustable opacity and size",
        "Multiple font options",
        "Batch watermarking",
        "Preview before applying",
        "Preserve original quality",
        "Professional branding"
      ]}
      howToSteps={[
        {
          title: "Upload PDF",
          description: "Select the PDF file you want to watermark"
        },
        {
          title: "Choose Type",
          description: "Select text or image watermark"
        },
        {
          title: "Customize",
          description: "Set position, opacity, and appearance"
        },
        {
          title: "Apply & Download",
          description: "Get your watermarked PDF file"
        }
      ]}
      faqs={[
        {
          question: "Can I add both text and image watermarks?",
          answer: "Currently, you can add either text or image watermarks in a single operation. For both types, you would need to process the file twice."
        },
        {
          question: "Will watermarks affect the PDF file size?",
          answer: "Text watermarks have minimal impact on file size. Image watermarks may slightly increase the file size depending on the image complexity."
        },
        {
          question: "Can I remove watermarks later?",
          answer: "Watermarks become part of the PDF content and cannot be easily removed. Make sure to keep a copy of your original file."
        },
        {
          question: "What image formats are supported for watermarks?",
          answer: "We support PNG, JPG, and GIF formats for image watermarks. PNG is recommended for logos with transparency."
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
          answer: "Yes, our batch processing feature allows you to upload and convert multiple files simultaneously, saving you time and effort."
        },
        {
          question: "What happens if my internet connection is interrupted?",
          answer: "If your connection is interrupted during upload, you can resume the upload when reconnected. Processed files are temporarily stored for 1 hour."
        },
        {
          question: "What's the maximum file size I can convert?",
          answer: "Free users can convert files up to 100MB. Premium users have higher limits and can process larger files without restrictions."
        }
      ]}
      relatedTools={[
        {
          name: "Protect PDF",
          path: "/protect-pdf",
          description: "Add password protection to PDFs"
        },
        {
          name: "Add Header Footer",
          path: "/header-footer",
          description: "Add headers and footers to PDFs"
        },
        {
          name: "Digital Signature",
          path: "/digital-signature",
          description: "Add digital signatures for authenticity"
        }
      ]}
      onProcess={handleProcess}
      processingSettings={processingSettings}
    />
  )
}

export default WatermarkPDFPage