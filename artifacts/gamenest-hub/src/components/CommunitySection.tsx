import { motion } from "framer-motion";
import { SiDiscord, SiInstagram } from "react-icons/si";
import { ArrowRight } from "lucide-react";

export default function CommunitySection() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute inset-0 bg-primary/5" />
      <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 blur-[100px] rounded-full mix-blend-screen" />
      <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/20 blur-[100px] rounded-full mix-blend-screen" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight text-glow"
          >
            Join Our Gaming Community
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Connect with thousands of players, share your epic moments, and stay updated with the latest gaming news and releases.
          </motion.p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <motion.a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-[#5865F2] transition-all duration-300 group flex items-center justify-between gap-6 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#5865F2]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#5865F2]/20 flex items-center justify-center">
                  <SiDiscord className="w-6 h-6 text-[#5865F2]" />
                </div>
                <div className="text-left">
                  <h3 className="text-white font-bold text-lg">Join Discord</h3>
                  <p className="text-muted-foreground text-sm">25k+ Members Online</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all relative z-10" />
            </motion.a>

            <motion.a
              href="https://www.instagram.com/gamenesthub2/"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-[#E1306C] transition-all duration-300 group flex items-center justify-between gap-6 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#F56040]/10 to-[#833AB4]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#F56040]/20 to-[#833AB4]/20 flex items-center justify-center">
                  <SiInstagram className="w-6 h-6 text-[#E1306C]" />
                </div>
                <div className="text-left">
                  <h3 className="text-white font-bold text-lg">Follow Instagram</h3>
                  <p className="text-muted-foreground text-sm">Daily Gaming Clips</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all relative z-10" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
