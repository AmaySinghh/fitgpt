import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/shared/Hero";
import Features from "@/components/shared/Features";
import HowItWorks from "@/components/shared/HowItWorks";
import Pricing from "@/components/shared/Pricing";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Footer />
    </main>
  );
}
