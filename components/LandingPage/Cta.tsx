import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
export default function CTA() {
  return (
    <section className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="bg-black text-white rounded-2xl overflow-hidden relative">
          <div className="noise opacity-10"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="currentColor"
                d="M37.5,-63.2C47.9,-57.2,55.3,-45.6,61.5,-33.5C67.8,-21.4,73,-8.6,71.8,3.6C70.6,15.9,63.1,27.8,54.5,38.1C45.9,48.4,36.2,57.1,24.8,62.2C13.4,67.3,0.2,68.8,-12.9,66.6C-26,64.4,-39,58.5,-49.6,49.3C-60.1,40.1,-68.1,27.7,-71.6,13.8C-75.1,-0.1,-74,-15.5,-67.9,-27.3C-61.7,-39.1,-50.4,-47.3,-38.5,-52.9C-26.7,-58.5,-14.3,-61.6,-0.9,-60C12.5,-58.4,27.1,-69.2,37.5,-63.2Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 w-1/3 h-2/3 opacity-10 pointer-events-none">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="currentColor"
                d="M45.7,-78.2C58.8,-69.3,68.8,-55.2,76.4,-40.2C84,-25.2,89.2,-9.1,87.6,6.2C86,21.6,77.5,36.2,66.9,47.2C56.3,58.2,43.5,65.6,30.1,70C16.6,74.4,2.4,75.8,-15.3,78.4C-33,81,-54.1,84.8,-65.3,76.5C-76.4,68.1,-77.5,47.6,-79.2,29.7C-80.9,11.8,-83.2,-3.5,-81,-18.6C-78.9,-33.7,-72.3,-48.5,-61.3,-58.4C-50.3,-68.3,-34.8,-73.3,-19.8,-79.8C-4.8,-86.3,9.6,-94.4,24.7,-91.7C39.8,-88.9,56.7,-75.4,45.7,-78.2Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>
          
          <div className="p-8 md:p-12 lg:p-16 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-semibold mb-6 animate-fadeIn">
                Start taking control of your finances today
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto animate-fadeIn delay-100">
                Join thousands of users who are already saving money, tracking expenses, and building a better financial future with ExpenseOwl.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 animate-fadeIn delay-200">
                <Button className="bg-white text-black hover:bg-white/90 rounded-full h-12 px-8 text-base w-full sm:w-auto">
                  Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10 rounded-full h-12 px-8 text-base w-full sm:w-auto">
                  View Demo
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left animate-fadeIn delay-300">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-3 text-white flex-shrink-0 mt-0.5" />
                  <p className="text-white/80 text-sm">No credit card required for free plan</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-3 text-white flex-shrink-0 mt-0.5" />
                  <p className="text-white/80 text-sm">Cancel subscription anytime</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-3 text-white flex-shrink-0 mt-0.5" />
                  <p className="text-white/80 text-sm">24/7 customer support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}