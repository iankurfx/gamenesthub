import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { Game, games } from "@/data/games";

interface GameCardProps {
  game: Game;
  index?: number;
}

export default function GameCard({ game, index = 0 }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const gameIndex = games.findIndex(g => g.id === game.id);
  const isLocked = gameIndex >= 11;

  const handleCardClick = (e: React.MouseEvent) => {
    if (isLocked) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, delay: (index % 10) * 0.05 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isLocked ? (
          <div
            onClick={handleCardClick}
            className="group relative h-[220px] rounded-xl overflow-hidden glass-panel border border-white/5 hover:border-primary/50 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(139,92,246,0.25)] cursor-pointer"
          >
            {/* Cover image */}
            <img
              src={game.coverImage}
              alt={game.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

            {/* Top badges */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary/30 text-primary border border-primary/30 rounded-full backdrop-blur-md select-none blur-[6px]">
                {game.genre}
              </span>
              <div className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/10 select-none blur-[6px]">
                <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                <span className="text-[10px] font-bold text-white">{game.rating.toFixed(1)}</span>
              </div>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-10 group-hover:translate-y-0 transition-all duration-300">
              <h3 className="text-sm font-bold text-white leading-tight line-clamp-1 mb-1 transition-colors duration-300 select-none blur-[6px]">
                {game.title}
              </h3>
              <p className="text-[11px] text-muted-foreground line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-snug select-none blur-[6px]">
                {game.description}
              </p>
              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] font-semibold text-primary flex items-center gap-1 select-none blur-[6px]">
                  View Details <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        ) : (
          <Link href={`/games/${game.id}`}>
            <div
              className="group relative h-[220px] rounded-xl overflow-hidden glass-panel border border-white/5 hover:border-primary/50 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(139,92,246,0.25)] cursor-pointer"
            >
              {/* Cover image */}
              <img
                src={game.coverImage}
                alt={game.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

              {/* Top badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary/30 text-primary border border-primary/30 rounded-full backdrop-blur-md">
                  {game.genre}
                </span>
                <div className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/10">
                  <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-[10px] font-bold text-white">{game.rating.toFixed(1)}</span>
                </div>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-10 group-hover:translate-y-0 transition-all duration-300">
                <h3 className="text-sm font-bold text-white leading-tight line-clamp-1 mb-1 transition-colors duration-300">
                  {game.title}
                </h3>
                <p className="text-[11px] text-muted-foreground line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-snug">
                  {game.description}
                </p>
                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] font-semibold text-primary flex items-center gap-1">
                    View Details <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-md p-8 overflow-hidden rounded-2xl border border-primary/30 shadow-[0_0_50px_rgba(139,92,246,0.35)] glass-panel text-center"
            >
              {/* Pulsing glow background */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-secondary/20 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-white transition-colors text-lg"
                >
                  ✕
                </button>

                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-6 text-primary animate-pulse">
                  <span className="text-3xl">✨</span>
                </div>
                
                <h3 className="text-2xl font-extrabold text-white mb-3 text-glow">
                  Coming Soon!
                </h3>
                
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  We are currently updating files and optimizing requirements for <span className="text-primary font-bold">{game.title}</span>. It will be available for download very soon!
                </p>
                
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full py-3 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primary/90 transition-all hover:scale-105 box-glow"
                >
                  Stay Tuned
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
