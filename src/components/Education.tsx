import { GraduationCap, Award, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const education = [
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

const certifications = [
  { title: "Preparing for IAI Examinations", category: "Actuarial Science", year: "2024" },
  { title: "NISM SEBI Certification", category: "Finance", year: "2024–2026" },
  { title: "Smart India Hackathon — Finalist", category: "IoT", year: "2023" },
  { title: "Python Programming", category: "Udemy", year: "2024" },
  { title: "IEEE Bombay Section Fall Internship", category: "Web Development", year: "2023" }
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      type: "spring" as const,
      stiffness: 100
    }
  })
};

export function Education() {
  return (
    <section id="education" className="py-24 bg-secondary/20 relative overflow-hidden">
      {/* Animated background */}
      <motion.div 
        className="absolute left-1/4 bottom-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px]"
        animate={{ 
          y: [0, -50, 0],
          opacity: [0.1, 0.2, 0.1]
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Education & <span className="gradient-text">Certifications</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <GraduationCap className="w-6 h-6 text-primary" />
              </motion.div>
              Education
            </h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div 
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 group hover:border-primary/30 transition-all duration-300"
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 20px 40px hsl(var(--primary) / 0.15)"
                  }}
                >
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
                          whileHover={{ scale: 1.1 }}
                        >
                          <Badge variant="outline" className="text-xs border-border/50 hover:border-primary/50 transition-colors">
                            {course}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Award className="w-6 h-6 text-primary" />
              </motion.div>
              Certifications & Achievements
            </h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div 
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 flex items-center justify-between gap-4"
                  whileHover={{ 
                    x: 10,
                    boxShadow: "0 10px 30px hsl(var(--primary) / 0.1)"
                  }}
                >
                  <div className="flex-1">
                    <span className="font-medium block">{cert.title}</span>
                    <span className="text-sm text-muted-foreground">{cert.category}</span>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary shrink-0">
                    {cert.year}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
