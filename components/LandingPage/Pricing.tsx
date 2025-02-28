import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: [
        "Basic expense tracking",
        "Up to 50 transactions per month",
        "Standard reports",
        "Email support"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "$9",
      description: "For serious money managers",
      features: [
        "Unlimited expense tracking",
        "Custom categories",
        "Advanced reporting",
        "Bank account integration",
        "30-day data history",
        "Priority support"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Business",
      price: "$19",
      description: "For teams and businesses",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Receipt scanning",
        "Invoice management",
        "Expense approval workflows",
        "90-day data history",
        "Dedicated support"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];
  return (
    <section id="pricing" className="py-20 md:py-32 px-4 bg-accent/50">
      <div className="noise"></div>
      
      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 animate-fadeIn">Simple, transparent pricing</h2>
          <p className="text-muted-foreground text-lg animate-fadeIn delay-100">
            Choose the plan that's right for you and start taking control of your finances today.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-background rounded-xl border overflow-hidden transition-all hover:shadow-lg animate-fadeIn ${
                plan.popular ? 'border-primary ring-1 ring-primary' : 'border-border/60'
              }`}
              style={{ animationDelay: `${150 * (index + 1)}ms` }}
            >
              {plan.popular && (
                <div className="bg-primary text-primary-foreground text-sm font-medium py-1 text-center">
                  Most Popular
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-semibold">{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                
                <Button 
                  className={`w-full rounded-lg ${
                    plan.popular ? '' : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                  }`}
                >
                  {plan.cta}
                </Button>
                
                <div className="mt-8 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 mr-3 flex-shrink-0 text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16 animate-fadeIn delay-500">
          <p className="text-muted-foreground">
            All plans include our core features. Need a custom plan? <a href="#" className="text-primary underline hover:no-underline">Contact us</a>
          </p>
        </div>
      </div>
    </section>
  );
}