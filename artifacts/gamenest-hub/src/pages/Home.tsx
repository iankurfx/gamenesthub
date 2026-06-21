import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";
import CommunitySection from "@/components/CommunitySection";
import AdBanner from "@/components/AdBanner";
import { games } from "@/data/games";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import GameCard from "@/components/GameCard";

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
              <GameCard key={game.id} game={game} index={index} />
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
