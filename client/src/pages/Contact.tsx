import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import { InlineWidget } from "react-calendly";

export default function Contact() {
  return (
    <div className="container py-24">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-medium tracking-tight mb-6">Get in touch</h1>
          <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
            Ready to transform your compliance and supplier management? 
            Our team is here to help you navigate the complexities of federal requirements.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                <Mail className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-muted-foreground">contact@intelleges.com</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                <Phone className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-muted-foreground">+1 (917) 818-0225</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                <MapPin className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-medium">Office</h3>
                <p className="text-muted-foreground">
                  123 Compliance Way<br />
                  Washington, DC 20001
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <Card className="border-border/60 shadow-sm overflow-hidden">
          <CardHeader>
            <CardTitle>Book a Demo</CardTitle>
            <CardDescription>
              Schedule a 30-minute call with our compliance experts.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[600px] w-full">
              <InlineWidget 
                url="https://calendly.com/app/scheduling/meeting_types/user/me" 
                styles={{ height: '100%', width: '100%' }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
