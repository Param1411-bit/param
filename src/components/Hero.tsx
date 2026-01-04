import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, Phone, Download, ChevronDown, BarChart3, Database, TrendingUp, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, Suspense } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import profileImage from "@/assets/profile-image-ghibli.png";
import { FloatingShapes } from "./3d/FloatingShapes";
import { GlowingOrbs } from "./3d/GlowingOrbs";

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99] as const,
    },
  }),
};

const floatingAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

export function Hero() {
  const [downloading, setDownloading] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
    <section ref={containerRef} id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20">
      {/* 3D Background */}
      <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
        <FloatingShapes />
      </Suspense>
      
      {/* Animated glowing orbs */}
      <GlowingOrbs count={6} />
      
      {/* Animated grid background */}
      <motion.div 
        className="absolute inset-0 grid-background opacity-40"
        style={{ y }}
      />
      
      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      <motion.div style={{ opacity }} className="container mx-auto px-6 py-12 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left content */}
          <div className="max-w-2xl order-2 lg:order-1">
            {/* Animated Tag */}
            <motion.div 
              custom={0}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-6 md:mb-8 group"
              whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary))" }}
            >
              <motion.span 
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm text-primary font-medium">Open to opportunities</span>
              <Sparkles className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            {/* Name with letter animation */}
            <motion.h1 
              custom={1}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6"
            >
              <span className="text-foreground">Hi, I'm </span>
              <motion.span 
                className="gradient-text inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Param
              </motion.span>
            </motion.h1>

            {/* Animated skill badges */}
            <motion.h2 
              custom={2}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-light mb-6 md:mb-8 flex flex-wrap items-center gap-2"
            >
              {[
                { icon: BarChart3, text: "Data Analytics", color: "primary" },
                { icon: TrendingUp, text: "Business Analysis", color: "accent" },
                { icon: Database, text: "Data Science", color: "primary" },
              ].map((skill, index) => (
                <motion.span
                  key={skill.text}
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${
                    skill.color === "primary" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                  }`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.15, type: "spring" }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -5,
                    boxShadow: skill.color === "primary" 
                      ? "0 10px 30px hsl(var(--primary) / 0.3)" 
                      : "0 10px 30px hsl(var(--accent) / 0.3)"
                  }}
                >
                  <skill.icon className="w-4 h-4 md:w-5 md:h-5" />
                  {skill.text}
                </motion.span>
              ))}
            </motion.h2>

            {/* Summary with text reveal */}
            <motion.p 
              custom={3}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="text-base md:text-lg lg:text-xl text-muted-foreground/80 max-w-xl mb-8 md:mb-10 leading-relaxed"
            >
              Analytical professional skilled in{" "}
              <motion.span 
                className="text-primary font-medium relative inline-block"
                whileHover={{ color: "hsl(var(--accent))" }}
              >
                Python
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                />
              </motion.span>,{" "}
              <motion.span className="text-primary font-medium">SQL</motion.span>,{" "}
              <motion.span className="text-accent font-medium">Power BI</motion.span>, and{" "}
              <motion.span className="text-accent font-medium">Machine Learning</motion.span>.
              Transforming complex data into actionable business insights.
            </motion.p>

            {/* CTA Buttons with enhanced animations */}
            <motion.div 
              custom={4}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="flex flex-wrap gap-3 md:gap-4 mb-8 md:mb-12"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="gap-2 text-base relative overflow-hidden group"
                  onClick={scrollToContact}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Get in Touch
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="gap-2 text-base border-border hover:bg-secondary group"
                  onClick={handleDownloadResume}
                  disabled={downloading}
                >
                  <Download className={`w-5 h-5 transition-transform ${downloading ? 'animate-bounce' : 'group-hover:-translate-y-1'}`} />
                  {downloading ? 'Downloading...' : 'Download Resume'}
                </Button>
              </motion.div>
            </motion.div>

            {/* Social Links with stagger animation */}
            <motion.div 
              custom={5}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="flex items-center gap-3 md:gap-4"
            >
              {[
                { href: "mailto:parambhatkar8@gmail.com", icon: Mail, label: "Email" },
                { href: "https://github.com/Param1411", icon: Github, label: "GitHub" },
                { href: "https://linkedin.com/in/param-bhatkar-171061250/", icon: Linkedin, label: "LinkedIn" },
                { href: "tel:+918767359567", icon: Phone, label: "Phone" },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-muted-foreground hover:text-primary transition-all p-3 hover:bg-primary/10 rounded-full border border-transparent hover:border-primary/30 relative overflow-hidden group"
                  aria-label={social.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 360,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-5 h-5 relative z-10" />
                  <motion.div
                    className="absolute inset-0 bg-primary/20 rounded-full"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right content - Profile Image with 3D effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
            className="relative flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <motion.div 
              className="relative"
              animate={floatingAnimation}
            >
              {/* Multiple animated rings */}
              {[1, 2, 3].map((ring, i) => (
                <motion.div
                  key={ring}
                  className="absolute inset-0 rounded-full"
                  style={{ 
                    border: `2px solid hsl(var(--${i % 2 === 0 ? 'primary' : 'accent'}) / ${0.3 - i * 0.1})`,
                    margin: `${-20 - i * 15}px`
                  }}
                  animate={{ 
                    rotate: i % 2 === 0 ? 360 : -360,
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20 + i * 5, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
              ))}

              {/* Orbiting particles */}
              {[0, 1, 2, 3].map((particle) => (
                <motion.div
                  key={particle}
                  className="absolute w-2 h-2 rounded-full bg-primary"
                  style={{
                    top: "50%",
                    left: "50%",
                    marginTop: -4,
                    marginLeft: -4,
                  }}
                  animate={{
                    rotate: 360,
                    x: Math.cos((particle * Math.PI) / 2) * 150,
                    y: Math.sin((particle * Math.PI) / 2) * 150,
                  }}
                  transition={{
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                    x: { duration: 8, repeat: Infinity, ease: "linear" },
                    y: { duration: 8, repeat: Infinity, ease: "linear" },
                    delay: particle * 0.5,
                  }}
                />
              ))}

              {/* Main image container with glow */}
              <motion.div
                className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{
                  boxShadow: "0 0 60px hsl(var(--primary) / 0.4), 0 0 120px hsl(var(--accent) / 0.2)"
                }}
              >
                {/* Animated gradient border */}
                <motion.div 
                  className="absolute inset-0 rounded-full p-1"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))",
                    backgroundSize: "200% 200%"
                  }}
                  animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-background">
                    <img
                      src={profileImage}
                      alt="Param Bhatkar"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced scroll indicator */}
      <motion.button 
        onClick={scrollToProjects}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors group"
        aria-label="Scroll to projects"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        whileHover={{ scale: 1.1 }}
      >
        <div className="flex flex-col items-center gap-2">
          <motion.span 
            className="text-xs uppercase tracking-widest"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll
          </motion.span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-primary to-transparent"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
          />
        </div>
      </motion.button>
    </section>
  );
}
