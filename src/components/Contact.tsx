import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, Phone, MapPin, Send, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { GlowingOrbs } from "./3d/GlowingOrbs";

const contactLinks = [
  { icon: Mail, label: "parambhatkar8@gmail.com", href: "mailto:parambhatkar8@gmail.com" },
  { icon: Phone, label: "+91-8767359567", href: "tel:+918767359567" },
  { icon: Github, label: "github.com/Param1411", href: "https://github.com/Param1411" },
  { icon: Linkedin, label: "LinkedIn Profile", href: "https://linkedin.com/in/param-bhatkar-171061250/" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100
    }
  }
};

export function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <GlowingOrbs count={5} />
      <div className="absolute inset-0 grid-background opacity-30" />
      
      {/* Animated background elements */}
      <motion.div 
        className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px]"
        animate={{ 
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[150px]"
        animate={{ 
          x: [0, -50, 0],
          y: [0, 30, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Floating sparkles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${5 + i * 10}%`,
            top: `${10 + (i % 5) * 18}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 5 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-3 h-3 text-primary/30" />
        </motion.div>
      ))}
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              Let's <span className="gradient-text">Connect</span>
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Seeking opportunities in Data Analytics, Business Analysis, HR, Talent Acquisition, and Business Development.
            </motion.p>
            
            {/* Animated underline */}
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-12 rounded-full"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 96, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />
          </motion.div>

          <motion.div 
            className="grid sm:grid-cols-2 gap-4 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {contactLinks.map((link, index) => (
              <motion.a 
                key={index}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center justify-center gap-3 p-5 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden"
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  boxShadow: "0 25px 50px hsl(var(--primary) / 0.2)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Hover gradient background */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.1), transparent 70%)"
                  }}
                />
                
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                  style={{
                    background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.1), transparent)"
                  }}
                />
                
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10"
                >
                  <link.icon className="w-5 h-5 text-primary" />
                </motion.div>
                <span className="group-hover:text-primary transition-colors relative z-10 font-medium">{link.label}</span>
                
                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                  initial={{ width: "0%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </motion.div>

          <motion.div 
            className="flex items-center justify-center gap-2 text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              animate={{ 
                y: [0, -5, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MapPin className="w-4 h-4 text-primary" />
            </motion.div>
            <span>Nanded, Maharashtra, India</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, type: "spring" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" className="gap-2 text-base group relative overflow-hidden" asChild>
              <a href="mailto:parambhatkar8@gmail.com">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10" />
                <span className="relative z-10">Send me an email</span>
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
