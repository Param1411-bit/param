import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Sun, Droplets, AlertTriangle } from "lucide-react";

const projects = [
  {
    icon: Brain,
    title: "AI-Based Electrical Fault Detection",
    period: "Dec 2024 – Present",
    description: "ML-based fault classification system processing 10,000+ simulation datapoints with automated MATLAB pipelines.",
    achievements: [
      "90%+ prediction accuracy with waveform-feature models",
      "30-40% reduction in diagnosis time",
      "Automated MATLAB data pipelines"
    ],
    tags: ["MATLAB", "Machine Learning", "Power Systems", "AI"]
  },
  {
    icon: Sun,
    title: "Fuzzy-Logic MPPT Controller",
    period: "Jan 2024 – Nov 2024",
    description: "Optimized fuzzy-logic MPPT controller for grid-connected PV systems validated across 50+ irradiance scenarios.",
    achievements: [
      "12-15% increased tracking efficiency vs P&O",
      "25% improved transient response stability",
      "50+ irradiance scenario validations"
    ],
    tags: ["Simulink", "MPPT", "Solar PV", "Control Systems"]
  },
  {
    icon: Droplets,
    title: "IoT Residual Chlorine Sensor",
    period: "Aug 2024 – Nov 2024",
    description: "Capacitive sensing system with ML-based calibration using 2,000+ readings and ESP8266 cloud logging.",
    achievements: [
      "±5% accuracy in lab tests",
      "40% reduction in manual testing",
      "Real-time cloud data logging"
    ],
    tags: ["IoT", "ESP8266", "Machine Learning", "Sensors"]
  },
  {
    icon: AlertTriangle,
    title: "Harmful Gas Detection System",
    period: "Aug 2023 – Dec 2023",
    description: "Smart India Hackathon finalist project - MQ sensor system with GSM alerts for septic tank safety.",
    achievements: [
      "MQ-4/MQ-136 sensor integration",
      "Real-time GSM threshold alerts",
      "Low-cost scalable prototype"
    ],
    tags: ["Arduino", "IoT", "Gas Sensors", "GSM"]
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute inset-0 grid-background opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Engineering solutions with measurable impact in renewable energy, IoT, and predictive analytics.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="bg-card/50 backdrop-blur-sm border-border/50 hover-lift group cursor-pointer"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <project.icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm text-muted-foreground font-mono">{project.period}</span>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {project.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-1">▹</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <Badge 
                      key={i} 
                      variant="secondary" 
                      className="bg-secondary/50 hover:bg-primary/20 transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
