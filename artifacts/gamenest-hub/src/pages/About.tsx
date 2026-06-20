import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import BackToTop from "@/components/ui/BackToTop";
import { Shield, Zap, Globe, Heart } from "lucide-react";

// Counter component for animated stats
function AnimatedCounter({ value, label, suffix = "" }: { value: number, label: string, suffix?: string }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
      });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="text-center p-6 glass-panel rounded-2xl border border-white/5"
    >
      <div className="text-4xl md:text-5xl font-black text-primary mb-2 text-glow">
        {value}{suffix}
      </div>
      <div className="text-muted-foreground font-medium uppercase tracking-wider text-sm">
        {label}
      </div>
    </motion.div>
  );
}

const values = [
  { icon: Shield, title: "Secure & Verified", desc: "Every game goes through rigorous security checks." },
  { icon: Zap, title: "Lightning Fast", desc: "High-speed CDN servers for blazing fast downloads." },
  { icon: Globe, title: "Global Community", desc: "Connect with players from over 150 countries." },
  { icon: Heart, title: "For Gamers, By Gamers", desc: "Built with passion by people who love gaming." }
];

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24"
    >
      <CustomCursor />
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
          
          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-white mb-6 text-glow"
            >
              Our Mission
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              We're building the ultimate destination for gamers to discover, connect, and experience the best titles the industry has to offer.
            </motion.p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white/[0.02] border-y border-white/5 relative z-10">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <AnimatedCounter value={10} suffix=",000+" label="Games Listed" />
              <AnimatedCounter value={2} suffix="M+" label="Monthly Visitors" />
              <AnimatedCounter value={5} suffix=",000+" label="Guides Published" />
              <AnimatedCounter value={500} suffix="K+" label="Community Members" />
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 relative z-10">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <div className="aspect-square md:aspect-video lg:aspect-square rounded-3xl overflow-hidden relative glass-panel border border-white/10 p-2">
                  <div className="w-full h-full rounded-2xl overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop" 
                      alt="Gamers playing" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent mix-blend-multiply" />
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:w-1/2 space-y-8"
              >
                <h2 className="text-3xl md:text-5xl font-bold text-white text-glow">Who We Are</h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    GameNest Hub started in a small dorm room with a simple idea: finding good games shouldn't be hard. What began as a curated list of our favorite titles quickly exploded into a global platform.
                  </p>
                  <p>
                    We believe that gaming is more than just entertainment — it's a culture, an art form, and a way to connect with people across the globe. Our platform is designed to respect that culture. No dark patterns, no intrusive ads, just pure, unadulterated gaming content.
                  </p>
                  <p>
                    Today, we're proud to serve millions of gamers every month, helping them find their next adventure, connect with teammates, and get the most out of their hardware.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 relative z-10 bg-black/40">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 text-glow">Why Choose Us</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">The principles that guide everything we build.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((val, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-primary/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <val.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{val.title}</h3>
                  <p className="text-muted-foreground">{val.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </motion.div>
  );
}
