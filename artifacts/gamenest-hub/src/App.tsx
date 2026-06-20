import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Suspense, lazy, useEffect } from "react";
import NotFound from "@/pages/not-found";

const Home = lazy(() => import("@/pages/Home"));
const Trending = lazy(() => import("@/pages/Trending"));
const Games = lazy(() => import("@/pages/Games"));
const GameDetail = lazy(() => import("@/pages/GameDetail"));
const About = lazy(() => import("@/pages/About"));

const queryClient = new QueryClient();

function Router() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center bg-background text-foreground">Loading...</div>}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/trending" component={Trending} />
        <Route path="/games" component={Games} />
        <Route path="/games/:id" component={GameDetail} />
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster theme="dark" position="bottom-right" />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
