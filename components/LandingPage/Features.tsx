import { ArrowRight, BarChart, Clock, CreditCard, DollarSign, FileText, LineChart, PieChart, Smartphone, Tag, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Features() {
  const features = [
    {
      icon: <Wallet className="h-6 w-6" />,
      title: "Expense Tracking",
      description: "Log and categorize all your expenses in one place with our intuitive interface."
    },
    {
      icon: <PieChart className="h-6 w-6" />,
      title: "Budget Visualization",
      description: "See where your money goes with beautiful and informative charts and graphs."
    },
    {
      icon: <Tag className="h-6 w-6" />,
      title: "Custom Categories",
      description: "Create and customize expense categories that fit your unique spending habits."
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Card Integration",
      description: "Connect your credit and debit cards for automatic expense tracking."
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile Access",
      description: "Track expenses on the go with our responsive mobile interface."
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Financial Reports",
      description: "Generate detailed reports to analyze your financial behaviors over time."
    },
  ];
  return (
    <section className="py-20 md:py-32 px-4 bg-accent/50 relative">
      <div className="noise"></div>
      
      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 animate-fadeIn">Powerful features for complete financial control</h2>
          <p className="text-muted-foreground text-lg animate-fadeIn delay-100">Our expense tracking solution comes packed with everything you need to master your finances.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-background border border-border/60 rounded-xl p-6 transition-all hover:shadow-lg hover:-translate-y-1 animate-fadeIn" 
              style={{ animationDelay: `${150 * (index + 1)}ms` }}
            >
              <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button className="rounded-full h-12 px-8 text-base animate-fadeIn delay-700">
            Explore all features <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}