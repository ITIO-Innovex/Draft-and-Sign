import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import ModernDocumentFeatures from './components/ModernDocumentFeatures'
import ComprehensivePlatform from './components/ComprehensivePlatform'
import PDFTools from './components/PDFTools'
import ESignature from './components/ESignature'
import LegalTemplates from './components/LegalTemplates'
import APISection from './components/APISection'
import Compliance from './components/Compliance'
import Pricing from './components/Pricing'
import FeatureComparison from './components/FeatureComparison'
import AIFeatures from './components/AIFeatures'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

// Original PDF Tool Pages
import PDFToWordPage from './pages/PDFToWordPage'
import MergePDFPage from './pages/MergePDFPage'
import CompressPDFPage from './pages/CompressPDFPage'
import SplitPDFPage from './pages/SplitPDFPage'
import PDFToExcelPage from './pages/PDFToExcelPage'
import ProtectPDFPage from './pages/ProtectPDFPage'
import EditPDFPage from './pages/EditPDFPage'
import PDFToJPGPage from './pages/PDFToJPGPage'
import RotatePDFPage from './pages/RotatePDFPage'
import OCRPDFPage from './pages/OCRPDFPage'

// Second Batch PDF Tool Pages
import PDFToPowerPointPage from './pages/PDFToPowerPointPage'
import PDFToTextPage from './pages/PDFToTextPage'
import WordToPDFPage from './pages/WordToPDFPage'
import JPGToPDFPage from './pages/JPGToPDFPage'
import UnlockPDFPage from './pages/UnlockPDFPage'
import WatermarkPDFPage from './pages/WatermarkPDFPage'
import ExtractPagesPage from './pages/ExtractPagesPage'
import DeletePagesPage from './pages/DeletePagesPage'
import CropPDFPage from './pages/CropPDFPage'
import PageNumbersPage from './pages/PageNumbersPage'

// Third Batch PDF Tool Pages
import HTMLToPDFPage from './pages/HTMLToPDFPage'
import FlattenPDFPage from './pages/FlattenPDFPage'
import DeskewPDFPage from './pages/DeskewPDFPage'
import ExtractImagesPage from './pages/ExtractImagesPage'
import GrayscalePDFPage from './pages/GrayscalePDFPage'
import HeaderFooterPage from './pages/HeaderFooterPage'
import NUpPage from './pages/NUpPage'
import BatesNumberingPage from './pages/BatesNumberingPage'
import CreateBookmarksPage from './pages/CreateBookmarksPage'
import EditMetadataPage from './pages/EditMetadataPage'

// Fourth Batch PDF Tool Pages
import PowerPointToPDFPage from './pages/PowerPointToPDFPage'
import ExcelToPDFPage from './pages/ExcelToPDFPage'
import TextToPDFPage from './pages/TextToPDFPage'
import PNGToPDFPage from './pages/PNGToPDFPage'
import OrganizePDFPage from './pages/OrganizePDFPage'
import FillPDFFormsPage from './pages/FillPDFFormsPage'
import RemoveAnnotationsPage from './pages/RemoveAnnotationsPage'
import OptimizePDFPage from './pages/OptimizePDFPage'
import RepairPDFPage from './pages/RepairPDFPage'

// Fifth Batch PDF Tool Pages
import ResizePDFPage from './pages/ResizePDFPage'
import DigitalSignaturePage from './pages/DigitalSignaturePage'
import EnhancePDFPage from './pages/EnhancePDFPage'
import CompressImagesPage from './pages/CompressImagesPage'
import ValidatePDFPage from './pages/ValidatePDFPage'
import PDFToPNGPage from './pages/PDFToPNGPage'
import PDFToHTMLPage from './pages/PDFToHTMLPage'
import RemoveMetadataPage from './pages/RemoveMetadataPage'
import RedactPDFPage from './pages/RedactPDFPage'
import PDFToPDFAPage from './pages/PDFToPDFAPage'

