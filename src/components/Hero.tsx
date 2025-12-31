import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, Phone, Download, ChevronDown, BarChart3, Database, TrendingUp, PieChart } from "lucide-react";
import { motion } from "framer-motion";
import profileImage from "@/assets/profile-image-ghibli.png";

export function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Floating data icons
  const floatingIcons = [
    { Icon: BarChart3, x: "10%", y: "20%", delay: 0 },
    { Icon: Database, x: "85%", y: "15%", delay: 0.5 },
    { Icon: TrendingUp, x: "75%", y: "70%", delay: 1 },
    { Icon: PieChart, x: "5%", y: "75%", delay: 1.5 },
  ];

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20">
      {/* Animated background effects */}
      <div className="absolute inset-0 grid-background opacity-30" />
      
      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px]"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [0, 50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[150px]"
        animate={{ 
          scale: [1.3, 1, 1.3],
          opacity: [0.15, 0.3, 0.15],
          x: [0, -50, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Center glow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px]"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating data analytics icons */}
      {floatingIcons.map(({ Icon, x, y, delay }, index) => (
        <motion.div
          key={index}
          className="absolute text-primary/20"
          style={{ left: x, top: y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
          }}
        >
          <Icon className="w-12 h-12 md:w-16 md:h-16" />
        </motion.div>
      ))}

      {/* Floating particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            backgroundColor: i % 2 === 0 ? 'hsl(var(--primary) / 0.4)' : 'hsl(var(--accent) / 0.4)',
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="max-w-2xl">
            {/* Tag */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8"
            >
              <motion.span 
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-sm text-primary font-medium">Open to opportunities</span>
            </motion.div>

            {/* Name */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="text-foreground">Hi, I'm </span>
              <motion.span 
                className="gradient-text inline-block"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{
                  backgroundSize: "200% auto",
                }}
              >
                Param
              </motion.span>
            </motion.h1>

            {/* Animated title */}
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light mb-8 flex flex-wrap items-center gap-2"
            >
              <motion.span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 text-primary"
                whileHover={{ scale: 1.05 }}
              >
                <BarChart3 className="w-5 h-5" />
                Data Analytics
              </motion.span>
              <span className="text-muted-foreground/50">•</span>
              <motion.span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-accent/10 text-accent"
                whileHover={{ scale: 1.05 }}
              >
                <TrendingUp className="w-5 h-5" />
                Business Intelligence
              </motion.span>
              <span className="text-muted-foreground/50">•</span>
              <motion.span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 text-primary"
                whileHover={{ scale: 1.05 }}
              >
                <Database className="w-5 h-5" />
                Data Science
              </motion.span>
            </motion.h2>

            {/* Summary */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="text-lg md:text-xl text-muted-foreground/80 max-w-xl mb-10 leading-relaxed"
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
              transition={{ duration: 0.7, delay: 0.9 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="gap-2 text-base group glow-orb">
                  <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Get in Touch
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="gap-2 text-base border-border hover:bg-secondary group">
                  <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                  Download Resume
                </Button>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="flex items-center gap-4"
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
                  className="text-muted-foreground hover:text-primary transition-all p-3 hover:bg-primary/10 rounded-full border border-transparent hover:border-primary/30"
                  aria-label={social.label}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right content - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Animated rings around image */}
            <div className="relative">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border-2"
                  style={{
                    borderColor: i === 0 ? 'hsl(var(--primary) / 0.3)' : i === 1 ? 'hsl(var(--accent) / 0.2)' : 'hsl(var(--primary) / 0.1)',
                    margin: `${-20 - i * 15}px`,
                  }}
                  animate={{
                    rotate: i % 2 === 0 ? 360 : -360,
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    rotate: { duration: 20 + i * 5, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  }}
                />
              ))}

              {/* Floating data points around image */}
              {[...Array(8)].map((_, i) => {
                const angle = (i * 360) / 8;
                const radius = 180;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;
                return (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      backgroundColor: i % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--accent))',
                    }}
                    animate={{
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                );
              })}

              {/* Main image container */}
              <motion.div
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden"
                animate={{
                  boxShadow: [
                    '0 0 30px hsl(var(--primary) / 0.3)',
                    '0 0 60px hsl(var(--primary) / 0.4)',
                    '0 0 30px hsl(var(--primary) / 0.3)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {/* Gradient border */}
                <div className="absolute inset-0 rounded-full p-1 bg-gradient-to-br from-primary via-accent to-primary">
                  <div className="w-full h-full rounded-full overflow-hidden bg-background">
                    <motion.img
                      src={profileImage}
                      alt="Param Bhatkar"
                      className="w-full h-full object-cover object-top"
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.5, delay: 1 }}
                    />
                  </div>
                </div>

                {/* Glowing overlay */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'linear-gradient(45deg, transparent 40%, hsl(var(--primary) / 0.1) 50%, transparent 60%)',
                  }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button 
        onClick={scrollToProjects}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
        aria-label="Scroll to projects"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
}
