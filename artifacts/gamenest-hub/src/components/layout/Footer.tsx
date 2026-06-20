import { Link } from "wouter";
import { SiDiscord, SiInstagram } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 box-glow" />
      
      <div className="container mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
          <div className="md:col-span-2">
            <Link href="/">
              <div className="text-2xl font-black tracking-tighter text-white text-glow cursor-pointer inline-block mb-4">
                GameNest Hub
              </div>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              The ultimate gaming discovery platform. A futuristic, immersive portal where passionate gamers go to find their next obsession.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/">
                  <div className="text-muted-foreground hover:text-primary transition-colors cursor-pointer inline-block">Home</div>
                </Link>
              </li>
              <li>
                <Link href="/trending">
                  <div className="text-muted-foreground hover:text-primary transition-colors cursor-pointer inline-block">Trending</div>
                </Link>
              </li>
              <li>
                <Link href="/games">
                  <div className="text-muted-foreground hover:text-primary transition-colors cursor-pointer inline-block">Games</div>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <div className="text-muted-foreground hover:text-primary transition-colors cursor-pointer inline-block">About Us</div>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Connect</h4>
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
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 text-center text-muted-foreground text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} GameNest Hub. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
