import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check, X, FileDown, Send } from "lucide-react";
import { pricingConfig, type Protocol } from "@/lib/pricingConfig";
import { getRecommendation, type RecommendationResult } from "@/lib/recommendationEngine";
import { ProposalModal } from "@/components/ProposalModal";

export default function EnterprisePlanConfigurator() {
  const [users, setUsers] = useState<number>(3);
  const [suppliers, setSuppliers] = useState<number>(500);
  const [groups, setGroups] = useState<number>(5);
  const [selectedProtocols, setSelectedProtocols] = useState<string[]>([]);
  const [multiJurisdiction, setMultiJurisdiction] = useState<boolean>(false);
  const [isProtocolPickerOpen, setIsProtocolPickerOpen] = useState<boolean>(false);
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState<boolean>(false);
  const protocolPickerRef = useRef<HTMLDivElement>(null);

  // Update recommendation when inputs change
  useEffect(() => {
    const result = getRecommendation({
      users,
      suppliers,
      groups,
      protocolCount: selectedProtocols.length,
      multiJurisdiction,
    });
    setRecommendation(result);
  }, [users, suppliers, groups, selectedProtocols.length, multiJurisdiction]);

  // Close protocol picker on click outside or ESC
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (protocolPickerRef.current && !protocolPickerRef.current.contains(event.target as Node)) {
        setIsProtocolPickerOpen(false);
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsProtocolPickerOpen(false);
      }
    };

    if (isProtocolPickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isProtocolPickerOpen]);

  const toggleProtocol = (protocolId: string) => {
    setSelectedProtocols((prev) =>
      prev.includes(protocolId) ? prev.filter((id) => id !== protocolId) : [...prev, protocolId]
    );
  };

  const handleDownloadComparison = () => {
    const content = `Enterprise Plan Comparison\n\n${pricingConfig.tiers
      .map(
        (tier) =>
          `${tier.name} - $${tier.annualPrice.toLocaleString()}/year\nUsers: ${tier.maxUsers}\nSuppliers: ${tier.maxSuppliers}\nGroups: ${tier.maxGroups}\nProtocols: ${tier.maxProtocols}\n`
      )
      .join("\n")}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "intelleges-plan-comparison.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const getSelectedProtocolObjects = (): Protocol[] => {
    return selectedProtocols
      .map((id) => pricingConfig.protocols.find((p) => p.id === id))
      .filter((p): p is Protocol => p !== undefined);
  };

  return (
    <div className="w-full bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-foreground mb-4">Enterprise Plan Configurator</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Configure your enterprise compliance solution based on your organization's needs. Select your
            requirements below and we'll recommend the optimal plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <Button onClick={() => setIsProposalModalOpen(true)} size="lg" className="gap-2">
              <Send className="h-4 w-4" />
              Request Proposal
            </Button>
            <Button onClick={handleDownloadComparison} variant="outline" size="lg" className="gap-2">
              <FileDown className="h-4 w-4" />
              Download Plan Comparison
            </Button>
          </div>
        </div>

        {/* Configuration Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column: Configuration Inputs */}
          <Card className="p-6 border border-border bg-card">
            <h2 className="text-2xl font-semibold text-card-foreground mb-6">Configure Your Requirements</h2>
            <div className="space-y-6">
              {/* Users */}
              <div>
                <Label htmlFor="users" className="text-sm font-medium text-card-foreground mb-2 block">
                  Number of Users
                </Label>
                <Select value={users.toString()} onValueChange={(val) => setUsers(Number(val))}>
                  <SelectTrigger id="users">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {pricingConfig.userOptions.map((option) => (
                      <SelectItem key={option} value={option.toString()}>
                        {option === 750 ? "750+" : option.toLocaleString()} users
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Suppliers */}
              <div>
                <Label htmlFor="suppliers" className="text-sm font-medium text-card-foreground mb-2 block">
                  Number of Suppliers
                </Label>
                <Select value={suppliers.toString()} onValueChange={(val) => setSuppliers(Number(val))}>
                  <SelectTrigger id="suppliers">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {pricingConfig.supplierOptions.map((option) => (
                      <SelectItem key={option} value={option.toString()}>
                        {option === 999999
                          ? "Unlimited"
                          : option >= 1000
                            ? `${option / 1000}K`
                            : option.toLocaleString()}{" "}
                        suppliers
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Groups */}
              <div>
                <Label htmlFor="groups" className="text-sm font-medium text-card-foreground mb-2 block">
                  Number of Groups/Sites
                </Label>
                <Select value={groups.toString()} onValueChange={(val) => setGroups(Number(val))}>
                  <SelectTrigger id="groups">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {pricingConfig.groupOptions.map((option) => (
                      <SelectItem key={option} value={option.toString()}>
                        {option === 999999 ? "Unlimited" : option.toLocaleString()} groups
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Protocols Multi-Select */}
              <div>
                <Label className="text-sm font-medium text-card-foreground mb-2 block">
                  Select Compliance Protocols ({selectedProtocols.length} selected)
                </Label>
                <div className="relative" ref={protocolPickerRef}>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    onClick={() => setIsProtocolPickerOpen(!isProtocolPickerOpen)}
                  >
                    {selectedProtocols.length === 0
                      ? "Select protocols..."
                      : `${selectedProtocols.length} protocol${selectedProtocols.length > 1 ? "s" : ""} selected`}
                  </Button>
                  {isProtocolPickerOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-popover border border-border rounded-md shadow-lg max-h-96 overflow-y-auto">
                      {Object.entries(
                        pricingConfig.protocols.reduce(
                          (acc, protocol) => {
                            if (!acc[protocol.category]) acc[protocol.category] = [];
                            acc[protocol.category].push(protocol);
                            return acc;
                          },
                          {} as Record<string, Protocol[]>
                        )
                      ).map(([category, protocols]) => (
                        <div key={category} className="border-b border-border last:border-b-0">
                          <div className="px-4 py-2 bg-muted font-semibold text-sm text-muted-foreground">
                            {category}
                          </div>
                          {protocols.map((protocol) => (
                            <button
                              key={protocol.id}
                              type="button"
                              onClick={() => toggleProtocol(protocol.id)}
                              className="w-full px-4 py-2 text-left hover:bg-accent hover:text-accent-foreground flex items-center gap-2 transition-colors"
                              aria-pressed={selectedProtocols.includes(protocol.id)}
                              aria-label={`${selectedProtocols.includes(protocol.id) ? "Deselect" : "Select"} ${protocol.name}`}
                            >
                              <div
                                className={`w-4 h-4 rounded border flex items-center justify-center ${
                                  selectedProtocols.includes(protocol.id)
                                    ? "bg-primary border-primary"
                                    : "border-input"
                                }`}
                              >
                                {selectedProtocols.includes(protocol.id) && (
                                  <Check className="h-3 w-3 text-primary-foreground" />
                                )}
                              </div>
                              <span className="text-sm">{protocol.name}</span>
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {selectedProtocols.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {getSelectedProtocolObjects().map((protocol) => (
                      <button
                        key={protocol.id}
                        type="button"
                        onClick={() => toggleProtocol(protocol.id)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors"
                        aria-label={`Remove ${protocol.name}`}
                      >
                        {protocol.name}
                        <X className="h-3 w-3" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Multi-Jurisdiction Toggle */}
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-md">
                <Switch
                  id="multi-jurisdiction"
                  checked={multiJurisdiction}
                  onCheckedChange={setMultiJurisdiction}
                />
                <div className="flex-1">
                  <Label htmlFor="multi-jurisdiction" className="text-sm font-medium cursor-pointer">
                    Multi-Jurisdiction Operations
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Enable if your organization operates across multiple regulatory jurisdictions requiring
                    cross-border compliance tracking and reporting.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Right Column: Recommendation */}
          <Card className="p-6 border border-border bg-card">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-2xl font-semibold text-card-foreground">Recommended Plan</h2>
              {recommendation && (
                <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full text-sm font-medium">
                  Best Fit
                </span>
              )}
            </div>
            {recommendation && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-card-foreground">{recommendation.tier.name}</h3>
                  <p className="text-4xl font-light text-primary mt-2">
                    ${recommendation.tier.annualPrice.toLocaleString()}
                    <span className="text-lg text-muted-foreground">/year</span>
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Users</span>
                    <span className="font-medium text-card-foreground">
                      Up to {recommendation.tier.maxUsers.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Suppliers</span>
                    <span className="font-medium text-card-foreground">
                      {recommendation.tier.maxSuppliers === 999999
                        ? "Unlimited"
                        : `Up to ${recommendation.tier.maxSuppliers.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Groups/Sites</span>
                    <span className="font-medium text-card-foreground">
                      {recommendation.tier.maxGroups === 999999
                        ? "Unlimited"
                        : `Up to ${recommendation.tier.maxGroups.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Protocols</span>
                    <span className="font-medium text-card-foreground">
                      {recommendation.tier.maxProtocols === 999999
                        ? "Unlimited"
                        : `Up to ${recommendation.tier.maxProtocols}`}
                    </span>
                  </div>
                </div>

                {selectedProtocols.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-card-foreground mb-2">Selected Protocols</h4>
                    <div className="flex flex-wrap gap-2">
                      {getSelectedProtocolObjects().map((protocol) => (
                        <span
                          key={protocol.id}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs"
                        >
                          {protocol.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-medium text-card-foreground mb-2">Key Features</h4>
                  <ul className="space-y-2">
                    {recommendation.tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {recommendation.warnings.length > 0 && (
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md">
                    <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-2">
                      Capacity Notice
                    </h4>
                    <ul className="space-y-1">
                      {recommendation.warnings.map((warning, index) => (
                        <li key={index} className="text-sm text-amber-800 dark:text-amber-200">
                          â€¢ {warning}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>

        {/* 4-Column Comparison Table */}
        <div className="mb-12">
          <h2 className="text-3xl font-light text-center text-foreground mb-8">Plan Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-card">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left p-4 font-semibold text-card-foreground">Feature</th>
                  {pricingConfig.tiers.map((tier) => (
                    <th key={tier.id} className="text-center p-4 font-semibold text-card-foreground">
                      <div>{tier.name}</div>
                      <div className="text-sm font-normal text-muted-foreground mt-1">
                        ${tier.annualPrice.toLocaleString()}/yr
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border bg-muted/30">
                  <td className="p-4 font-medium text-card-foreground" colSpan={pricingConfig.tiers.length + 1}>
                    Capacity
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 text-muted-foreground">Users</td>
                  {pricingConfig.tiers.map((tier) => (
                    <td key={tier.id} className="text-center p-4 text-card-foreground">
                      {tier.maxUsers.toLocaleString()}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 text-muted-foreground">Suppliers</td>
                  {pricingConfig.tiers.map((tier) => (
                    <td key={tier.id} className="text-center p-4 text-card-foreground">
                      {tier.maxSuppliers === 999999 ? "Unlimited" : tier.maxSuppliers.toLocaleString()}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 text-muted-foreground">Groups/Sites</td>
                  {pricingConfig.tiers.map((tier) => (
                    <td key={tier.id} className="text-center p-4 text-card-foreground">
                      {tier.maxGroups === 999999 ? "Unlimited" : tier.maxGroups.toLocaleString()}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 text-muted-foreground">Protocols</td>
                  {pricingConfig.tiers.map((tier) => (
                    <td key={tier.id} className="text-center p-4 text-card-foreground">
                      {tier.maxProtocols === 999999 ? "Unlimited" : tier.maxProtocols}
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-border bg-muted/30">
                  <td className="p-4 font-medium text-card-foreground" colSpan={pricingConfig.tiers.length + 1}>
                    Features
                  </td>
                </tr>
                {[
                  "Core compliance tracking",
                  "Evidence repository",
                  "Role-based access control (RBAC)",
                  "Basic dashboards with CSV exports",
                  "Advanced analytics & reporting",
                  "Cross-protocol analytics",
                  "Custom integrations (API access)",
                  "Multi-jurisdiction support",
                  "Dedicated customer success manager (CSM)",
                  "Priority support with SLA-backed response times",
                ].map((feature, idx) => (
                  <tr key={idx} className="border-b border-border">
                    <td className="p-4 text-muted-foreground">{feature}</td>
                    {pricingConfig.tiers.map((tier) => (
                      <td key={tier.id} className="text-center p-4">
                        {tier.features.some((f) => f.toLowerCase().includes(feature.toLowerCase())) ? (
                          <Check className="h-5 w-5 text-green-600 dark:text-green-400 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground/30 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}

                <tr className="border-b border-border bg-muted/30">
                  <td className="p-4 font-medium text-card-foreground" colSpan={pricingConfig.tiers.length + 1}>
                    Support
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 text-muted-foreground">Support Level</td>
                  <td className="text-center p-4 text-card-foreground">Email</td>
                  <td className="text-center p-4 text-card-foreground">Email + Chat</td>
                  <td className="text-center p-4 text-card-foreground">Priority + CSM</td>
                  <td className="text-center p-4 text-card-foreground">24/7 + CSM + SLA</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Accordion Comparison */}
        <div>
          <h2 className="text-3xl font-light text-center text-foreground mb-8">Detailed Plan Breakdown</h2>
          <Accordion type="single" collapsible className="w-full">
            {pricingConfig.tiers.map((tier) => (
              <AccordionItem key={tier.id} value={tier.id}>
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <span>{tier.name}</span>
                    <span className="text-primary">${tier.annualPrice.toLocaleString()}/year</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid md:grid-cols-2 gap-6 pt-4">
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-3">Capacity</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>â€¢ Users: {tier.maxUsers.toLocaleString()}</li>
                        <li>
                          â€¢ Suppliers:{" "}
                          {tier.maxSuppliers === 999999 ? "Unlimited" : tier.maxSuppliers.toLocaleString()}
                        </li>
                        <li>
                          â€¢ Groups/Sites:{" "}
                          {tier.maxGroups === 999999 ? "Unlimited" : tier.maxGroups.toLocaleString()}
                        </li>
                        <li>
                          â€¢ Protocols: {tier.maxProtocols === 999999 ? "Unlimited" : tier.maxProtocols}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-3">Features</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {tier.features.map((feature, index) => (
                          <li key={index}>â€¢ {feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Proposal Modal */}
      <ProposalModal
        isOpen={isProposalModalOpen}
        onClose={() => setIsProposalModalOpen(false)}
        recommendedPlan={recommendation?.tier.name || ""}
        configuration={{
          users,
          suppliers,
          groups,
          protocols: selectedProtocols.length,
          multiJurisdiction,
        }}
      />
    </div>
  );
}
