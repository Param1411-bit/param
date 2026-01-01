import { Briefcase, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useProfileData, type Experience as ExperienceType, type Responsibility } from "@/hooks/useProfileData";

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

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-background opacity-30" />
      
      {/* Static orb - reduced for performance */}
      <div className="absolute right-0 top-1/3 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional experiences across business development, software engineering, and marketing.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <motion.div 
              className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary/20"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />

            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                className="relative flex gap-8 mb-12 pl-12 md:pl-20"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Timeline dot */}
                <motion.div 
                  className="absolute left-4 md:left-8 w-4 h-4 bg-primary rounded-full -translate-x-1/2 mt-1 ring-4 ring-background"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-primary rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                {/* Content */}
                <motion.div 
                  className="flex-1 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 group hover:border-primary/30 transition-all duration-300"
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 20px 40px hsl(var(--primary) / 0.15)"
                  }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-mono text-primary">{exp.period}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">{exp.title}</h3>
                  <p className="text-muted-foreground mb-4">{exp.company}</p>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <span className="text-primary mt-1">▹</span>
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
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
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
              <Award className="w-6 h-6 text-primary" />
              Positions of Responsibility
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {responsibilities.map((pos, index) => (
                <motion.div
                  key={index}
                  className="p-5 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <span className="text-xs font-mono text-primary">{pos.period}</span>
                  <h4 className="font-semibold mt-1 mb-2">{pos.title}</h4>
                  <p className="text-sm text-muted-foreground">{pos.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
