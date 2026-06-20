import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";
import CommunitySection from "@/components/CommunitySection";
import GameCard from "@/components/GameCard";
import AdBanner from "@/components/AdBanner";
import { games } from "@/data/games";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";

export default function Home() {
  const trendingGames = games.filter(g => g.category === "Trending").slice(0, 3);

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

      {/* Trending Preview Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 text-glow">Trending Now</h2>
              <p className="text-muted-foreground max-w-2xl text-lg">The most played and highly rated games this week.</p>
            </div>
            <Link href="/trending">
              <button data-testid="link-view-trending" className="flex items-center gap-2 text-primary hover:text-white font-bold transition-colors group">
                <span>View All Trending</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingGames.map((game, index) => (
              <GameCard key={game.id} game={game} index={index} />
            ))}
          </div>

          {/* Mid-page ad */}
          <div className="mt-16">
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
