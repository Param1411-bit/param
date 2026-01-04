import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Sun, Droplets, BarChart3, Database, TrendingUp, Cpu, Settings, ExternalLink } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useProfileData, type Project } from "@/hooks/useProfileData";
import { LucideIcon } from "lucide-react";
import { GlowingOrbs } from "./3d/GlowingOrbs";
import { useRef } from "react";

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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const IconComponent = getProjectIcon(project.title);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, type: "spring", stiffness: 100 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000"
    >
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 group cursor-pointer h-full overflow-hidden relative hover:border-primary/50 transition-all duration-500">
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), hsl(var(--primary) / 0.1), transparent 40%)"
          }}
        />
        
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.5 }}
          style={{
            background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.1), transparent)"
          }}
        />
        
        <CardHeader className="relative z-10">
          <div className="flex items-start justify-between mb-2">
            <motion.div 
              className="p-3 rounded-xl bg-primary/10 text-primary"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <IconComponent className="w-6 h-6" />
            </motion.div>
            <motion.span 
              className="text-sm text-muted-foreground font-mono flex items-center gap-1"
              whileHover={{ color: "hsl(var(--primary))" }}
            >
              {project.period}
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.span>
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
                transition={{ delay: index * 0.1 + i * 0.05 }}
              >
                <motion.span 
                  className="text-primary mt-1"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
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
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + i * 0.08, type: "spring" }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Badge 
                  variant="secondary" 
                  className="bg-secondary/50 hover:bg-primary/20 transition-all duration-300 cursor-pointer"
                >
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
        
        {/* Bottom glow line */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"
          initial={{ width: "0%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.5 }}
        />
      </Card>
    </motion.div>
  );
}

export function Projects() {
  const { data: projects } = useProfileData<Project[]>('projects', defaultProjects);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <GlowingOrbs count={4} />
      <div className="absolute inset-0 grid-background opacity-30" />
      
      {/* Animated floating shapes */}
      <motion.div
        className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-[100px]"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Data-driven solutions in analytics, ML, IoT, and business intelligence.
          </motion.p>
          
          {/* Animated line */}
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 96, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
