import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Sun, Droplets, BarChart3, Database, TrendingUp, Cpu, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { useProfileData, type Project } from "@/hooks/useProfileData";
import { LucideIcon } from "lucide-react";

const defaultProjects: Project[] = [
  {
    title: "AI-Based Fault Detection & Predictive Analysis System",
    period: "Python, ML, MATLAB",
    description: "Machine learning models for predictive maintenance with data engineering and analytical insights.",
    achievements: [
      "Developed classification and anomaly detection models",
      "Performed data cleaning, preprocessing, and feature extraction",
      "Generated performance insights using supervised learning"
    ],
    tags: ["Python", "Machine Learning", "MATLAB", "Data Engineering"]
  },
  {
    title: "Residual Chlorine Detection – Data Monitoring & Analytics",
    period: "IoT, Python, Excel",
    description: "IoT-based water quality monitoring with dashboards and time-series analysis.",
    achievements: [
      "Processed IoT datasets for rural water quality trends",
      "Created dashboards, line graphs, and anomaly triggers",
      "Developed alert thresholds and time-series interpretations"
    ],
    tags: ["IoT", "Python", "Excel", "Data Visualization"]
  },
  {
    title: "MPPT Performance Modelling & Optimization",
    period: "MATLAB, Data Analysis",
    description: "PV performance analysis with statistical summaries and energy-efficiency optimization.",
    achievements: [
      "Analyzed PV performance under dynamic irradiance",
      "Created statistical summaries and efficiency graphs",
      "Evaluated algorithms for controller optimization"
    ],
    tags: ["MATLAB", "Simulink", "Solar PV", "Optimization"]
  },
  {
    title: "Business Analytics & Lead Management",
    period: "Excel, Power BI",
    description: "End-to-end lead analytics and conversion funnel optimization for business development.",
    achievements: [
      "Managed leads and evaluated conversion funnels",
      "Prepared datasets, reports, and strategic insights",
      "Analyzed market trends and customer needs"
    ],
    tags: ["Power BI", "Excel", "Analytics", "Business Development"]
  }
];

// Icon mapping for projects
const iconMap: Record<string, LucideIcon> = {
  "AI-Based": Brain,
  "Residual": Droplets,
  "MPPT": Sun,
  "Business": BarChart3,
  "Real-Time": Database,
  "Toll": Database,
  "Resume": Cpu,
  "HR": TrendingUp,
  "default": Settings
};

const getProjectIcon = (title: string): LucideIcon => {
  for (const [key, icon] of Object.entries(iconMap)) {
    if (title.toLowerCase().includes(key.toLowerCase())) {
      return icon;
    }
  }
  return iconMap.default;
};

export function Projects() {
  const { data: projects } = useProfileData<Project[]>('projects', defaultProjects);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-background opacity-30" />
      
      {/* Static orb - reduced animation for performance */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Data-driven solutions in analytics, ML, IoT, and business intelligence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project, index) => {
            const IconComponent = getProjectIcon(project.title);
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 group cursor-pointer h-full overflow-hidden relative hover:border-primary/30 transition-colors duration-300">
                  <CardHeader className="relative z-10">
                    <div className="flex items-start justify-between mb-2">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-sm text-muted-foreground font-mono">{project.period}</span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <ul className="space-y-2 mb-4">
                      {project.achievements.map((achievement, i) => (
                        <li 
                          key={i} 
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}