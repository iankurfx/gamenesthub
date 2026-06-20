import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";
import CommunitySection from "@/components/CommunitySection";
import AdBanner from "@/components/AdBanner";
import { games } from "@/data/games";
import { Link } from "wouter";
import { Star, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";

function UniformGameCard({ game, index }: { game: typeof games[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 10) * 0.05 }}
    >
      <Link href={`/games/${game.id}`}>
        <div
          data-testid={`card-game-${game.id}`}
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
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

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
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="text-sm font-bold text-white leading-tight line-clamp-1 mb-1 group-hover:text-primary transition-colors duration-300">
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
    </motion.div>
  );
}

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <Navbar />

      <HeroSection />

      {/* Ad banner below hero */}
      <div className="container mx-auto px-6 py-4">
        <AdBanner size="leaderboard" />
      </div>

      <FeatureCards />

      {/* All Games Grid */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-3 text-glow">All Games</h2>
              <p className="text-muted-foreground max-w-2xl">
                Browse our full collection of {games.length} premium titles — click any to explore details.
              </p>
            </div>
            <Link href="/games">
              <button data-testid="link-browse-all" className="flex items-center gap-2 text-primary hover:text-white font-bold transition-colors group whitespace-nowrap">
                <span>Browse with Filters</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {games.map((game, index) => (
              <UniformGameCard key={game.id} game={game} index={index} />
            ))}
          </div>

          {/* Mid-page ad */}
          <div className="mt-14">
            <AdBanner size="leaderboard" />
          </div>
        </div>
      </section>

      <CommunitySection />

      <Footer />
      <BackToTop />
    </motion.div>
  );
}
