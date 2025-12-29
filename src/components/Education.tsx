import { GraduationCap, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const education = [
  {
    degree: "B.Tech, Electrical Engineering",
    institution: "SGGSIE&T, Nanded",
    period: "Nov 2022 – Present",
    coursework: ["MATLAB", "Control Systems", "Power Electronics", "MPPT", "IoT", "AI/ML Basics", "Renewable Energy"]
  },
  {
    degree: "Senior Secondary (Electronics)",
    institution: "Vidhya Bharti Mahavidyalaya, Amravati",
    period: "Jun 2019 – Oct 2021",
    grade: "CGPA: 9.3"
  },
  {
    degree: "Secondary School",
    institution: "Sarla Ram Kakani Education Academy",
    period: "Mar 2018 – May 2019",
    grade: "CGPA: 8.71"
  }
];

const certifications = [
  { title: "Smart India Hackathon — Finalist (IoT)", year: "2023" },
  { title: "NISM SEBI Certification", year: "2024–2026" },
  { title: "Python Programming — Udemy", year: "2024" },
  { title: "IEEE Bombay Section — Fall Internship", year: "2023" },
  { title: "ACET Qualified — Actuarial Science", year: "2024" }
];

export function Education() {
  return (
    <section id="education" className="py-24 bg-secondary/20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Education & <span className="gradient-text">Certifications</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Education */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-primary" />
              Education
            </h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover-lift"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-lg">{edu.degree}</h4>
                    <span className="text-sm font-mono text-muted-foreground whitespace-nowrap ml-4">{edu.period}</span>
                  </div>
                  <p className="text-primary mb-3">{edu.institution}</p>
                  {edu.grade && (
                    <p className="text-sm text-muted-foreground">{edu.grade}</p>
                  )}
                  {edu.coursework && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {edu.coursework.map((course, i) => (
                        <Badge key={i} variant="outline" className="text-xs border-border/50">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
              <Award className="w-6 h-6 text-primary" />
              Certifications
            </h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover-lift flex items-center justify-between"
                >
                  <span className="font-medium">{cert.title}</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {cert.year}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
