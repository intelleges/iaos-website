import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import SEO from '@/components/seo';
import { Textarea } from '@/components/ui/textarea';

type Tier = 'Basic' | 'Professional' | 'Advanced' | 'Enterprise';

interface PricingConfig {
  tier: Tier;
  customerName: string;
  customerEmail: string;
  industry: string;
  region: string;
  users: number;
  suppliers: number;
  protocols: number;
  sites: number;
  partnerTypes: number;
  erpIntegration: boolean;
  esrsSupport: boolean;
  supportPremium: boolean;
  termYears: number;
  notes: string;
}

export default function PricingCalculator() {
  const [config, setConfig] = useState<PricingConfig>({
    tier: 'Advanced',
    customerName: '',
    customerEmail: '',
    industry: '',
    region: '',
    users: 50,
    suppliers: 1500,
    protocols: 1,
    sites: 10,
    partnerTypes: 0,
    erpIntegration: false,
    esrsSupport: false,
    supportPremium: false,
    termYears: 1,
    notes: '',
  });

  const [pricing, setPricing] = useState<any>(null);
  const [calculating, setCalculating] = useState(false);
  const [savedQuoteId, setSavedQuoteId] = useState<number | null>(null);

  const calculateMutation = trpc.pricing.calculate.useMutation();
  const saveQuoteMutation = trpc.pricing.saveQuote.useMutation();
  const generateInvoiceMutation = trpc.pricing.generateInvoice.useMutation();
  const exportPDFMutation = trpc.pricing.exportPDF.useMutation();
  const tiersQuery = trpc.pricing.getTiers.useQuery();

  // Auto-calculate when config changes
  useEffect(() => {
    const timer = setTimeout(() => {
      handleCalculate();
    }, 500);
    return () => clearTimeout(timer);
  }, [config]);

  const handleCalculate = async () => {
    setCalculating(true);
    try {
      const result = await calculateMutation.mutateAsync({
        tier: config.tier,
        customerName: config.customerName,
        customerEmail: config.customerEmail,
        industry: config.industry,
        region: config.region,
        users: config.users,
        suppliers: config.suppliers,
        protocols: config.protocols,
        sites: config.sites,
        partnerTypes: config.partnerTypes,
        erpIntegration: config.erpIntegration,
        esrsSupport: config.esrsSupport,
        supportPremium: config.supportPremium,
        termYears: config.termYears,
      });
      setPricing(result);
    } catch (error: any) {
      toast.error(error.message || 'Failed to calculate pricing');
    } finally {
      setCalculating(false);
    }
  };

  const handleSaveQuote = async () => {
    if (!config.customerName) {
      toast.error('Please enter a customer name');
      return;
    }

    if (!config.customerEmail) {
      toast.error('Please enter a customer email');
      return;
    }

    try {
      const result = await saveQuoteMutation.mutateAsync({
        ...config,
        notes: config.notes,
      });
      setSavedQuoteId(result.quoteId);
      toast.success(`Quote saved! ID: ${result.quoteId}`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to save quote');
    }
  };

  const handleGenerateInvoice = async () => {
    if (!savedQuoteId) {
      toast.error('Please save the quote first');
      return;
    }

    if (!config.customerEmail) {
      toast.error('Please enter a customer email');
      return;
    }

    try {
      const result = await generateInvoiceMutation.mutateAsync({
        quoteId: savedQuoteId,
        customerEmail: config.customerEmail,
      });
      toast.success(`Invoice created! Invoice #${result.invoiceNumber}`);
      window.open(result.paymentLink, '_blank');
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate invoice');
    }
  };

  const handleExportPDF = async () => {
    if (!savedQuoteId) {
      toast.error('Please save the quote first');
      return;
    }

    try {
      const result = await exportPDFMutation.mutateAsync({
        quoteId: savedQuoteId,
      });
      
      // Download PDF
      const link = document.createElement('a');
      link.href = `data:${result.mimeType};base64,${result.data}`;
      link.download = result.filename;
      link.click();
      
      toast.success('PDF proposal downloaded!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to export PDF');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const selectedTierDef = tiersQuery.data?.find(t => t.name === config.tier);

  const canUseIntegrations = config.tier === 'Advanced' || config.tier === 'Enterprise';

  return (
    <>
      <SEO
        title="Pricing Calculator - Admin"
        description="Internal pricing calculator for sales team"
      />

      <div className="min-h-screen bg-gradient-to-br from-[#F7F9FA] to-[#E8EEF2] py-8">
        <div className="container max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-[#111111] mb-2">
                Pricing Calculator
              </h1>
              <p className="text-[#666666]">
                Internal tool for configuration-based pricing. Generate quotes for enterprise customers.
              </p>
            </div>
            <Link href="/admin/quotes">
              <Button variant="outline">
                View Quote History
              </Button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column: Configuration Form */}
            <div className="space-y-6">
              {/* Customer Profile */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-[#111111] mb-4">
                  Customer Profile
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="customerName">Customer Name *</Label>
                    <Input
                      id="customerName"
                      value={config.customerName}
                      onChange={(e) =>
                        setConfig({ ...config, customerName: e.target.value })
                      }
                      placeholder="e.g., Celestica"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerEmail">Customer Email *</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      value={config.customerEmail}
                      onChange={(e) =>
                        setConfig({ ...config, customerEmail: e.target.value })
                      }
                      placeholder="e.g., john@celestica.com"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="industry">Industry</Label>
                      <Input
                        id="industry"
                        value={config.industry}
                        onChange={(e) =>
                          setConfig({ ...config, industry: e.target.value })
                        }
                        placeholder="e.g., Aerospace & Defense"
                      />
                    </div>
                    <div>
                      <Label htmlFor="region">Region</Label>
                      <Input
                        id="region"
                        value={config.region}
                        onChange={(e) =>
                          setConfig({ ...config, region: e.target.value })
                        }
                        placeholder="e.g., Global"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Tier Selection */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-[#111111] mb-4">
                  Tier Selection
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {(['Basic', 'Professional', 'Advanced', 'Enterprise'] as Tier[]).map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setConfig({ ...config, tier })}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        config.tier === tier
                          ? 'border-[#0A3A67] bg-[#EEF3F7]'
                          : 'border-[#E0E0E0] hover:border-[#C9A635]'
                      }`}
                    >
                      <div className="font-semibold text-[#111111]">{tier}</div>
                      <div className="text-sm text-[#666666] mt-1">
                        {tier === 'Basic' && '$25K/year'}
                        {tier === 'Professional' && '$60K/year'}
                        {tier === 'Advanced' && '$100K/year'}
                        {tier === 'Enterprise' && '$150K+ /year'}
                      </div>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Configuration */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-[#111111] mb-4">
                  Configuration
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="users">Users</Label>
                      <Input
                        id="users"
                        type="number"
                        min="0"
                        value={config.users}
                        onChange={(e) =>
                          setConfig({ ...config, users: parseInt(e.target.value) || 0 })
                        }
                      />
                      <p className="text-xs text-[#666666] mt-1">
                        Included: {selectedTierDef?.includedUsers || 0}
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="suppliers">Suppliers</Label>
                      <Input
                        id="suppliers"
                        type="number"
                        min="0"
                        value={config.suppliers}
                        onChange={(e) =>
                          setConfig({ ...config, suppliers: parseInt(e.target.value) || 0 })
                        }
                      />
                      <p className="text-xs text-[#666666] mt-1">
                        Included: {selectedTierDef?.includedSuppliers || 0}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="protocols">Protocols</Label>
                      <Input
                        id="protocols"
                        type="number"
                        min="0"
                        value={config.protocols}
                        onChange={(e) =>
                          setConfig({ ...config, protocols: parseInt(e.target.value) || 0 })
                        }
                      />
                      <p className="text-xs text-[#666666] mt-1">
                        Incl: {selectedTierDef?.includedProtocols || 0}
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="sites">Sites</Label>
                      <Input
                        id="sites"
                        type="number"
                        min="0"
                        value={config.sites}
                        onChange={(e) =>
                          setConfig({ ...config, sites: parseInt(e.target.value) || 0 })
                        }
                      />
                      <p className="text-xs text-[#666666] mt-1">
                        Incl: {selectedTierDef?.includedSites || 0}
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="partnerTypes">Partner Types</Label>
                      <Input
                        id="partnerTypes"
                        type="number"
                        min="0"
                        value={config.partnerTypes}
                        onChange={(e) =>
                          setConfig({ ...config, partnerTypes: parseInt(e.target.value) || 0 })
                        }
                      />
                      <p className="text-xs text-[#666666] mt-1">
                        Incl: {selectedTierDef?.includedPartnerTypes || 0}
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="termYears">Contract Term (Years)</Label>
                    <Select
                      value={config.termYears.toString()}
                      onValueChange={(value) =>
                        setConfig({ ...config, termYears: parseInt(value) })
                      }
                    >
                      <SelectTrigger id="termYears">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Year</SelectItem>
                        <SelectItem value="2">2 Years</SelectItem>
                        <SelectItem value="3">3 Years</SelectItem>
                        <SelectItem value="5">5 Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              {/* Integrations */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-[#111111] mb-4">
                  Integrations & Add-ons
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="erpIntegration"
                      checked={config.erpIntegration}
                      onCheckedChange={(checked) =>
                        setConfig({ ...config, erpIntegration: checked as boolean })
                      }
                      disabled={!canUseIntegrations}
                    />
                    <Label
                      htmlFor="erpIntegration"
                      className={!canUseIntegrations ? 'text-[#999999]' : ''}
                    >
                      ERP Integration (+$15K/year)
                      {!canUseIntegrations && ' (Advanced/Enterprise only)'}
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="esrsSupport"
                      checked={config.esrsSupport}
                      onCheckedChange={(checked) =>
                        setConfig({ ...config, esrsSupport: checked as boolean })
                      }
                      disabled={!canUseIntegrations}
                    />
                    <Label
                      htmlFor="esrsSupport"
                      className={!canUseIntegrations ? 'text-[#999999]' : ''}
                    >
                      eSRS Support (+$10K/year)
                      {!canUseIntegrations && ' (Advanced/Enterprise only)'}
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="supportPremium"
                      checked={config.supportPremium}
                      onCheckedChange={(checked) =>
                        setConfig({ ...config, supportPremium: checked as boolean })
                      }
                    />
                    <Label htmlFor="supportPremium">
                      Premium Support (+$12K/year)
                    </Label>
                  </div>
                </div>
              </Card>

              {/* Notes */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-[#111111] mb-4">
                  Notes
                </h2>
                <Textarea
                  placeholder="Add any notes about this quote..."
                  value={config.notes}
                  onChange={(e) => setConfig({ ...config, notes: e.target.value })}
                  rows={4}
                />
              </Card>
            </div>

            {/* Right Column: Pricing Display */}
            <div className="space-y-6">
              {/* Pricing Breakdown */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-[#111111] mb-4">
                  Pricing Breakdown
                </h2>
                
                {calculating ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0A3A67] mx-auto"></div>
                    <p className="mt-2 text-sm text-[#666666]">Calculating...</p>
                  </div>
                ) : pricing ? (
                  <div className="space-y-4">
                    {/* Line Items */}
                    <div className="space-y-2">
                      {pricing.breakdown.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-[#666666]">
                            {item.label}
                            {item.quantity > 1 && ` (${item.quantity}×)`}
                          </span>
                          <span className="font-medium text-[#111111]">
                            {formatCurrency(item.total)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-lg font-semibold">
                        <span className="text-[#111111]">Annual Total</span>
                        <span className="text-[#0A3A67]">
                          {formatCurrency(pricing.annualPrice)}
                        </span>
                      </div>
                      
                      {config.termYears > 1 && (
                        <div className="flex justify-between text-2xl font-bold">
                          <span className="text-[#111111]">
                            Total ({config.termYears} Years)
                          </span>
                          <span className="text-[#C9A635]">
                            {formatCurrency(pricing.totalPrice)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-[#666666] py-8">
                    Configure options to see pricing
                  </p>
                )}
              </Card>

              {/* Actions */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-[#111111] mb-4">
                  Actions
                </h2>
                <div className="space-y-3">
                  <Button
                    onClick={handleSaveQuote}
                    disabled={!pricing || saveQuoteMutation.isLoading}
                    className="w-full"
                  >
                    {saveQuoteMutation.isLoading ? 'Saving...' : 'Save Quote'}
                  </Button>

                  <Button
                    onClick={handleGenerateInvoice}
                    disabled={!savedQuoteId || generateInvoiceMutation.isLoading}
                    variant="outline"
                    className="w-full"
                  >
                    {generateInvoiceMutation.isLoading ? 'Generating...' : 'Generate Stripe Invoice'}
                  </Button>

                  <Button
                    onClick={handleExportPDF}
                    disabled={!savedQuoteId || exportPDFMutation.isLoading}
                    variant="outline"
                    className="w-full"
                  >
                    {exportPDFMutation.isLoading ? 'Exporting...' : 'Export PDF Proposal'}
                  </Button>

                  {savedQuoteId && (
                    <p className="text-sm text-center text-[#666666] mt-2">
                      Quote ID: #{savedQuoteId}
                    </p>
                  )}
                </div>
              </Card>

              {/* Tier Features */}
              {selectedTierDef && (
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-[#111111] mb-4">
                    {config.tier} Tier Features
                  </h2>
                  <ul className="space-y-2">
                    {selectedTierDef.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start text-sm">
                        <span className="text-[#C9A635] mr-2">✓</span>
                        <span className="text-[#666666]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
