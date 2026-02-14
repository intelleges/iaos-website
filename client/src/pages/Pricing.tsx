import { useState } from "react";
import SEO from "@/components/seo";
import PricingSection from "@/components/PricingSection";
import EnterprisePlanConfigurator from "@/components/EnterprisePlanConfigurator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Pricing() {
  const [activeTab, setActiveTab] = useState("enterprise");

  return (
    <>
      <SEO 
        title="Pricing" 
        description="Choose the level of automation and strategic support your compliance program needs. All plans are built on the same Intelleges protocols and templates used by leading enterprises."
      />
      
      <div className="w-full bg-background py-12">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="enterprise" className="text-base">
                Enterprise Plans
              </TabsTrigger>
              <TabsTrigger value="basic" className="text-base">
                Basic Plans
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="enterprise" className="mt-0">
              <EnterprisePlanConfigurator />
            </TabsContent>
            
            <TabsContent value="basic" className="mt-0">
              <PricingSection />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
