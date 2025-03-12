import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart,
  DollarSign,
  LineChart,
  PieChart,
  TrendingUp,
} from "lucide-react";
import Crousel from "../Crousel";
import StaticHeroImage from "../Static-hero-image";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 md:pt-40 md:pb-28 relative overflow-hidden">
      <div className="noise"></div>

      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-accent text-primary">
            <span>Intelligent expense tracking</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold tracking-tight text-gradient animate-fadeIn">
            Take control of your finances
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl animate-fadeIn delay-100">
            Track expenses, analyze spending habits, and make smarter financial
            decisions with our intuitive expense tracking application.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 animate-fadeIn delay-200">
            <Button className="rounded-full h-12 px-8 text-base w-full sm:w-auto">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="rounded-full h-12 px-8 text-base w-full sm:w-auto"
            >
              Learn more
            </Button>
          </div>
        </div>
        <div className="flex justify-center items-center">
        <div className="relative md:w-[70%] w-full z-10 mt-20 rounded-xl border shadow-xl overflow-hidden bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm p-2">
                  <StaticHeroImage />
                </div>
      </div>
        </div>

        
    </section>
  );
}
