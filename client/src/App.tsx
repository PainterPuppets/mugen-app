import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Documentation from "@/pages/documentation";
import Examples from "@/pages/examples";
import ApiTesting from "@/pages/api-testing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CharacterListPage from "@/pages/character/CharacterListPage";
import CharacterDetailPage from "@/pages/character/CharacterDetailPage";
import { AppProvider } from "@/contexts/AppProvider";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/documentation" component={Documentation} />
      <Route path="/examples" component={Examples} />
      <Route path="/api-testing" component={ApiTesting} />
      <Route path="/character" component={CharacterListPage} />
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
