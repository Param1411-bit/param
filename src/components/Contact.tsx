import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";

const contactLinks = [
  { icon: Mail, label: "parambhatkar8@gmail.com", href: "mailto:parambhatkar8@gmail.com" },
  { icon: Phone, label: "+91-8767359567", href: "tel:+918767359567" },
  { icon: Github, label: "github.com/Param1411", href: "https://github.com/Param1411" },
  { icon: Linkedin, label: "LinkedIn Profile", href: "https://linkedin.com/in/param-bhatkar-171061250/" },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-background opacity-30" />
      
      {/* Animated background orbs */}
      <motion.div 
        className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px]"
        animate={{ 
          x: [-20, 20, -20],
          y: [-20, 20, -20],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[150px]"
        animate={{ 
          x: [20, -20, 20],
          y: [20, -20, 20],
          scale: [1.1, 1, 1.1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Let's <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Seeking opportunities in Data Analytics, Business Analysis, HR, Talent Acquisition, and Business Development.
            </p>
          </motion.div>

          <motion.div 
            className="grid sm:grid-cols-2 gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {contactLinks.map((link, index) => (
              <motion.a 
                key={index}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center justify-center gap-3 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 group"
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 20px 40px hsl(var(--primary) / 0.15)"
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <link.icon className="w-5 h-5 text-primary" />
                </motion.div>
                <span className="group-hover:text-primary transition-colors">{link.label}</span>
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
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MapPin className="w-4 h-4" />
            </motion.div>
            <span>Nanded, Maharashtra, India</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" className="gap-2 text-base group" asChild>
              <a href="mailto:parambhatkar8@gmail.com">
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Send me an email
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
