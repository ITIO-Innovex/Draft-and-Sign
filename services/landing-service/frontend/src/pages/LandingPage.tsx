import Hero from '../components/Hero'
import ModernDocumentFeatures from '../components/ModernDocumentFeatures'
import ComprehensivePlatform from '../components/ComprehensivePlatform'
import PDFTools from '../components/PDFTools'
import ESignature from '../components/ESignature'
import LegalTemplates from '../components/LegalTemplates'
import APISection from '../components/APISection'
import Compliance from '../components/Compliance'
import Pricing from '../components/Pricing'
import FeatureComparison from '../components/FeatureComparison'
import AIFeatures from '../components/AIFeatures'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import CTASection from '../components/CTASection'
export default function LandingPage() {
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
  );
}
