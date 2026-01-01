import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, Phone, Download, ChevronDown, BarChart3, Database, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import profileImage from "@/assets/profile-image-ghibli.png";

export function Hero() {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadResume = async () => {
    setDownloading(true);
    try {
      const { data, error } = await supabase.storage
        .from("profile-images")
        .download("resume.pdf");

      if (error) {
        toast.error("Resume not available yet. Please check back later.");
        return;
      }

      const blob = new Blob([data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Param_Bhatkar_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success("Resume downloaded!");
    } catch (err) {
      console.error("Download error:", err);
      toast.error("Failed to download resume. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20">
      {/* Static background effects - reduced for performance */}
      <div className="absolute inset-0 grid-background opacity-30" />
      
      {/* Static gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[150px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px]" />
      
      <div className="container mx-auto px-6 py-12 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left content */}
          <div className="max-w-2xl order-2 lg:order-1">
            {/* Tag */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6 md:mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-primary font-medium">Open to opportunities</span>
            </motion.div>

            {/* Name */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6"
            >
              <span className="text-foreground">Hi, I'm </span>
              <span className="gradient-text">Param</span>
            </motion.h1>

            {/* Animated title */}
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-light mb-6 md:mb-8 flex flex-wrap items-center gap-2"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 text-primary">
                <BarChart3 className="w-4 h-4 md:w-5 md:h-5" />
                Data Analytics
              </span>
              <span className="text-muted-foreground/50">•</span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-accent/10 text-accent">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
                Business Analysis
              </span>
              <span className="text-muted-foreground/50 hidden sm:inline">•</span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 text-primary">
                <Database className="w-4 h-4 md:w-5 md:h-5" />
                Data Science
              </span>
            </motion.h2>

            {/* Summary */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-base md:text-lg lg:text-xl text-muted-foreground/80 max-w-xl mb-8 md:mb-10 leading-relaxed"
            >
              Analytical professional skilled in{" "}
              <span className="text-primary font-medium">Python</span>,{" "}
              <span className="text-primary font-medium">SQL</span>,{" "}
              <span className="text-accent font-medium">Power BI</span>, and{" "}
              <span className="text-accent font-medium">Machine Learning</span>.
              Transforming complex data into actionable business insights.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex flex-wrap gap-3 md:gap-4 mb-8 md:mb-12"
            >
              <Button size="lg" className="gap-2 text-base glow-orb" onClick={scrollToContact}>
                <Mail className="w-5 h-5" />
                Get in Touch
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2 text-base border-border hover:bg-secondary"
                onClick={handleDownloadResume}
                disabled={downloading}
              >
                <Download className={`w-5 h-5 ${downloading ? 'animate-bounce' : ''}`} />
                {downloading ? 'Downloading...' : 'Download Resume'}
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="flex items-center gap-3 md:gap-4"
            >
              {[
                { href: "mailto:parambhatkar8@gmail.com", icon: Mail, label: "Email" },
                { href: "https://github.com/Param1411", icon: Github, label: "GitHub" },
                { href: "https://linkedin.com/in/param-bhatkar-171061250/", icon: Linkedin, label: "LinkedIn" },
                { href: "tel:+918767359567", icon: Phone, label: "Phone" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-muted-foreground hover:text-primary transition-all p-3 hover:bg-primary/10 rounded-full border border-transparent hover:border-primary/30"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right content - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative">
              {/* Animated rings - simplified */}
              <div 
                className="absolute inset-0 rounded-full border-2 border-primary/30"
                style={{ margin: '-20px' }}
              />
              <div 
                className="absolute inset-0 rounded-full border-2 border-accent/20"
                style={{ margin: '-35px' }}
              />

              {/* Main image container */}
              <div
                className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-[0_0_40px_hsl(var(--primary)/0.3)]"
              >
                {/* Gradient border */}
                <div className="absolute inset-0 rounded-full p-1 bg-gradient-to-br from-primary via-accent to-primary">
                  <div className="w-full h-full rounded-full overflow-hidden bg-background">
                    <img
                      src={profileImage}
                      alt="Param Bhatkar"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button 
        onClick={scrollToProjects}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
        aria-label="Scroll to projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </div>
      </motion.button>
    </section>
  );
}