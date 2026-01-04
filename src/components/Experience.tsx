import { Briefcase, Award, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useProfileData, type Experience as ExperienceType, type Responsibility } from "@/hooks/useProfileData";
import { GlowingOrbs } from "./3d/GlowingOrbs";
import { useRef } from "react";

const defaultExperiences: ExperienceType[] = [
  {
    title: "Business Development Intern",
    company: "ThePetNest",
    period: "Nov 2024 – Jan 2025",
    achievements: [
      "Analyzed market trends, customer needs, and competing platforms",
      "Managed leads, evaluated conversion funnels, and prepared weekly metrics",
      "Supported onboarding, communication, and CRM-like activities",
      "Prepared datasets, reports, and insights for strategy and decision-making"
    ]
  },
  {
    title: "Full-Stack Developer",
    company: "IEEE Bombay Section",
    period: "Sept 2023 – Oct 2023",
    achievements: [
      "Maintained structured documentation and technical records",
      "Collaborated with stakeholders to define project expectations",
      "Worked with diverse teams, improving communication and coordination"
    ]
  }
];

const defaultResponsibilities: Responsibility[] = [
  {
    title: "Secretary – Training & Placement Cell",
    period: "2024 – 2025",
    description: "Managed the overall placement process at college, coordinated with 65+ companies, facilitated 457+ total offers, handled student records, recruiter communication, and event coordination."
  },
  {
    title: "Training & Placement Member",
    period: "2023 – 2025",
    description: "Supported placement activities, maintained student databases, coordinated campus recruitment drives, and assisted in company onboarding processes."
  }
];

export function Experience() {
  const { data: experiences } = useProfileData<ExperienceType[]>('experiences', defaultExperiences);
  const { data: responsibilities } = useProfileData<Responsibility[]>('responsibilities', defaultResponsibilities);
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const timelineScale = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={containerRef} id="experience" className="py-24 relative overflow-hidden">
      <GlowingOrbs count={4} />
      <div className="absolute inset-0 grid-background opacity-30" />
      
      {/* Animated orbs */}
      <motion.div 
        className="absolute right-0 top-1/3 w-80 h-80 bg-primary/10 rounded-full blur-[100px]"
        animate={{ 
          x: [0, -30, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute left-0 bottom-1/4 w-64 h-64 bg-accent/10 rounded-full blur-[80px]"
        animate={{ 
          y: [0, -40, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
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
            <Briefcase className="w-6 h-6 text-primary" />
          </motion.div>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Work <span className="gradient-text">Experience</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Professional experiences across business development, software engineering, and marketing.
          </motion.p>
          
          {/* Animated underline */}
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 80, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Animated timeline line */}
            <motion.div 
              className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary/20"
              style={{ scaleY: timelineScale, transformOrigin: "top" }}
            />

            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                className="relative flex gap-8 mb-12 pl-12 md:pl-20"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15, type: "spring", stiffness: 100 }}
              >
                {/* Timeline dot with pulse */}
                <motion.div 
                  className="absolute left-4 md:left-8 w-4 h-4 bg-primary rounded-full -translate-x-1/2 mt-1 ring-4 ring-background z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-primary rounded-full"
                    animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-primary rounded-full blur-md opacity-50" />
                </motion.div>

                {/* Content card */}
                <motion.div 
                  className="flex-1 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 group hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
                  whileHover={{ 
                    y: -8,
                    boxShadow: "0 25px 50px hsl(var(--primary) / 0.2)"
                  }}
                >
                  {/* Hover gradient */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "radial-gradient(circle at 0% 0%, hsl(var(--primary) / 0.1), transparent 50%)"
                    }}
                  />
                  
                  <div className="flex flex-wrap items-center gap-3 mb-3 relative z-10">
                    <motion.div 
                      className="p-2 rounded-lg bg-primary/10 text-primary"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Briefcase className="w-4 h-4" />
                    </motion.div>
                    <span className="text-sm font-mono text-primary">{exp.period}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors relative z-10">{exp.title}</h3>
                  <p className="text-muted-foreground mb-4 relative z-10">{exp.company}</p>
                  <ul className="space-y-2 relative z-10">
                    {exp.achievements.map((achievement, i) => (
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
                  
                  {/* Bottom accent line */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Positions of Responsibility */}
          <motion.div 
            className="mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h3 
              className="text-2xl font-semibold mb-8 flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Award className="w-6 h-6 text-primary" />
              </motion.div>
              <span>Positions of <span className="gradient-text">Responsibility</span></span>
            </motion.h3>
            <div className="grid md:grid-cols-2 gap-4">
              {responsibilities.map((pos, index) => (
                <motion.div
                  key={index}
                  className="p-5 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 relative overflow-hidden group"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ 
                    y: -8,
                    boxShadow: "0 20px 40px hsl(var(--primary) / 0.15)"
                  }}
                >
                  {/* Floating sparkle */}
                  <motion.div
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-4 h-4 text-primary/50" />
                  </motion.div>
                  
                  <span className="text-xs font-mono text-primary">{pos.period}</span>
                  <h4 className="font-semibold mt-1 mb-2 group-hover:text-primary transition-colors">{pos.title}</h4>
                  <p className="text-sm text-muted-foreground">{pos.description}</p>
                  
                  {/* Bottom accent line */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
