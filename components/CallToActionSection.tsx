import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const benefits = [
  "Free 14-day trial, no credit card required",
  "Access to all premium features",
  "Unlimited workflows and team members",
  "24/7 priority support"
];

export default function CallToActionSection() {
  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-muted/50" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Ready to transform your workflow?
          </h2>
          
          <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Join thousands of teams who are building better, faster workflows with Flow Forge
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto mb-12 text-left">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 text-foreground">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm sm:text-base">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 group"
            >
              Start Building Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6"
            >
              Schedule a Demo
            </Button>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            No credit card required • Free 14-day trial • Cancel anytime
          </p>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { value: "10K+", label: "Active Teams" },
            { value: "50M+", label: "Workflows Run" },
            { value: "99.9%", label: "Uptime SLA" },
            { value: "1000+", label: "Integrations" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
