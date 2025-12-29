import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, Phone, MapPin } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 grid-background opacity-30" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            Seeking internships in Electrical, Embedded, IoT, or Renewable Energy engineering. 
            Feel free to reach out!
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            <a 
              href="mailto:parambhatkar8@gmail.com"
              className="flex items-center justify-center gap-3 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover-lift hover:border-primary/50 transition-colors"
            >
              <Mail className="w-5 h-5 text-primary" />
              <span>parambhatkar8@gmail.com</span>
            </a>
            <a 
              href="tel:+918767359567"
              className="flex items-center justify-center gap-3 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover-lift hover:border-primary/50 transition-colors"
            >
              <Phone className="w-5 h-5 text-primary" />
              <span>+91-8767359567</span>
            </a>
            <a 
              href="https://github.com/Param1411"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover-lift hover:border-primary/50 transition-colors"
            >
              <Github className="w-5 h-5 text-primary" />
              <span>github.com/Param1411</span>
            </a>
            <a 
              href="https://linkedin.com/in/param-bhatkar-171061250/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover-lift hover:border-primary/50 transition-colors"
            >
              <Linkedin className="w-5 h-5 text-primary" />
              <span>LinkedIn Profile</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
            <MapPin className="w-4 h-4" />
            <span>Nanded, Maharashtra, India</span>
          </div>

          <Button size="lg" className="gap-2 text-base">
            <Mail className="w-5 h-5" />
            Send me an email
          </Button>
        </div>
      </div>
    </section>
  );
}
