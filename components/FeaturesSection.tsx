import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Workflow, 
  Zap, 
  Lock, 
  GitBranch, 
  Clock, 
  Users,
  BarChart3,
  Cloud,
  Puzzle
} from "lucide-react";

const features = [
  {
    icon: Workflow,
    title: "Drag & Drop Builder",
    description: "Intuitive visual interface to design complex workflows without writing a single line of code.",
    badge: "Core"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Execute workflows in milliseconds with our optimized runtime engine.",
    badge: "Performance"
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Bank-grade encryption and compliance with SOC 2, GDPR, and HIPAA standards.",
    badge: "Security"
  },
  {
    icon: GitBranch,
    title: "Version Control",
    description: "Track changes, rollback updates, and collaborate with built-in version management.",
    badge: "Collaboration"
  },
  {
    icon: Clock,
    title: "Smart Scheduling",
    description: "Trigger workflows on schedules, events, or custom conditions automatically.",
    badge: "Automation"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share workflows, assign roles, and work together seamlessly across your organization.",
    badge: "Teamwork"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Monitor performance, track metrics, and optimize workflows with detailed insights.",
    badge: "Analytics"
  },
  {
    icon: Cloud,
    title: "Cloud & On-Premise",
    description: "Deploy anywhere - cloud, hybrid, or on your own infrastructure.",
    badge: "Deployment"
  },
  {
    icon: Puzzle,
    title: "1000+ Integrations",
    description: "Connect with your favorite tools and services through our extensive integration library.",
    badge: "Integrations"
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-20 sm:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-sm">Features</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Everything you need to automate
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to streamline your workflow automation and boost productivity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-md transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-3 bg-muted rounded-lg group-hover:bg-muted/80 transition-colors">
                      <Icon className="w-6 h-6 text-foreground" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
