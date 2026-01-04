import { useProfileData, type Skills as SkillsType } from "@/hooks/useProfileData";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Database, BarChart2, Users, Wrench, Sparkles } from "lucide-react";
import { GlowingOrbs } from "./3d/GlowingOrbs";

const defaultSkills: SkillsType = {
  software: ["Excel (Advanced)", "Power BI", "Python", "Jupyter", "SQL"],
  hardware: ["Arduino", "Raspberry Pi", "IoT Sensors"],
  domains: ["EDA", "KPI Tracking", "Forecasting", "Reporting", "Dashboarding", "Data Modeling"],
  programming: ["Python", "SQL", "JavaScript", "HTML/CSS"]
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.15,
      delayChildren: 0.2
    } 
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -15 },
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
  hidden: { opacity: 0, scale: 0 },
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
  const { data: skills } = useProfileData<SkillsType>('skills', defaultSkills);

  const categories = [
    { title: "Data Tools", icon: Database, skills: skills.software, color: "primary" },
    { title: "Analytics & Domains", icon: BarChart2, skills: skills.domains, color: "accent" },
    { title: "Programming", icon: Users, skills: skills.programming, color: "primary" },
    { title: "Hardware", icon: Wrench, skills: skills.hardware, color: "accent" }
  ];

  return (
    <section id="skills" className="py-24 bg-secondary/20 relative overflow-hidden">
      <GlowingOrbs count={4} />
      
      {/* Animated background elements */}
      <motion.div 
        className="absolute -left-20 top-1/2 w-96 h-96 bg-accent/10 rounded-full blur-[120px]"
        animate={{ 
          x: [0, 50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute -right-20 top-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[100px]"
        animate={{ 
          y: [0, 50, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 4) * 20}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut"
          }}
        />
      ))}
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <Sparkles className="w-6 h-6 text-primary" />
          </motion.div>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Technical <span className="gradient-text">Skills</span>
          </motion.h2>
          
          {/* Animated underline */}
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 80, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />
        </motion.div>

        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 group relative overflow-hidden"
              whileHover={{ 
                y: -12, 
                boxShadow: "0 25px 50px -12px hsl(var(--primary) / 0.25)",
                borderColor: "hsl(var(--primary) / 0.5)"
              }}
            >
              {/* Hover gradient */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 0%, hsl(var(--${category.color}) / 0.15), transparent 70%)`
                }}
              />
              
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <motion.div 
                  className={`p-2 rounded-lg bg-${category.color}/10 text-${category.color}`}
                  style={{
                    backgroundColor: `hsl(var(--${category.color}) / 0.1)`,
                    color: `hsl(var(--${category.color}))`
                  }}
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <category.icon className="w-5 h-5" />
                </motion.div>
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2 relative z-10">
                {category.skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={skillVariants}
                    whileHover={{ 
                      scale: 1.15, 
                      y: -3,
                      boxShadow: "0 5px 15px hsl(var(--primary) / 0.2)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge 
                      variant="outline" 
                      className="border-border/50 hover:border-primary/50 hover:bg-primary/10 cursor-pointer transition-all duration-300"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
              
              {/* Bottom accent line */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                initial={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
