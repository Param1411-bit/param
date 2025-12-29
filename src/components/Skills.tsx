import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Database, BarChart2, Users, Wrench } from "lucide-react";

const skillCategories = [
  {
    title: "Data Tools",
    icon: Database,
    skills: ["Excel (Advanced)", "Power BI", "Python (Pandas, NumPy, Matplotlib)", "Jupyter", "SQL (Basics)"]
  },
  {
    title: "Analytics Skills",
    icon: BarChart2,
    skills: ["EDA", "KPI Tracking", "Forecasting", "Reporting", "Dashboarding", "Data Modeling"]
  },
  {
    title: "Business & HR Skills",
    icon: Users,
    skills: ["Requirement Gathering", "Documentation", "Client Interaction", "Talent Sourcing", "Lead Management", "Negotiation"]
  },
  {
    title: "Other Tools",
    icon: Wrench,
    skills: ["MATLAB", "Presentation Development", "Public Relations", "Project Coordination", "Market Research"]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, rotateX: -15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
};

const skillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.05,
      type: "spring" as const,
      stiffness: 200
    }
  })
};

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-secondary/20 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute -left-20 top-1/2 w-96 h-96 bg-accent/10 rounded-full blur-[120px]"
        animate={{ 
          y: [-50, 50, -50],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for data analytics, business analysis, and HR roles.
          </p>
        </motion.div>

        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 group hover:border-primary/30 transition-all duration-300"
              whileHover={{ 
                y: -8,
                boxShadow: "0 25px 50px -12px hsl(var(--primary) / 0.2)"
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div 
                  className="p-2 rounded-lg bg-primary/10 text-primary"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <category.icon className="w-5 h-5" />
                </motion.div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={skillVariants}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Badge 
                      variant="outline" 
                      className="border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
