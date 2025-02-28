import CTA from "@/components/LandingPage/Cta";
import Features from "@/components/LandingPage/Features";
import Footer from "@/components/LandingPage/Footer";
import Hero from "@/components/LandingPage/Hero";
import Navbar from "@/components/LandingPage/Navbar";
import Pricing from "@/components/LandingPage/Pricing";


export default function Home() {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <Navbar />
      <Hero />
      <Features/>
      <Pricing/>
      <CTA/>
      <Footer/>
    </div>
  );
}
