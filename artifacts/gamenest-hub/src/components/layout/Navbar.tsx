import { useState } from "react";
import { Link, useLocation } from "wouter";
import { SiDiscord, SiInstagram } from "react-icons/si";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import HelpModal from "@/components/HelpModal";
import logoSrc from "@assets/ChatGPT_Image_Jun_20,_2026,_11_43_12_AM_1781960191162.png";

export default function Navbar() {
  const [location] = useLocation();
  const [helpOpen, setHelpOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/trending", label: "Trending" },
    { href: "/games", label: "Games" },
    { href: "/about", label: "About Us" },
  ];

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-primary/20 shadow-[0_2px_24px_rgba(139,92,246,0.15)]"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ paddingTop: "14px", paddingBottom: "14px" }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2.5 cursor-pointer group" data-testid="link-logo">
              <img
                src={logoSrc}
                alt="GameNest Hub Logo"
                className="w-9 h-9 rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                style={{ filter: "drop-shadow(0 0 8px rgba(139,92,246,0.6))" }}
              />
              <span className="text-xl font-black tracking-tighter text-white text-glow hidden sm:block">
                GameNest Hub
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <div
                  data-testid={`nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                  className={cn(
                    "text-sm font-semibold uppercase tracking-wider transition-colors duration-300 cursor-pointer relative pb-1",
                    location === link.href
                      ? "text-primary text-glow"
                      : "text-muted-foreground hover:text-white"
                  )}
                >
                  {link.label}
                  {location === link.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-primary box-glow rounded-full"
                    />
                  )}
                </div>
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              data-testid="link-discord"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:bg-primary/20 hover:border-primary/40 text-muted-foreground hover:text-primary transition-all duration-300"
            >
              <SiDiscord className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              data-testid="link-instagram"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:bg-primary/20 hover:border-primary/40 text-muted-foreground hover:text-primary transition-all duration-300"
            >
              <SiInstagram className="w-4 h-4" />
            </a>
            <button
              data-testid="button-help"
              onClick={() => setHelpOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider hover:bg-primary/20 hover:border-primary/60 transition-all duration-300 hover:scale-105"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Help
            </button>
          </div>
        </div>
      </motion.header>

      <HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  );
}
