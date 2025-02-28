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
      <div className="absolute inset-x-0 top-[20px] z-10 h-96 overflow-hidden text-gray-900/40 opacity-20 [mask-image:linear-gradient(to_top,transparent,white)]">
        <svg
          className="absolute inset-0 top-0 h-full w-full text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="dotted-pattern"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
              x="50%"
              y="100%"
            >
              <circle cx="4" cy="4" r="1.5" fill="currentColor" />
              <circle cx="16" cy="16" r="1.5" fill="currentColor" />
              <circle cx="28" cy="28" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotted-pattern)"></rect>
        </svg>
      </div>
      <Hero />
      <Features/>
      <Pricing/>
      <CTA/>
      <Footer/>
    </div>
  );
}
