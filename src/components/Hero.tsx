import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, Phone, Download, ChevronDown } from "lucide-react";

export function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-background opacity-50" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-primary font-medium">Open to opportunities</span>
          </div>

          {/* Name */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="text-foreground">Hi, I'm </span>
            <span className="gradient-text">Param</span>
          </h1>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl text-muted-foreground font-light mb-8">
            Electrical Engineering Student & IoT Developer
          </h2>

          {/* Summary */}
          <p className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mb-10 leading-relaxed">
            Experienced in <span className="text-foreground font-medium">MATLAB/Simulink</span>, 
            <span className="text-foreground font-medium"> IoT</span>, 
            <span className="text-foreground font-medium"> MPPT controllers</span>, and 
            <span className="text-foreground font-medium"> predictive analytics</span>. 
            Delivered 4+ projects with 90%+ fault-prediction accuracy and 15% PV efficiency gains.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Button size="lg" className="gap-2 text-base">
              <Mail className="w-5 h-5" />
              Get in Touch
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-base border-border hover:bg-secondary">
              <Download className="w-5 h-5" />
              Download Resume
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a 
              href="mailto:parambhatkar8@gmail.com" 
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a 
              href="https://github.com/Param1411" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a 
              href="https://linkedin.com/in/param-bhatkar-171061250/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="tel:+918767359567" 
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Phone"
            >
              <Phone className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button 
        onClick={scrollToProjects}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-float"
        aria-label="Scroll to projects"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}
