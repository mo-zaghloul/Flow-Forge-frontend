import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CallToActionSection from "@/components/CallToActionSection";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CallToActionSection />
      <Footer />
    </main>
  );
}
