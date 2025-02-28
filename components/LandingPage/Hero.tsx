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

        <div className="mt-20 md:mt-32 relative animate-fadeIn delay-300">
          <div className="relative mx-auto bg-black rounded-xl overflow-hidden shadow-2xl border border-border/40 aspect-[16/9] max-w-5xl">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-background/5 to-background">
              <Crousel />
            </div>
          </div>
          <div className="absolute -bottom-6 -right-12 h-64 w-64 bg-accent/30 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -top-6 -left-12 h-64 w-64 bg-accent/20 rounded-full blur-3xl -z-10"></div>
        </div>
      </div>
    </section>
  );
}