// Sixth Batch PDF Tool Pages
import CompareDocumentsPage from './pages/CompareDocumentsPage'
import CreateFormsPage from './pages/CreateFormsPage'
import BookletCreatorPage from './pages/BookletCreatorPage'
import PrintOptimizerPage from './pages/PrintOptimizerPage'
import TableOfContentsPage from './pages/TableOfContentsPage'
import AlternateAndMixPage from './pages/AlternateAndMixPage'
import SplitByBookmarksPage from './pages/SplitByBookmarksPage'
import SplitInHalfPage from './pages/SplitInHalfPage'
import SplitBySizePage from './pages/SplitBySizePage'
import SplitByTextPage from './pages/SplitByTextPage'

// New PDF Tool Pages
import AnnotatePDFPage from './pages/AnnotatePDFPage'
import AddPasswordPage from './pages/AddPasswordPage'
import ConvertToPDFPage from './pages/ConvertToPDFPage'
import ExtractTextPage from './pages/ExtractTextPage'
import MergePDFFilesPage from './pages/MergePDFFilesPage'
import ReorderPagesPage from './pages/ReorderPagesPage'
import CompressImagesPDFPage from './pages/CompressImagesPDFPage'
import AddCommentsPage from './pages/AddCommentsPage'
import ConvertFromPDFPage from './pages/ConvertFromPDFPage'
import HighlightTextPage from './pages/HighlightTextPage'
import AddBackgroundPage from './pages/AddBackgroundPage'
import NumberPagesPage from './pages/NumberPagesPage'
import RemoveBackgroundPage from './pages/RemoveBackgroundPage'
import AddSignaturePage from './pages/AddSignaturePage'
import RemovePagesPage from './pages/RemovePagesPage'
import ScanToPDFPage from './pages/ScanToPDFPage'
import AddPageNumbersPage from './pages/AddPageNumbersPage'
import AddWatermarkPage from './pages/AddWatermarkPage'
import AddTextPage from './pages/AddTextPage'
import EncryptPDFPage from './pages/EncryptPDFPage'
import ExtractImagesAdvancedPage from './pages/ExtractImagesAdvancedPage'
import FillFormsPage from './pages/FillFormsPage'
import RecognizeTextPage from './pages/RecognizeTextPage'
import CompressPDFProPage from './pages/CompressPDFProPage'
import PDFAnnotationRemoverPage from './pages/PDFAnnotationRemoverPage'
import PDFPageExtractorPage from './pages/PDFPageExtractorPage'
import PDFFormCreatorPage from './pages/PDFFormCreatorPage'
import PDFPasswordRemoverPage from './pages/PDFPasswordRemoverPage'
import PDFWatermarkRemoverPage from './pages/PDFWatermarkRemoverPage'
import PDFDocumentScannerPage from './pages/PDFDocumentScannerPage'
import PDFSignatureVerifierPage from './pages/PDFSignatureVerifierPage'

// Auth Pages
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

// Legal Pages
import TermsOfServicePage from './pages/TermsOfServicePage'

// Comparison Pages
import DocuSignerVsDocuSignPage from './pages/DocuSignerVsDocuSignPage'
import DocuSignerVsHelloSignPage from './pages/DocuSignerVsHelloSignPage'
import DocuSignerVsAdobeSignPage from './pages/DocuSignerVsAdobeSignPage'
import DocuSignerVsPandaDocPage from './pages/DocuSignerVsPandaDocPage'

// Trust & Security Pages
import SecurityOverviewPage from './pages/SecurityOverviewPage'
import AccessibilityPage from './pages/AccessibilityPage'
import DataResidencyPage from './pages/DataResidencyPage'
import StatusPage from './pages/StatusPage'
import BugBountyPage from './pages/BugBountyPage'

// New Pages
import WhyDocuSignerPage from './pages/WhyDocuSignerPage'
import AllInOnePlatformPage from './pages/AllInOnePlatformPage'
import APIDocumentationPage from './pages/APIDocumentationPage'
import AIPoweredFeaturesPage from './pages/AIPoweredFeaturesPage'
import AuthRedirect from './navigation/AuthModule'

