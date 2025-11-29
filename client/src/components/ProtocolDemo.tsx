import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, CheckCircle2, AlertCircle, Download } from "lucide-react";

interface ProtocolDemoProps {
  title: string;
  description: string;
  category: string;
}

export default function ProtocolDemo({ title, description, category }: ProtocolDemoProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    contactEmail: "",
    hasCompliance: "",
    certifications: [] as string[],
    exportControl: "",
    additionalInfo: ""
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.companyName && formData.contactEmail;
      case 2:
        return formData.hasCompliance;
      case 3:
        return formData.certifications.length > 0;
      case 4:
        return formData.exportControl;
      default:
        return false;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-left h-auto p-4 hover:border-primary/50">
          <div className="flex items-start gap-3 w-full">
            <FileText className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="flex-1 space-y-1">
              <div className="font-normal text-sm">{title}</div>
              <div className="text-xs text-muted-foreground font-light">{description}</div>
              <div className="text-xs text-primary font-light">Click to see demo →</div>
            </div>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light">{title}</DialogTitle>
          <p className="text-sm text-muted-foreground font-light">{description}</p>
        </DialogHeader>

        <Tabs defaultValue="flow" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="flow">Interactive Flow</TabsTrigger>
            <TabsTrigger value="output">PDF Output Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="flow" className="space-y-6 mt-6">
            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-8">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div key={i} className="flex items-center flex-1">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    i + 1 <= currentStep ? 'border-primary bg-primary text-primary-foreground' : 'border-border'
                  }`}>
                    {i + 1 < currentStep ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <span className="text-xs font-light">{i + 1}</span>
                    )}
                  </div>
                  {i < totalSteps - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 ${
                      i + 1 < currentStep ? 'bg-primary' : 'bg-border'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div className="space-y-6 min-h-[300px]">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-normal">Company Information</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">
                        Company Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="companyName"
                        placeholder="Enter your company name"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      />
                      {!formData.companyName && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          This field is required
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">
                        Contact Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        placeholder="contact@company.com"
                        value={formData.contactEmail}
                        onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      />
                      {!formData.contactEmail && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          Valid email required
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-normal">Compliance Status</h3>
                  <div className="space-y-4">
                    <Label>
                      Does your organization have an active compliance program? <span className="text-destructive">*</span>
                    </Label>
                    <RadioGroup
                      value={formData.hasCompliance}
                      onValueChange={(value) => setFormData({ ...formData, hasCompliance: value })}
                    >
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-border/40">
                        <RadioGroupItem value="yes" id="yes" />
                        <Label htmlFor="yes" className="font-light cursor-pointer flex-1">
                          Yes, we have a formal compliance program
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-border/40">
                        <RadioGroupItem value="no" id="no" />
                        <Label htmlFor="no" className="font-light cursor-pointer flex-1">
                          No, we do not have a formal program
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-border/40">
                        <RadioGroupItem value="developing" id="developing" />
                        <Label htmlFor="developing" className="font-light cursor-pointer flex-1">
                          We are currently developing one
                        </Label>
                      </div>
                    </RadioGroup>
                    {formData.hasCompliance === "no" && (
                      <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                        <p className="text-sm text-amber-800 dark:text-amber-200 font-light">
                          <strong className="font-normal">Note:</strong> Additional documentation may be required for suppliers without formal compliance programs.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-normal">Certifications</h3>
                  <div className="space-y-4">
                    <Label>
                      Select all applicable certifications <span className="text-destructive">*</span>
                    </Label>
                    <div className="space-y-2">
                      {["ISO 9001", "ISO 27001", "AS9100", "ITAR Registered", "CMMC Level 2", "SOC 2 Type II"].map((cert) => (
                        <div key={cert} className="flex items-center space-x-2 p-3 rounded-lg border border-border/40">
                          <Checkbox
                            id={cert}
                            checked={formData.certifications.includes(cert)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData({ ...formData, certifications: [...formData.certifications, cert] });
                              } else {
                                setFormData({ ...formData, certifications: formData.certifications.filter(c => c !== cert) });
                              }
                            }}
                          />
                          <Label htmlFor={cert} className="font-light cursor-pointer flex-1">
                            {cert}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {formData.certifications.length > 0 && (
                      <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                        <p className="text-sm text-green-800 dark:text-green-200 font-light">
                          <CheckCircle2 className="h-4 w-4 inline mr-1" />
                          You will be prompted to upload certification documents in the next step.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-normal">Export Control</h3>
                  <div className="space-y-4">
                    <Label>
                      Are your products subject to ITAR or EAR export controls? <span className="text-destructive">*</span>
                    </Label>
                    <RadioGroup
                      value={formData.exportControl}
                      onValueChange={(value) => setFormData({ ...formData, exportControl: value })}
                    >
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-border/40">
                        <RadioGroupItem value="itar" id="itar" />
                        <Label htmlFor="itar" className="font-light cursor-pointer flex-1">
                          Yes, ITAR controlled
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-border/40">
                        <RadioGroupItem value="ear" id="ear" />
                        <Label htmlFor="ear" className="font-light cursor-pointer flex-1">
                          Yes, EAR controlled
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-border/40">
                        <RadioGroupItem value="both" id="both" />
                        <Label htmlFor="both" className="font-light cursor-pointer flex-1">
                          Both ITAR and EAR
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-border/40">
                        <RadioGroupItem value="none" id="none" />
                        <Label htmlFor="none" className="font-light cursor-pointer flex-1">
                          No export controls apply
                        </Label>
                      </div>
                    </RadioGroup>
                    <div className="space-y-2">
                      <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
                      <textarea
                        id="additionalInfo"
                        className="w-full min-h-[100px] p-3 rounded-lg border border-border/40 bg-background text-sm font-light"
                        placeholder="Provide any additional details about your export control status..."
                        value={formData.additionalInfo}
                        onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-border/20">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="font-light"
              >
                Previous
              </Button>
              <div className="text-sm text-muted-foreground font-light">
                Step {currentStep} of {totalSteps}
              </div>
              {currentStep < totalSteps ? (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="font-light"
                >
                  Next
                </Button>
              ) : (
                <Button
                  disabled={!isStepValid()}
                  className="font-light"
                >
                  Submit
                </Button>
              )}
            </div>
          </TabsContent>

          <TabsContent value="output" className="space-y-6 mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-normal">Generated PDF Output</h3>
              <p className="text-sm text-muted-foreground font-light">
                After submission, Intelleges automatically generates an audit-ready PDF package with:
              </p>
              
              <div className="border border-border/40 rounded-lg p-6 space-y-4 bg-muted/30">
                <div className="flex items-center gap-3 pb-4 border-b border-border/20">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <div className="font-normal">{title}</div>
                    <div className="text-xs text-muted-foreground font-light">Compliance Response Package</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    <span className="text-sm font-light">Complete questionnaire responses with timestamps</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    <span className="text-sm font-light">Uploaded certification documents</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    <span className="text-sm font-light">E-signature verification with IP address and timestamp</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    <span className="text-sm font-light">Regulatory references and compliance notes</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    <span className="text-sm font-light">Full audit trail of all changes and updates</span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-4 font-light">
                  <Download className="h-4 w-4 mr-2" />
                  Download Sample PDF
                </Button>
              </div>
              
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-200 font-light">
                  <strong className="font-normal">Audit Ready:</strong> Every PDF is cryptographically signed and includes complete metadata for regulatory compliance and legal defensibility.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
