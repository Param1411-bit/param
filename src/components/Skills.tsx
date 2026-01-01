import { useProfileData, type Skills as SkillsType } from "@/hooks/useProfileData";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Database, BarChart2, Users, Wrench } from "lucide-react";

const defaultSkills: SkillsType = {
  software: ["Excel (Advanced)", "Power BI", "Python", "Jupyter", "SQL"],
  hardware: ["Arduino", "Raspberry Pi", "IoT Sensors"],
  domains: ["EDA", "KPI Tracking", "Forecasting", "Reporting", "Dashboarding", "Data Modeling"],
  programming: ["Python", "SQL", "JavaScript", "HTML/CSS"]
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
};

export function Skills() {
  const { data: skills } = useProfileData<SkillsType>('skills', defaultSkills);

  const categories = [
    { title: "Data Tools", icon: Database, skills: skills.software },
    { title: "Analytics & Domains", icon: BarChart2, skills: skills.domains },
    { title: "Programming", icon: Users, skills: skills.programming },
    { title: "Hardware", icon: Wrench, skills: skills.hardware }
  ];

  return (
    <section id="skills" className="py-24 bg-secondary/20 relative overflow-hidden">
      {/* Static orb - reduced for performance */}
      <div className="absolute -left-20 top-1/2 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
      
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
              className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300"
              whileHover={{ y: -8, boxShadow: "0 25px 50px -12px hsl(var(--primary) / 0.2)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <category.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <Badge key={i} variant="outline" className="border-border/50 hover:border-primary/50">
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