function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <ModernDocumentFeatures />
      <ComprehensivePlatform />
      <PDFTools />
      <ESignature />
      <LegalTemplates />
      <APISection />
      <Compliance />
      <Pricing />
      <FeatureComparison />
      <AIFeatures />
      <Testimonials />
      <FAQ />
      <CTASection />
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Original PDF Tool Routes */}
          <Route path="/pdf-to-word" element={<PDFToWordPage />} />
          <Route path="/merge-pdf" element={<MergePDFPage />} />
          <Route path="/compress-pdf" element={<CompressPDFPage />} />
          <Route path="/split-pdf" element={<SplitPDFPage />} />
          <Route path="/pdf-to-excel" element={<PDFToExcelPage />} />
          <Route path="/protect-pdf" element={<ProtectPDFPage />} />
          <Route path="/edit-pdf" element={<EditPDFPage />} />
          <Route path="/pdf-to-jpg" element={<PDFToJPGPage />} />
          <Route path="/rotate-pdf" element={<RotatePDFPage />} />
          <Route path="/ocr-pdf" element={<OCRPDFPage />} />

          {/* Second Batch PDF Tool Routes */}
          <Route path="/pdf-to-powerpoint" element={<PDFToPowerPointPage />} />
          <Route path="/pdf-to-text" element={<PDFToTextPage />} />
          <Route path="/word-to-pdf" element={<WordToPDFPage />} />
          <Route path="/jpg-to-pdf" element={<JPGToPDFPage />} />
          <Route path="/unlock-pdf" element={<UnlockPDFPage />} />
          <Route path="/watermark-pdf" element={<WatermarkPDFPage />} />
          <Route path="/extract-pages" element={<ExtractPagesPage />} />
          <Route path="/delete-pages" element={<DeletePagesPage />} />
          <Route path="/crop-pdf" element={<CropPDFPage />} />
          <Route path="/page-numbers" element={<PageNumbersPage />} />

          {/* Third Batch PDF Tool Routes */}
          <Route path="/html-to-pdf" element={<HTMLToPDFPage />} />
          <Route path="/flatten-pdf" element={<FlattenPDFPage />} />
          <Route path="/deskew-pdf" element={<DeskewPDFPage />} />
          <Route path="/extract-images" element={<ExtractImagesPage />} />
          <Route path="/grayscale-pdf" element={<GrayscalePDFPage />} />
          <Route path="/header-footer" element={<HeaderFooterPage />} />
          <Route path="/n-up" element={<NUpPage />} />
          <Route path="/bates-numbering" element={<BatesNumberingPage />} />
          <Route path="/create-bookmarks" element={<CreateBookmarksPage />} />
          <Route path="/edit-metadata" element={<EditMetadataPage />} />

          {/* Fourth Batch PDF Tool Routes */}
          <Route path="/powerpoint-to-pdf" element={<PowerPointToPDFPage />} />
          <Route path="/excel-to-pdf" element={<ExcelToPDFPage />} />
          <Route path="/text-to-pdf" element={<TextToPDFPage />} />
          <Route path="/png-to-pdf" element={<PNGToPDFPage />} />
          <Route path="/organize-pdf" element={<OrganizePDFPage />} />
          <Route path="/fill-pdf-forms" element={<FillPDFFormsPage />} />
          <Route path="/remove-annotations" element={<RemoveAnnotationsPage />} />
          <Route path="/optimize-pdf" element={<OptimizePDFPage />} />
          <Route path="/repair-pdf" element={<RepairPDFPage />} />

          {/* Fifth Batch PDF Tool Routes */}
          <Route path="/resize-pdf" element={<ResizePDFPage />} />
          <Route path="/digital-signature" element={<DigitalSignaturePage />} />
          <Route path="/enhance-pdf" element={<EnhancePDFPage />} />
          <Route path="/compress-images" element={<CompressImagesPage />} />
          <Route path="/validate-pdf" element={<ValidatePDFPage />} />
          <Route path="/pdf-to-png" element={<PDFToPNGPage />} />
          <Route path="/pdf-to-html" element={<PDFToHTMLPage />} />
          <Route path="/remove-metadata" element={<RemoveMetadataPage />} />
          <Route path="/redact-pdf" element={<RedactPDFPage />} />
          <Route path="/pdf-to-pdfa" element={<PDFToPDFAPage />} />

          {/* Sixth Batch PDF Tool Routes */}
          <Route path="/compare-documents" element={<CompareDocumentsPage />} />
          <Route path="/create-forms" element={<CreateFormsPage />} />
          <Route path="/booklet-creator" element={<BookletCreatorPage />} />
          <Route path="/print-optimizer" element={<PrintOptimizerPage />} />
          <Route path="/table-of-contents" element={<TableOfContentsPage />} />
          <Route path="/alternate-mix" element={<AlternateAndMixPage />} />
          <Route path="/split-bookmarks" element={<SplitByBookmarksPage />} />
          <Route path="/split-half" element={<SplitInHalfPage />} />
          <Route path="/split-size" element={<SplitBySizePage />} />
          <Route path="/split-text" element={<SplitByTextPage />} />

          {/* New PDF Tool Routes */}
          <Route path="/annotate-pdf" element={<AnnotatePDFPage />} />
          <Route path="/add-password" element={<AddPasswordPage />} />
          <Route path="/convert-to-pdf" element={<ConvertToPDFPage />} />
          <Route path="/extract-text" element={<ExtractTextPage />} />
          <Route path="/merge-pdf-files" element={<MergePDFFilesPage />} />
          <Route path="/reorder-pages" element={<ReorderPagesPage />} />
          <Route path="/compress-images-pdf" element={<CompressImagesPDFPage />} />
          <Route path="/add-comments" element={<AddCommentsPage />} />
          <Route path="/convert-from-pdf" element={<ConvertFromPDFPage />} />
          <Route path="/highlight-text" element={<HighlightTextPage />} />
          <Route path="/add-background" element={<AddBackgroundPage />} />
          <Route path="/number-pages" element={<NumberPagesPage />} />
          <Route path="/remove-background" element={<RemoveBackgroundPage />} />
          <Route path="/add-signature" element={<AddSignaturePage />} />
          <Route path="/remove-pages" element={<RemovePagesPage />} />
          <Route path="/scan-to-pdf" element={<ScanToPDFPage />} />
          <Route path="/add-page-numbers" element={<AddPageNumbersPage />} />
          <Route path="/add-watermark" element={<AddWatermarkPage />} />
          <Route path="/add-text" element={<AddTextPage />} />
          <Route path="/encrypt-pdf" element={<EncryptPDFPage />} />
          <Route path="/extract-images-advanced" element={<ExtractImagesAdvancedPage />} />
          <Route path="/fill-forms" element={<FillFormsPage />} />
          <Route path="/recognize-text" element={<RecognizeTextPage />} />
          <Route path="/compress-pdf-pro" element={<CompressPDFProPage />} />
          <Route path="/pdf-annotation-remover" element={<PDFAnnotationRemoverPage />} />
          <Route path="/pdf-page-extractor" element={<PDFPageExtractorPage />} />
          <Route path="/pdf-form-creator" element={<PDFFormCreatorPage />} />
          <Route path="/pdf-password-remover" element={<PDFPasswordRemoverPage />} />
          <Route path="/pdf-watermark-remover" element={<PDFWatermarkRemoverPage />} />
          <Route path="/pdf-document-scanner" element={<PDFDocumentScannerPage />} />
          <Route path="/pdf-signature-verifier" element={<PDFSignatureVerifierPage />} />

          {/* Auth Routes */}
          <Route path="/auth/*" element={<AuthRedirect />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Legal Pages */}
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />

          {/* Comparison Pages */}
          <Route path="/docusigner-vs-docusign" element={<DocuSignerVsDocuSignPage />} />
          <Route path="/docusigner-vs-hellosign" element={<DocuSignerVsHelloSignPage />} />
          <Route path="/docusigner-vs-adobe-sign" element={<DocuSignerVsAdobeSignPage />} />
          <Route path="/docusigner-vs-pandadoc" element={<DocuSignerVsPandaDocPage />} />

          {/* Trust & Security Pages */}
          <Route path="/security-overview" element={<SecurityOverviewPage />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />
          <Route path="/data-residency" element={<DataResidencyPage />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/bug-bounty" element={<BugBountyPage />} />

          {/* New Pages */}
          <Route path="/why-docusigner" element={<WhyDocuSignerPage />} />
          <Route path="/all-in-one-platform" element={<AllInOnePlatformPage />} />
          <Route path="/api-documentation" element={<APIDocumentationPage />} />
          <Route path="/ai-powered-features" element={<AIPoweredFeaturesPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App