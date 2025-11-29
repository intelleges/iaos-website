import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import Protocols from "@/pages/Protocols";
import About from "@/pages/About";
import Product from "@/pages/Product";
import SupplierOnboarding from "@/pages/SupplierOnboarding";
import Pricing from "@/pages/Pricing";
import Contact from "@/pages/Contact";
import CaseStudies from "@/pages/CaseStudies";
import Resources from "@/pages/Resources";
import Login from "@/pages/Login";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans antialiased">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/protocols" component={Protocols} />
          <Route path="/about" component={About} />
          <Route path="/product" component={Product} />
          <Route path="/supplier-onboarding" component={SupplierOnboarding} />
          <Route path="/case-studies" component={CaseStudies} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/resources" component={Resources} />
          <Route path="/contact" component={Contact} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
