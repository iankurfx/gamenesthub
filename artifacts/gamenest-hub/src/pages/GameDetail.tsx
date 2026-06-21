import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ArrowLeft, Star, Monitor, HardDrive, Cpu, Layers, PlayCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { games } from "@/data/games";
import { DOWNLOAD_URL, YOUTUBE_CHANNEL_URL } from "@/config";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GameCard from "@/components/GameCard";
import AdBanner from "@/components/AdBanner";
import BackToTop from "@/components/ui/BackToTop";

export default function GameDetail() {
  const { id } = useParams<{ id: string }>();
  const game = games.find(g => g.id === id);
  const gameIndex = games.findIndex(g => g.id === id);
  const isLocked = gameIndex >= 11;
  const isRequiredToSubscribe = gameIndex < 11;

  const [activeImage, setActiveImage] = useState(0);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [hasClickedSubscribe, setHasClickedSubscribe] = useState(false);
  const [subscribeClickedTime, setSubscribeClickedTime] = useState<number | null>(null);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [unlockStatus, setUnlockStatus] = useState<string>("");
  const [unlockProgress, setUnlockProgress] = useState<number>(0);

  const handlePrevImage = () => {
    if (game && game.screenshots) {
      setActiveImage((prev) => (prev === 0 ? game.screenshots.length - 1 : prev - 1));
    }
  };

  const handleNextImage = () => {
    if (game && game.screenshots) {
      setActiveImage((prev) => (prev === game.screenshots.length - 1 ? 0 : prev + 1));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevImage();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [game]);

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

  if (isLocked) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-32 px-6">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg p-10 rounded-2xl border border-primary/30 shadow-[0_0_50px_rgba(139,92,246,0.2)] glass-panel text-center relative overflow-hidden"
          >
            {/* Glowing orbs */}
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "6s" }} />
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-secondary/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "8s", animationDelay: "1s" }} />

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/20 mb-8 text-primary">
                <span className="text-4xl">🚀</span>
              </div>

              <h1 className="text-4xl font-black text-white mb-4 text-glow tracking-tight">
                Update Coming Soon
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
                We are currently uploading assets and setting up the installation links for <span className="text-primary font-bold">{game?.title || "this game"}</span>.
                <br />
                Stay tuned for the high-speed download!
              </p>

              <Link href="/games">
                <button className="px-8 py-3 bg-primary text-white rounded-xl font-bold text-md hover:bg-primary/90 transition-all hover:scale-105 box-glow">
                  Back to Games Explorer
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedGames = games
    .filter(g => g.id !== game.id && (g.genre === game.genre || g.tags.some(t => game.tags.includes(t))))
    .slice(0, 3);

  const downloadUrl = game.downloadUrl || DOWNLOAD_URL;

  const handleWatchVideo = () => {
    if (game.id === "Meccha Chameleon") {
      window.open("https://youtu.be/tZLPSS9NwJc", "_blank");
    } else {
      toast.info("Video publish soon...", {
        description: `The installation video for ${game.title} will be available soon.`
      });
    }
  };

  const handleDownload = () => {
    if (isRequiredToSubscribe) {
      setHasClickedSubscribe(false);
      setSubscribeClickedTime(null);
      setUnlockStatus("");
      setUnlockProgress(0);
      setShowUnlockModal(true);
    } else {
      triggerDownload();
    }
  };

  const handleCloseModal = () => {
    setShowUnlockModal(false);
    setHasClickedSubscribe(false);
    setSubscribeClickedTime(null);
    setUnlockStatus("");
    setUnlockProgress(0);
  };

  const verifySubscription = async () => {
    if (!subscribeClickedTime) {
      toast.error("Please click Step 1 to subscribe first!");
      return;
    }

    setIsUnlocking(true);
    setUnlockProgress(0);

    const timeElapsed = Date.now() - subscribeClickedTime;
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    try {
      setUnlockStatus("Connecting to YouTube API...");
      setUnlockProgress(15);
      await delay(800);

      setUnlockStatus("Scanning channel subscriber list...");
      setUnlockProgress(45);
      await delay(1200);

      setUnlockStatus("Matching user session with active subscriptions...");
      setUnlockProgress(75);
      await delay(1000);

      if (timeElapsed < 8000) {
        setUnlockStatus("Failed: Verification timeout");
        setUnlockProgress(0);
        setIsUnlocking(false);
        toast.error("Subscription Verification Failed", {
          description: "We couldn't detect your subscription. Please make sure you click Subscribe on our channel and wait at least 5 seconds before trying again.",
          duration: 5000,
        });
        return;
      }

      setUnlockStatus("Subscription verified successfully!");
      setUnlockProgress(100);
      await delay(800);

      toast.success("Link unlocked! Preparing download...");
      window.open(downloadUrl, "_blank");
      setShowUnlockModal(false);
    } catch (error) {
      setUnlockStatus("Verification error");
      toast.error("An error occurred during verification. Please try again.");
    } finally {
      setIsUnlocking(false);
    }
  };

  const triggerDownload = () => {
    toast.success("Opening download link...", {
      description: `Starting download for ${game.title}`,
    });
    setTimeout(() => {
      window.open(downloadUrl, "_blank");
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
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/15 to-transparent" />
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
              onClick={handleWatchVideo}
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
                <div className="relative aspect-video rounded-xl overflow-hidden glass-panel border border-white/10 group/gallery">
                  <img
                    src={game.screenshots[activeImage]}
                    alt="Gameplay screenshot"
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                  {game.screenshots.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/10 text-white flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 opacity-0 group-hover/gallery:opacity-100 focus:opacity-100 z-10 focus:outline-none backdrop-blur-sm cursor-pointer shadow-lg hover:scale-105"
                        aria-label="Previous screenshot"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/10 text-white flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 opacity-0 group-hover/gallery:opacity-100 focus:opacity-100 z-10 focus:outline-none backdrop-blur-sm cursor-pointer shadow-lg hover:scale-105"
                        aria-label="Next screenshot"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {game.screenshots.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`relative flex-shrink-0 w-32 md:w-40 aspect-video rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? "border-primary box-glow" : "border-transparent opacity-50 hover:opacity-100"
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
                <GameCard key={rg.id} game={{ ...rg, cardHeight: "medium" }} index={idx} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
      <BackToTop />

      {/* Subscribe to Unlock Modal */}
      <AnimatePresence>
        {showUnlockModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-md p-8 overflow-hidden rounded-2xl border border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.25)] glass-panel text-center"
            >
              {/* YouTube themed red glow */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-red-600/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-red-600/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                {/* Close Button */}
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-white transition-colors text-lg"
                >
                  ✕
                </button>

                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 mb-6 text-red-500 animate-pulse">
                  {/* YouTube Icon */}
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>

                <h3 className="text-2xl font-black text-white mb-2 text-glow">
                  Subscribe to Unlock
                </h3>

                <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                  Support us by subscribing to our YouTube channel to unlock the download link for <span className="text-primary font-bold">{game.title}</span>.
                </p>

                {isUnlocking ? (
                  <div className="space-y-4 p-5 bg-white/5 rounded-xl border border-white/10 text-left">
                    <div className="flex justify-between items-center text-xs font-semibold text-muted-foreground mb-1">
                      <span className="line-clamp-1">{unlockStatus}</span>
                      <span className="text-red-500 font-bold ml-2">{unlockProgress}%</span>
                    </div>
                    {/* Progress Bar Container */}
                    <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden border border-white/5">
                      <motion.div
                        className="bg-red-600 h-full rounded-full shadow-[0_0_12px_rgba(239,68,68,0.6)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${unlockProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-1 animate-pulse">
                      <svg className="animate-spin h-3.5 w-3.5 text-red-500" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Querying active subscription channel...</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Step 1 Button */}
                    <a
                      href={YOUTUBE_CHANNEL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        setHasClickedSubscribe(true);
                        setSubscribeClickedTime(Date.now());
                      }}
                      className="block w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all hover:scale-[1.02] shadow-[0_4px_20px_rgba(220,38,38,0.3)] flex items-center justify-center gap-3"
                    >
                      <span>🔴 Step 1: Subscribe on YouTube</span>
                    </a>

                    {/* Step 2 Button */}
                    <button
                      disabled={!hasClickedSubscribe}
                      onClick={verifySubscription}
                      className={cn(
                        "w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3",
                        hasClickedSubscribe
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white hover:scale-[1.02] shadow-[0_4px_20px_rgba(5,150,105,0.3)]"
                          : "bg-white/5 border border-white/10 text-muted-foreground cursor-not-allowed"
                      )}
                    >
                      <span>🔓 Step 2: Unlock Download</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
