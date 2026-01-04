import { GraduationCap, BookOpen, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useProfileData, type Education as EducationType } from "@/hooks/useProfileData";
import { GlowingOrbs } from "./3d/GlowingOrbs";

const defaultEducation: EducationType[] = [
  {
    degree: "B.Tech – Electrical Engineering",
    institution: "Shri Guru Gobind Singhji Institute of Engineering and Technology, Nanded",
    period: "Nov 2022 – Present",
    coursework: ["Data Science", "Python", "AI/ML Basics", "Probability & Statistics", "IoT", "MATLAB"]
  },
  {
    degree: "Senior Secondary (Electronics)",
    institution: "Vidhya Bharti Mahavidyalaya, Amravati",
    period: "2019 – 2021",
    grade: "CGPA: 9.3"
  },
  {
    degree: "Secondary Education",
    institution: "Smt. Sarla Ram Kakani Education Academy",
    period: "2018 – 2019",
    grade: "CGPA: 8.71"
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      type: "spring" as const,
      stiffness: 100
    }
  })
};

export function Education() {
  const { data: education } = useProfileData<EducationType[]>('education', defaultEducation);

  return (
    <section id="education" className="py-24 bg-secondary/20 relative overflow-hidden">
      <GlowingOrbs count={3} />
      
      <motion.div 
        className="absolute left-1/4 bottom-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px]"
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
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
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <GraduationCap className="w-6 h-6 text-primary" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Education</span>
          </h2>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 80, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div 
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 group hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 25px 50px hsl(var(--primary) / 0.2)"
                }}
              >
                <motion.div
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 text-primary/50" />
                </motion.div>
                
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">{edu.degree}</h4>
                  <span className="text-sm font-mono text-primary whitespace-nowrap ml-4">{edu.period}</span>
                </div>
                <p className="text-muted-foreground mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {edu.institution}
                </p>
                {edu.grade && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {edu.grade}
                  </Badge>
                )}
                {edu.coursework && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {edu.coursework.map((course, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        <Badge variant="outline" className="text-xs border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all cursor-pointer">
                          {course}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                )}
                
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                  initial={{ width: "0%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
