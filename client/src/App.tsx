import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CharacterListPage from "@/pages/character/CharacterListPage";
import CharacterDetailPage from "@/pages/character/CharacterDetailPage";
import CharacterCreatePage from "@/pages/character/CharacterCreatePage";
import { AppProvider } from "@/contexts/AppProvider";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/characters" component={CharacterListPage} />
      <Route path="/characters/create" component={CharacterCreatePage} />
      <Route path="/character/:uuid" component={CharacterDetailPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <TooltipProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow">
              <Router />
            </div>
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
