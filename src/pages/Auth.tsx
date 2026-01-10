import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Lock, Mail, Loader2, BarChart3 } from "lucide-react";

// Only this email can access admin
const ADMIN_EMAIL = "parambhatkar8@gmail.com";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && session.user?.email === ADMIN_EMAIL) {
        navigate("/pb-portal-x7k9m/dashboard");
      } else if (session && session.user?.email !== ADMIN_EMAIL) {
        // Sign out unauthorized users
        supabase.auth.signOut();
        toast.error("Access denied. You are not authorized.");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && session.user?.email === ADMIN_EMAIL) {
        navigate("/pb-portal-x7k9m/dashboard");
      } else if (session && session.user?.email !== ADMIN_EMAIL) {
        supabase.auth.signOut();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if email is allowed
    if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      toast.error("Access denied. You are not authorized to access the admin portal.");
      return;
    }
    
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      toast.success("Welcome back, Param!");
      navigate("/pb-portal-x7k9m/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 grid-background opacity-20" />
      <motion.div
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px]"
        animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[150px]"
        animate={{ scale: [1.3, 1, 1.3], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md mx-4 p-8 bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <BarChart3 className="w-8 h-8 text-primary" />
          </motion.div>
          <h1 className="text-2xl font-bold mb-2">Admin Portal</h1>
          <p className="text-muted-foreground">
            Sign in to manage your portfolio
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
                minLength={6}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to Portfolio
          </button>
        </div>
      </motion.div>
    </div>
  );
}
