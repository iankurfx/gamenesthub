import { Game } from "@/data/games";
import GameCard from "./GameCard";
import { motion } from "framer-motion";

interface MasonryGridProps {
  games: Game[];
  isLoading?: boolean;
}

export default function MasonryGrid({ games, isLoading = false }: MasonryGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <div key={i} className="glass-panel rounded-xl animate-pulse bg-white/5 border border-white/10 h-[220px]"></div>
        ))}
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-20 text-center flex flex-col items-center justify-center"
      >
        <div className="text-6xl mb-4 opacity-50">🎮</div>
        <h3 className="text-2xl font-bold text-white mb-2">No games found</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          We couldn't find any games matching your current filters. Try adjusting your search or category selection.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {games.map((game, index) => (
        <GameCard key={game.id} game={game} index={index} />
      ))}
    </div>
  );
}

