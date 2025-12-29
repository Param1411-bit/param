import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Sun, Droplets, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    icon: Brain,
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
    icon: Droplets,
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
    icon: Sun,
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
    icon: BarChart3,
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
};

export function Projects() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-background opacity-30" />
      
      {/* Animated orbs */}
      <motion.div 
        className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-[100px]"
        animate={{ 
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      
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

        <motion.div 
          className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 group cursor-pointer h-full overflow-hidden relative">
                {/* Hover gradient overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <CardHeader className="relative z-10">
                  <div className="flex items-start justify-between mb-2">
                    <motion.div 
                      className="p-3 rounded-xl bg-primary/10 text-primary"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <project.icon className="w-6 h-6" />
                    </motion.div>
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
                      <motion.li 
                        key={i} 
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <motion.span 
                          className="text-primary mt-1"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        >
                          ▹
                        </motion.span>
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Badge 
                          variant="secondary" 
                          className="bg-secondary/50 hover:bg-primary/20 transition-colors"
                        >
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
