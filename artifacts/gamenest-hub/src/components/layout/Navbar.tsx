import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { SiDiscord, SiInstagram } from "react-icons/si";
import { motion, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [location] = useLocation();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/trending", label: "Trending" },
    { href: "/games", label: "Games" },
    { href: "/about", label: "About Us" },
  ];

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled ? "glass-panel border-white/10 shadow-lg shadow-primary/5 py-4" : "bg-transparent py-6"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <div className="text-2xl font-black tracking-tighter text-white text-glow cursor-pointer relative group">
            GameNest Hub
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full box-glow"></span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <div
                className={cn(
                  "text-sm font-medium uppercase tracking-wider transition-colors duration-300 cursor-pointer relative",
                  location === link.href ? "text-primary text-glow" : "text-muted-foreground hover:text-white"
                )}
              >
                {link.label}
                {location === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary box-glow"
                  />
                )}
              </div>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="https://discord.com"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300 hover-glow"
          >
            <SiDiscord className="w-5 h-5" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300 hover-glow"
          >
            <SiInstagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </motion.header>
  );
}
