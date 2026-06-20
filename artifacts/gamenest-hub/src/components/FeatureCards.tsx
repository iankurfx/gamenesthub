import { motion } from "framer-motion";
import { BookOpen, TrendingUp, MonitorSmartphone, Users } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Game Guides",
    description: "Comprehensive walkthroughs, tips, and strategies from pro players."
  },
  {
    icon: TrendingUp,
    title: "Trending Games",
    description: "Discover what the community is playing right now in real-time."
  },
  {
    icon: MonitorSmartphone,
    title: "System Requirements",
    description: "Instantly check if your rig can run the latest AAA titles."
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with millions of passionate gamers around the world."
  }
];

export default function FeatureCards() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel p-8 rounded-2xl border border-white/5 hover:-translate-y-2 hover:border-primary/50 transition-all duration-300 group hover-glow relative overflow-hidden"
            >
              {/* Hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 box-glow">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-glow transition-all">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
