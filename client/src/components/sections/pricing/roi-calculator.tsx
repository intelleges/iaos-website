import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Calculator, DollarSign, Clock, TrendingUp } from "lucide-react";

export default function ROICalculator() {
  const [supplierCount, setSupplierCount] = useState([50]);
  const [manualHoursPerSupplier, setManualHoursPerSupplier] = useState([4]);
  const [hourlyRate, setHourlyRate] = useState([45]);
  
  const [annualSavings, setAnnualSavings] = useState(0);
  const [hoursSaved, setHoursSaved] = useState(0);
  const [efficiencyGain, setEfficiencyGain] = useState(0);

  useEffect(() => {
    // Calculation logic
    // Intelleges typically reduces manual effort by 75%
    const totalCurrentHours = supplierCount[0] * manualHoursPerSupplier[0] * 12; // Annual hours
    const totalCurrentCost = totalCurrentHours * hourlyRate[0];
    
    const estimatedNewHours = totalCurrentHours * 0.25; // 75% reduction
    const estimatedNewCost = estimatedNewHours * hourlyRate[0];
    
    setAnnualSavings(Math.round(totalCurrentCost - estimatedNewCost));
    setHoursSaved(Math.round(totalCurrentHours - estimatedNewHours));
    setEfficiencyGain(75);
  }, [supplierCount, manualHoursPerSupplier, hourlyRate]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="container py-24 border-t border-border/40">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 bg-emerald-500/10 text-emerald-600 border-emerald-200">
            <Calculator className="w-3 h-3 mr-1" /> ROI Calculator
          </Badge>
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl mb-4 text-foreground">
            Calculate your potential savings
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how much time and money you could save by automating your supplier compliance and risk management with Intelleges.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Inputs */}
          <Card className="lg:col-span-7 border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle>Your Current Process</CardTitle>
              <CardDescription>Adjust the sliders to match your organization's metrics.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Number of Suppliers</label>
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-md">{supplierCount[0]}</span>
                </div>
                <Slider 
                  value={supplierCount} 
                  onValueChange={setSupplierCount} 
                  min={10} 
                  max={1000} 
                  step={10} 
                  className="py-2"
                />
                <p className="text-xs text-muted-foreground">Active suppliers in your supply chain.</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Manual Hours / Supplier / Month</label>
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-md">{manualHoursPerSupplier[0]} hrs</span>
                </div>
                <Slider 
                  value={manualHoursPerSupplier} 
                  onValueChange={setManualHoursPerSupplier} 
                  min={0.5} 
                  max={20} 
                  step={0.5} 
                  className="py-2"
                />
                <p className="text-xs text-muted-foreground">Time spent on emails, data entry, and follow-ups.</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Avg. Hourly Labor Cost</label>
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-md">${hourlyRate[0]}</span>
                </div>
                <Slider 
                  value={hourlyRate} 
                  onValueChange={setHourlyRate} 
                  min={20} 
                  max={200} 
                  step={5} 
                  className="py-2"
                />
                <p className="text-xs text-muted-foreground">Fully loaded hourly cost for compliance staff.</p>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="bg-emerald-950 text-white border-none shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
              
              <CardHeader className="relative z-10 pb-2">
                <CardTitle className="text-emerald-100 text-lg font-medium">Estimated Annual Savings</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 space-y-8">
                <div>
                  <div className="text-5xl font-bold tracking-tight mb-2 text-white">
                    {formatCurrency(annualSavings)}
                  </div>
                  <div className="flex items-center text-emerald-200 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>Based on {efficiencyGain}% efficiency gain</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div>
                    <div className="text-emerald-200 text-xs uppercase tracking-wider mb-1">Hours Saved</div>
                    <div className="text-2xl font-bold flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-emerald-400" />
                      {hoursSaved.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-emerald-200 text-xs uppercase tracking-wider mb-1">ROI Multiplier</div>
                    <div className="text-2xl font-bold flex items-center">
                      <DollarSign className="w-4 h-4 mr-2 text-emerald-400" />
                      12x
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/50 border-dashed border-border">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Calculator className="w-4 h-4 mr-2 text-muted-foreground" />
                  Did you know?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Manual compliance processes cost the average enterprise over $140,000 annually in lost productivity alone, not counting the risk of non-compliance fines.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
