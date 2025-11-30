import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Protocols from "@/pages/Protocols";
import About from "@/pages/About";
import Product from "@/pages/Product";
import SupplierOnboarding from "@/pages/SupplierOnboarding";
import Pricing from "@/pages/Pricing";
import Contact from "@/pages/Contact";
import CaseStudies from "@/pages/CaseStudies";
import HoneywellAerospace from "@/pages/case-studies/HoneywellAerospace";
import Battelle from "@/pages/case-studies/Battelle";
import DepartmentOfDefense from "@/pages/case-studies/DepartmentOfDefense";
import FOCICaseStudy from "@/pages/case-studies/FOCI";
import COOComplianceCaseStudy from "@/pages/case-studies/COOCompliance";
import CounterfeitPartsCaseStudy from "@/pages/case-studies/CounterfeitParts";
import Resources from "@/pages/Resources";
import OnePagers from "@/pages/OnePagers";
import Login from "@/pages/Login";
import Demo from "@/pages/Demo";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import Security from "@/pages/Security";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PageTransition from "@/components/PageTransition";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans antialiased">
      <Header />
      <main className="flex-1">
        <PageTransition>
          <Switch>
          <Route path="/" component={Home} />
          <Route path="/protocols" component={Protocols} />
          <Route path="/about" component={About} />
          <Route path="/product" component={Product} />
          <Route path="/supplier-onboarding" component={SupplierOnboarding} />
          <Route path="/case-studies" component={CaseStudies} />
          <Route path="/case-studies/honeywell-aerospace" component={HoneywellAerospace} />
          <Route path="/case-studies/battelle" component={Battelle} />
          <Route path="/case-studies/department-of-defense" component={DepartmentOfDefense} />
          <Route path="/case-studies/foci" component={FOCICaseStudy} />
          <Route path="/case-studies/coo-compliance" component={COOComplianceCaseStudy} />
          <Route path="/case-studies/counterfeit-parts" component={CounterfeitPartsCaseStudy} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/resources" component={Resources} />
          <Route path="/one-pagers" component={OnePagers} />
          <Route path="/contact" component={Contact} />
          <Route path="/demo" component={Demo} />
          <Route path="/login" component={Login} />
          <Route path="/terms" component={Terms} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/security" component={Security} />
          <Route component={NotFound} />
          </Switch>
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider delayDuration={200}>
          <Router />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
