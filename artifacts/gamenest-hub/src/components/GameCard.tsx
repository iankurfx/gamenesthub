import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { Game } from "@/data/games";
import { cn } from "@/lib/utils";

interface GameCardProps {
  game: Game;
  index?: number;
}

export default function GameCard({ game, index = 0 }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Height variants for masonry
  const heightClass = {
    small: "h-[300px]",
    medium: "h-[400px]",
    large: "h-[500px]"
  }[game.cardHeight];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-6 break-inside-avoid"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn(
        "relative rounded-xl overflow-hidden glass-panel group transition-all duration-500",
        heightClass,
        isHovered && "box-glow border-primary/50 -translate-y-2"
      )}>
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={game.coverImage} 
            alt={game.title}
            className={cn(
              "w-full h-full object-cover transition-transform duration-700",
              isHovered ? "scale-110" : "scale-100"
            )}
            loading="lazy"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
          <div className="flex justify-between items-start mb-3">
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-primary/20 text-primary border border-primary/20 rounded-full backdrop-blur-md">
              {game.genre}
            </span>
            <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
              <Star className="w-3 h-3 fill-primary text-primary" />
              <span className="text-xs font-bold text-white">{game.rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-glow transition-all duration-300">
            {game.title}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 delay-75">
            {game.description}
          </p>

          <Link href={`/games/${game.id}`}>
            <button className="w-full py-3 px-4 bg-white/10 hover:bg-primary/20 border border-white/10 hover:border-primary/50 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 group/btn opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 delay-100 hover-glow">
              <span>View Details</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
