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
import { Clock, AlertCircle } from 'lucide-react';

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

  const [lastSavedQuoteId, setLastSavedQuoteId] = useState<number | null>(null);

  // Calculate pricing in real-time
  const { data: pricing, isLoading: isPricingLoading } = trpc.pricing.calculate.useQuery(config);

  // Mutations
  const saveQuoteMutation = trpc.pricing.saveQuote.useMutation();
  const generateInvoiceMutation = trpc.pricing.generateStripeInvoice.useMutation();
  const exportPDFMutation = trpc.pricing.exportPDF.useMutation();

  const tierDefinitions = {
    Basic: {
      basePrice: 25000,
      includedUsers: 10,
      includedSuppliers: 100,
      includedProtocols: 1,
      includedSites: 1,
      includedPartnerTypes: 0,
      allowsIntegrations: false,
    },
    Professional: {
      basePrice: 60000,
      includedUsers: 25,
      includedSuppliers: 500,
      includedProtocols: 3,
      includedSites: 5,
      includedPartnerTypes: 2,
      allowsIntegrations: false,
    },
    Advanced: {
      basePrice: 100000,
      includedUsers: 50,
      includedSuppliers: 1500,
      includedProtocols: 5,
      includedSites: 10,
      includedPartnerTypes: 5,
      allowsIntegrations: true,
    },
    Enterprise: {
      basePrice: 150000,
      includedUsers: 100,
      includedSuppliers: 5000,
      includedProtocols: 10,
      includedSites: 25,
      includedPartnerTypes: 10,
      allowsIntegrations: true,
    },
  };

  const currentTierDef = tierDefinitions[config.tier];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSaveQuote = async () => {
    if (!config.customerName) {
      toast.error('Please enter customer name');
      return;
    }

    try {
      const result = await saveQuoteMutation.mutateAsync(config);
      setLastSavedQuoteId(result.quoteId);
      toast.success(`Quote #${result.quoteId} saved successfully! Valid for 30 days.`);
    } catch (error) {
      toast.error('Failed to save quote');
      console.error(error);
    }
  };

  const handleGenerateInvoice = async () => {
    if (!lastSavedQuoteId) {
      toast.error('Please save the quote first');
      return;
    }

    if (!config.customerEmail) {
      toast.error('Customer email is required for invoice generation');
      return;
    }

    try {
      const result = await generateInvoiceMutation.mutateAsync({ id: lastSavedQuoteId });
      toast.success('Stripe invoice created successfully!');
      if (result.invoiceUrl) {
        window.open(result.invoiceUrl, '_blank');
      }
    } catch (error) {
      toast.error('Failed to generate invoice');
      console.error(error);
    }
  };

  const handleExportPDF = async () => {
    if (!lastSavedQuoteId) {
      toast.error('Please save the quote first');
      return;
    }

    try {
      const result = await exportPDFMutation.mutateAsync({ id: lastSavedQuoteId });
      
      // Convert base64 to blob and download
      const byteCharacters = atob(result.data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: result.mimeType });
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = result.filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success('PDF exported successfully!');
    } catch (error) {
      toast.error('Failed to export PDF');
      console.error(error);
    }
  };

  return (
    <>
      <SEO
        title="Pricing Calculator - Admin"
        description="Internal pricing calculator for generating customer quotes"
      />
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container max-w-7xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Pricing Calculator</h1>
              <p className="text-gray-600 mt-1">Generate custom quotes for enterprise customers</p>
            </div>
            <Link href="/admin/quotes">
              <Button variant="outline">View Quote History</Button>
            </Link>
          </div>

          {/* Expiration Notice */}
          <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900">Quote Validity Period</h3>
                <p className="text-sm text-blue-700 mt-1">
                  All quotes are valid for <strong>30 days</strong> from creation. Customers will receive automated reminders 7 days before expiration.
                </p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Configuration */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Profile */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Customer Profile</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customerName">Customer Name *</Label>
                    <Input
                      id="customerName"
                      value={config.customerName}
                      onChange={(e) => setConfig({ ...config, customerName: e.target.value })}
                      placeholder="Acme Corporation"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerEmail">Customer Email *</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      value={config.customerEmail}
                      onChange={(e) => setConfig({ ...config, customerEmail: e.target.value })}
                      placeholder="procurement@acme.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Input
                      id="industry"
                      value={config.industry}
                      onChange={(e) => setConfig({ ...config, industry: e.target.value })}
                      placeholder="Manufacturing"
                    />
                  </div>
                  <div>
                    <Label htmlFor="region">Region</Label>
                    <Input
                      id="region"
                      value={config.region}
                      onChange={(e) => setConfig({ ...config, region: e.target.value })}
                      placeholder="North America"
                    />
                  </div>
                </div>
              </Card>

              {/* Tier Selection */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Tier Selection</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(['Basic', 'Professional', 'Advanced', 'Enterprise'] as Tier[]).map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setConfig({ ...config, tier })}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        config.tier === tier
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold text-sm">{tier}</div>
                      <div className="text-xs text-gray-600 mt-1">
                        {formatCurrency(tierDefinitions[tier].basePrice)}
                      </div>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Configuration */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Configuration</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="users">Users</Label>
                    <Input
                      id="users"
                      type="number"
                      value={config.users}
                      onChange={(e) => setConfig({ ...config, users: parseInt(e.target.value) || 0 })}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Included: {currentTierDef.includedUsers}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="suppliers">Suppliers</Label>
                    <Input
                      id="suppliers"
                      type="number"
                      value={config.suppliers}
                      onChange={(e) => setConfig({ ...config, suppliers: parseInt(e.target.value) || 0 })}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Included: {currentTierDef.includedSuppliers}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="protocols">Protocols</Label>
                    <Input
                      id="protocols"
                      type="number"
                      value={config.protocols}
                      onChange={(e) => setConfig({ ...config, protocols: parseInt(e.target.value) || 0 })}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Included: {currentTierDef.includedProtocols}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="sites">Sites</Label>
                    <Input
                      id="sites"
                      type="number"
                      value={config.sites}
                      onChange={(e) => setConfig({ ...config, sites: parseInt(e.target.value) || 0 })}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Included: {currentTierDef.includedSites}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="partnerTypes">Partner Types</Label>
                    <Input
                      id="partnerTypes"
                      type="number"
                      value={config.partnerTypes}
                      onChange={(e) => setConfig({ ...config, partnerTypes: parseInt(e.target.value) || 0 })}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Included: {currentTierDef.includedPartnerTypes}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="termYears">Contract Term</Label>
                    <Select
                      value={config.termYears.toString()}
                      onValueChange={(value) => setConfig({ ...config, termYears: parseInt(value) })}
                    >
                      <SelectTrigger id="termYears">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Year</SelectItem>
                        <SelectItem value="2">2 Years</SelectItem>
                        <SelectItem value="3">3 Years</SelectItem>
                        <SelectItem value="4">4 Years</SelectItem>
                        <SelectItem value="5">5 Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              {/* Integrations */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Add-On Integrations</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="erpIntegration"
                      checked={config.erpIntegration}
                      onCheckedChange={(checked) =>
                        setConfig({ ...config, erpIntegration: checked as boolean })
                      }
                      disabled={!currentTierDef.allowsIntegrations}
                    />
                    <div className="flex-1">
                      <Label htmlFor="erpIntegration" className="font-medium">
                        ERP Integration ($15,000/year)
                      </Label>
                      <p className="text-sm text-gray-600">
                        {currentTierDef.allowsIntegrations
                          ? 'Seamless integration with your ERP system'
                          : 'Available for Advanced and Enterprise tiers only'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="esrsSupport"
                      checked={config.esrsSupport}
                      onCheckedChange={(checked) =>
                        setConfig({ ...config, esrsSupport: checked as boolean })
                      }
                      disabled={!currentTierDef.allowsIntegrations}
                    />
                    <div className="flex-1">
                      <Label htmlFor="esrsSupport" className="font-medium">
                        eSRS Support ($10,000/year)
                      </Label>
                      <p className="text-sm text-gray-600">
                        {currentTierDef.allowsIntegrations
                          ? 'European Sustainability Reporting Standards support'
                          : 'Available for Advanced and Enterprise tiers only'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="supportPremium"
                      checked={config.supportPremium}
                      onCheckedChange={(checked) =>
                        setConfig({ ...config, supportPremium: checked as boolean })
                      }
                    />
                    <div className="flex-1">
                      <Label htmlFor="supportPremium" className="font-medium">
                        Premium Support ($12,000/year)
                      </Label>
                      <p className="text-sm text-gray-600">
                        24/7 priority support with dedicated account manager
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Notes */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Notes</h2>
                <Textarea
                  value={config.notes}
                  onChange={(e) => setConfig({ ...config, notes: e.target.value })}
                  placeholder="Add any internal notes about this quote..."
                  rows={4}
                />
              </Card>
            </div>

            {/* Right Column - Pricing Summary */}
            <div className="space-y-6">
              <Card className="p-6 sticky top-6">
                <h2 className="text-xl font-semibold mb-4">Pricing Summary</h2>
                
                {isPricingLoading ? (
                  <div className="text-center py-8 text-gray-500">Calculating...</div>
                ) : pricing ? (
                  <>
                    <div className="space-y-3 mb-6">
                      {pricing.breakdown.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {item.label}
                            {item.quantity > 1 && ` (×${item.quantity})`}
                          </span>
                          <span className="font-medium">{formatCurrency(item.total)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="font-semibold">Annual Price:</span>
                        <span className="font-semibold text-lg">
                          {formatCurrency(pricing.annualPrice)}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Contract Term:</span>
                        <span>{pricing.termYears} {pricing.termYears === 1 ? 'year' : 'years'}</span>
                      </div>
                      <div className="flex justify-between text-xl font-bold text-blue-600 pt-2 border-t">
                        <span>Total Price:</span>
                        <span>{formatCurrency(pricing.totalPrice)}</span>
                      </div>
                    </div>

                    {/* Expiration Info */}
                    <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
                        <div className="text-xs text-amber-800">
                          <strong>Validity:</strong> This quote will be valid for 30 days after creation.
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 space-y-3">
                      <Button
                        onClick={handleSaveQuote}
                        className="w-full"
                        disabled={saveQuoteMutation.isPending}
                      >
                        {saveQuoteMutation.isPending ? 'Saving...' : 'Save Quote'}
                      </Button>
                      
                      <Button
                        onClick={handleGenerateInvoice}
                        variant="outline"
                        className="w-full"
                        disabled={!lastSavedQuoteId || generateInvoiceMutation.isPending}
                      >
                        {generateInvoiceMutation.isPending ? 'Generating...' : 'Generate Stripe Invoice'}
                      </Button>
                      
                      <Button
                        onClick={handleExportPDF}
                        variant="outline"
                        className="w-full"
                        disabled={!lastSavedQuoteId || exportPDFMutation.isPending}
                      >
                        {exportPDFMutation.isPending ? 'Exporting...' : 'Export PDF Proposal'}
                      </Button>
                    </div>

                    {lastSavedQuoteId && (
                      <div className="mt-4 text-sm text-center text-gray-600">
                        Last saved: Quote #{lastSavedQuoteId}
                      </div>
                    )}
                  </>
                ) : null}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
