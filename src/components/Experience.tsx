import { Briefcase } from "lucide-react";

const experiences = [
  {
    title: "Business Development Intern",
    company: "ThePetNest",
    period: "Nov 2024 – Jan 2025",
    achievements: [
      "Analyzed 150+ leads; improved qualification accuracy by 20%",
      "Optimized outreach; increased engagement by 30%",
      "Streamlined CRM follow-ups; improved response rate by 25%"
    ]
  },
  {
    title: "Full-Stack Developer",
    company: "IEEE Bombay Section",
    period: "Sep 2023 – Oct 2023",
    achievements: [
      "Delivered web modules used by 300+ users",
      "Produced 10+ technical workflows to speed onboarding",
      "Coordinated cross-functional feature rollouts"
    ]
  },
  {
    title: "Media & Public Relations Intern",
    company: "3 Ace Digital",
    period: "Feb 2024 – Mar 2024",
    achievements: [
      "Managed 5+ campaigns; raised outreach by 40%",
      "Implemented content calendars and analytics reporting"
    ]
  },
  {
    title: "Campus Ambassador",
    company: "E-Cell IIT Bombay",
    period: "Jul 2024 – Aug 2024",
    achievements: [
      "Led outreach drives; increased event participation by 20%"
    ]
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="absolute inset-0 grid-background opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional experiences across business development, software engineering, and marketing.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            {experiences.map((exp, index) => (
              <div 
                key={index}
                className={`relative flex flex-col md:flex-row gap-4 md:gap-8 mb-12 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 mt-2 ring-4 ring-background" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover-lift">
                    <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-mono text-muted-foreground">{exp.period}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{exp.title}</h3>
                    <p className="text-primary mb-3">{exp.company}</p>
                    <ul className={`space-y-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-muted-foreground">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
