import { Badge } from "@/components/ui/badge";

const skillCategories = [
  {
    title: "Software & Tools",
    skills: ["MATLAB", "Simulink", "AutoCAD 2D/3D", "Python", "Power BI", "Arduino IDE", "VS Code", "Jupyter"]
  },
  {
    title: "Hardware",
    skills: ["Arduino UNO", "Raspberry Pi", "NodeMCU", "ESP8266", "MQ Sensors", "Capacitive Sensors"]
  },
  {
    title: "Domains",
    skills: ["MPPT", "PV Systems", "Power Electronics", "Control Systems", "IoT", "Embedded Systems", "Renewable Energy"]
  },
  {
    title: "Programming",
    skills: ["Python", "C++", "MATLAB", "Data Analysis", "Machine Learning Basics"]
  }
];

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-secondary/20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for electrical engineering, IoT development, and data analysis.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover-lift"
            >
              <h3 className="text-lg font-semibold mb-4 text-primary">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <Badge 
                    key={i} 
                    variant="outline" 
                    className="border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
