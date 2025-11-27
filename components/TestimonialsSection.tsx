import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "VP of Operations",
    company: "TechCorp Inc.",
    image: "/avatars/sarah.jpg",
    initials: "SJ",
    content: "Flow Forge transformed how we manage our business processes. We've reduced manual work by 70% and can now focus on strategic initiatives.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Engineering Manager",
    company: "DataFlow Systems",
    image: "/avatars/michael.jpg",
    initials: "MC",
    content: "The drag-and-drop interface is incredibly intuitive. Our non-technical team members are building complex automations without any help from IT.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Product Director",
    company: "InnovateLabs",
    image: "/avatars/emily.jpg",
    initials: "ER",
    content: "We integrated Flow Forge with our entire tech stack in days. The ROI was immediate and the platform scales beautifully with our growth.",
    rating: 5
  },
  {
    name: "David Park",
    role: "CTO",
    company: "CloudScale",
    image: "/avatars/david.jpg",
    initials: "DP",
    content: "Security and compliance were our top concerns. Flow Forge exceeded our expectations with enterprise-grade features and excellent support.",
    rating: 5
  },
  {
    name: "Lisa Thompson",
    role: "Operations Lead",
    company: "RetailHub",
    image: "/avatars/lisa.jpg",
    initials: "LT",
    content: "The analytics dashboard gives us real-time visibility into all our workflows. We can identify bottlenecks and optimize processes continuously.",
    rating: 5
  },
  {
    name: "James Wilson",
    role: "Automation Architect",
    company: "FinTech Solutions",
    image: "/avatars/james.jpg",
    initials: "JW",
    content: "Flow Forge strikes the perfect balance between simplicity and power. It's sophisticated enough for complex use cases yet accessible to everyone.",
    rating: 5
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-sm">Testimonials</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Trusted by industry leaders
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what teams around the world are saying about Flow Forge
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="hover:shadow-md transition-all duration-300"
            >
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 fill-foreground text-foreground" 
                    />
                  ))}
                </div>

                <p className="text-foreground/90 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback className="bg-muted">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            Join <span className="font-bold text-foreground">10,000+</span> teams already automating with Flow Forge
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-40">
            <div className="h-8 w-32 bg-muted rounded" />
            <div className="h-8 w-28 bg-muted rounded" />
            <div className="h-8 w-36 bg-muted rounded" />
            <div className="h-8 w-32 bg-muted rounded" />
            <div className="h-8 w-28 bg-muted rounded" />
          </div>
        </div>
      </div>
    </section>
  );
}
