import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Download, ArrowLeft, Star, Monitor, HardDrive, Cpu, Layers, PlayCircle } from "lucide-react";
import { toast } from "sonner";
import { games } from "@/data/games";
import { DOWNLOAD_URL } from "@/config";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GameCard from "@/components/GameCard";
import AdBanner from "@/components/AdBanner";
import BackToTop from "@/components/ui/BackToTop";

export default function GameDetail() {
  const { id } = useParams<{ id: string }>();
  const game = games.find(g => g.id === id);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Game Not Found</h1>
          <Link href="/games">
            <button className="text-primary hover:underline">Back to Games</button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedGames = games
    .filter(g => g.id !== game.id && (g.genre === game.genre || g.tags.some(t => game.tags.includes(t))))
    .slice(0, 3);

  const handleDownload = () => {
    toast.success("Opening download link...", {
      description: `Starting download for ${game.title}`,
    });
    setTimeout(() => {
      window.open(DOWNLOAD_URL, "_blank");
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      <Navbar />

      {/* Hero Poster */}
      <div className="relative h-[60vh] md:h-[80vh] w-full mt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src={game.screenshots[0] || game.coverImage} 
            alt={game.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        </div>

        <div className="absolute inset-0 z-10 flex flex-col justify-end container mx-auto px-6 pb-12">
          <Link href="/games">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-8 group w-max">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to games</span>
            </button>
          </Link>
          
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="px-4 py-1.5 bg-primary/20 text-primary border border-primary/30 rounded-full font-bold text-sm tracking-wider uppercase backdrop-blur-md">
              {game.genre}
            </span>
            <div className="flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="text-sm font-bold text-white">{game.rating.toFixed(1)} / 10</span>
            </div>
            {game.multiplayer && (
              <span className="px-4 py-1.5 bg-secondary/20 text-secondary border border-secondary/30 rounded-full font-bold text-sm tracking-wider uppercase backdrop-blur-md">
                Multiplayer
              </span>
            )}
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 text-glow leading-tight max-w-4xl">
            {game.title}
          </h1>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              data-testid="button-download"
              onClick={handleDownload}
              className="px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105 box-glow flex items-center justify-center gap-3 group animate-pulse-slow"
            >
              <Download className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
              <span>Download Now</span>
            </button>
            <button
              data-testid="button-install-video"
              onClick={() => toast.info("Opening installation guide video...", { description: `Watch how to install ${game.title}` })}
              className="px-8 py-4 glass-panel border border-secondary/40 text-secondary rounded-xl font-bold text-lg hover:bg-secondary/10 hover:border-secondary/70 transition-all hover:scale-105 flex items-center justify-center gap-3 group"
            >
              <PlayCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Installation Guide Video</span>
            </button>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full" />
                About this game
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
                {game.fullDescription}
              </p>
            </section>

            {/* Screenshots Gallery */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full" />
                Gallery
              </h2>
              <div className="space-y-4">
                <div className="aspect-video rounded-xl overflow-hidden glass-panel border border-white/10">
                  <img 
                    src={game.screenshots[activeImage]} 
                    alt="Gameplay screenshot" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {game.screenshots.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`relative flex-shrink-0 w-32 md:w-40 aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                        activeImage === idx ? "border-primary box-glow" : "border-transparent opacity-50 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* System Requirements */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full" />
                System Requirements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-panel p-6 rounded-xl border border-white/5">
                  <h3 className="text-xl font-bold text-white mb-4 pb-2 border-b border-white/10">Minimum</h3>
                  <ul className="space-y-4 text-sm">
                    <li className="flex gap-3"><Monitor className="w-5 h-5 text-primary shrink-0" /><span className="text-muted-foreground"><strong className="text-white font-medium">OS:</strong> {game.minSpecs.os}</span></li>
                    <li className="flex gap-3"><Cpu className="w-5 h-5 text-primary shrink-0" /><span className="text-muted-foreground"><strong className="text-white font-medium">Processor:</strong> {game.minSpecs.cpu}</span></li>
                    <li className="flex gap-3"><Layers className="w-5 h-5 text-primary shrink-0" /><span className="text-muted-foreground"><strong className="text-white font-medium">Memory:</strong> {game.minSpecs.ram}</span></li>
                    <li className="flex gap-3"><Monitor className="w-5 h-5 text-primary shrink-0" /><span className="text-muted-foreground"><strong className="text-white font-medium">Graphics:</strong> {game.minSpecs.gpu}</span></li>
                    <li className="flex gap-3"><HardDrive className="w-5 h-5 text-primary shrink-0" /><span className="text-muted-foreground"><strong className="text-white font-medium">Storage:</strong> {game.minSpecs.storage}</span></li>
                  </ul>
                </div>
                <div className="glass-panel p-6 rounded-xl border border-primary/20 box-glow relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMMENDED</div>
                  <h3 className="text-xl font-bold text-white mb-4 pb-2 border-b border-white/10">Recommended</h3>
                  <ul className="space-y-4 text-sm">
                    <li className="flex gap-3"><Monitor className="w-5 h-5 text-primary shrink-0" /><span className="text-muted-foreground"><strong className="text-white font-medium">OS:</strong> {game.recSpecs.os}</span></li>
                    <li className="flex gap-3"><Cpu className="w-5 h-5 text-primary shrink-0" /><span className="text-muted-foreground"><strong className="text-white font-medium">Processor:</strong> {game.recSpecs.cpu}</span></li>
                    <li className="flex gap-3"><Layers className="w-5 h-5 text-primary shrink-0" /><span className="text-muted-foreground"><strong className="text-white font-medium">Memory:</strong> {game.recSpecs.ram}</span></li>
                    <li className="flex gap-3"><Monitor className="w-5 h-5 text-primary shrink-0" /><span className="text-muted-foreground"><strong className="text-white font-medium">Graphics:</strong> {game.recSpecs.gpu}</span></li>
                    <li className="flex gap-3"><HardDrive className="w-5 h-5 text-primary shrink-0" /><span className="text-muted-foreground"><strong className="text-white font-medium">Storage:</strong> {game.recSpecs.storage}</span></li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="glass-panel p-6 rounded-xl border border-white/5">
              <h3 className="font-bold text-white mb-4 uppercase tracking-wider text-sm border-b border-white/10 pb-2">Game Info</h3>
              <dl className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Developer</dt>
                  <dd className="font-medium text-white text-right">{game.developer}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Release Date</dt>
                  <dd className="font-medium text-white text-right">{game.releaseDate}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Platforms</dt>
                  <dd className="font-medium text-white text-right">{game.platform.join(", ")}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Download Size</dt>
                  <dd className="font-medium text-white text-right">{game.gameSize}</dd>
                </div>
              </dl>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-white/5">
              <h3 className="font-bold text-white mb-4 uppercase tracking-wider text-sm border-b border-white/10 pb-2">Features</h3>
              <div className="flex flex-wrap gap-2">
                {game.features.map(f => (
                  <span key={f} className="bg-white/5 border border-white/10 rounded-md px-3 py-1 text-xs text-muted-foreground">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-white/5">
              <h3 className="font-bold text-white mb-4 uppercase tracking-wider text-sm border-b border-white/10 pb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {game.tags.map(t => (
                  <span key={t} className="bg-primary/10 text-primary border border-primary/20 rounded-md px-3 py-1 text-xs font-medium">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="glass-panel p-6 rounded-xl border border-white/5">
              <h3 className="font-bold text-white mb-4 uppercase tracking-wider text-sm border-b border-white/10 pb-2">Installation Guide</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                {game.installationGuide.map((step, idx) => (
                  <li key={idx} className="pl-2">{step}</li>
                ))}
              </ol>
            </div>

            {/* Sidebar ad */}
            <AdBanner size="sidebar" />
          </div>
        </div>

        {/* Related Games */}
        {relatedGames.length > 0 && (
          <section className="mt-24">
            <h2 className="text-3xl font-bold text-white mb-8 text-glow">More Like This</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedGames.map((rg, idx) => (
                <GameCard key={rg.id} game={{...rg, cardHeight: "medium"}} index={idx} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
      <BackToTop />
    </motion.div>
  );
}
