import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import BackToTop from "@/components/ui/BackToTop";
import MasonryGrid from "@/components/MasonryGrid";
import { games } from "@/data/games";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const GENRES = ["All", "Action", "Adventure", "FPS", "RPG", "Racing", "Horror", "Strategy", "Open World", "Multiplayer"];

export default function Games() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  // Filter games based on search and genre
  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          game.developer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGenre = activeGenre === "All" || 
                         game.genre === activeGenre || 
                         (activeGenre === "Open World" && game.features.includes("Open World")) ||
                         (activeGenre === "Multiplayer" && game.multiplayer);
                         
    return matchesSearch && matchesGenre;
  });

  useEffect(() => {
    // Simulate network loading for effect
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [activeGenre]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24"
    >
      <CustomCursor />
      <Navbar />
      
      <main className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-white mb-4 text-glow"
            >
              All Games
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              Browse our complete collection of premium titles.
            </motion.p>
          </div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative w-full md:w-80"
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search games..."
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </div>

        {/* Genre Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex overflow-x-auto pb-4 mb-8 gap-2 scrollbar-hide hide-scroll"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={cn(
                "px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-300",
                activeGenre === genre 
                  ? "bg-primary text-white box-glow" 
                  : "bg-white/5 border border-white/10 text-muted-foreground hover:text-white hover:bg-white/10"
              )}
            >
              {genre}
            </button>
          ))}
        </motion.div>

        <MasonryGrid games={filteredGames} isLoading={isLoading} />
      </main>

      <Footer />
      <BackToTop />
    </motion.div>
  );
}
