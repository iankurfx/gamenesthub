import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Play } from "lucide-react";
import { games } from "@/data/games";

const HERO_CARDS = games.slice(0, 7);

const FLOAT_POSITIONS = [
  { top: "8%", left: "2%", rotate: -8, delay: 0 },
  { top: "55%", left: "1%", rotate: 6, delay: 0.8 },
  { top: "20%", right: "2%", rotate: 10, delay: 0.4 },
  { top: "65%", right: "1%", rotate: -6, delay: 1.2 },
  { top: "5%", left: "18%", rotate: 4, delay: 0.6 },
  { top: "75%", right: "16%", rotate: -4, delay: 1.0 },
  { bottom: "12%", left: "8%", rotate: 7, delay: 1.4 },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: "4s" }} />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: "6s", animationDelay: "1s" }} />
      </div>

      {/* Floating Game Cards */}
      {HERO_CARDS.map((game, i) => {
        const pos = FLOAT_POSITIONS[i];
        const { delay, rotate, ...styleProps } = pos;
        return (
          <motion.div
            key={game.id}
            className="absolute z-[1] hidden md:block"
            style={styleProps as React.CSSProperties}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay }}
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay }}
              className="w-28 lg:w-36 rounded-xl overflow-hidden border border-primary/30 shadow-[0_0_24px_rgba(139,92,246,0.35)] glass-panel"
              style={{ transform: `rotate(${rotate}deg)` }}
            >
              <img
                src={game.coverImage}
                alt={game.title}
                className="w-full aspect-[3/4] object-cover opacity-80"
                loading="lazy"
              />
              <div className="px-2 py-1.5 bg-black/60 backdrop-blur-md">
                <p className="text-white text-[10px] font-bold truncate">{game.title}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-primary text-[9px] font-semibold">{game.genre}</span>
                  <span className="ml-auto text-yellow-400 text-[9px] font-bold">{game.rating}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Center Content — flex-1 so it fills space and pushes scroll indicator down */}
      <div className="flex-1 flex items-center justify-center relative z-10 py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-primary/30 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary tracking-wider uppercase">Welcome to the future of gaming</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, type: "spring" }}
              className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-secondary mb-6 text-glow pb-4 leading-tight"
            >
              GameNest Hub
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-2xl md:text-4xl font-bold text-white mb-6 tracking-tight"
            >
              Discover. Install. <span className="text-primary text-glow">Play.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed"
            >
              Step into the ultimate gaming discovery platform. Explore thousands of titles, read community reviews, and find your next obsession.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <Link href="/games">
                <button
                  data-testid="button-explore-games"
                  className="px-8 py-4 bg-primary text-white rounded-lg font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105 box-glow flex items-center gap-3 w-full sm:w-auto justify-center"
                >
                  <Play className="w-5 h-5 fill-white" />
                  <span>Explore Games</span>
                </button>
              </Link>
              <Link href="/about">
                <button
                  data-testid="button-join-community"
                  className="px-8 py-4 glass-panel border border-white/20 text-white rounded-lg font-bold text-lg hover:bg-white/10 hover:border-primary/50 transition-all hover:scale-105 flex items-center gap-3 w-full sm:w-auto justify-center hover-glow"
                >
                  <span>Join Community</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — outside the flex content, pinned to bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="relative z-10 flex flex-col items-center gap-2 pb-8 mt-auto"
      >
        <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Scroll to explore</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-primary/50 to-transparent" />
      </motion.div>
    </section>
  );
}
