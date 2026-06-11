import { HeroSection } from './components/HeroSection';
import { PainPointsSection } from './components/PainPointsSection';
import { ProductGallery } from './components/ProductGallery';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <div className="min-h-screen bg-stone-50">
      <HeroSection />
      <PainPointsSection />
      <ProductGallery />
      <FAQSection />
      <Footer />
      <Toaster />
    </div>
  );
}
