import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Calendar, Newspaper } from "lucide-react";
import { Link } from "wouter";

const newsItems = [
  {
    id: 1,
    type: "Award",
    title: "Intelleges Recognized as Supplier of the Year By Battelle",
    date: "June 20, 2023",
    summary: "Intelleges breaks the glass ceiling to become “Supplier of the Year” for Battelle, a leading provider of research and development services. The award recognizes consistent delivery in innovative supply chain management and critical procurement challenges.",
    link: "#",
    featured: true
  },
  {
    id: 2,
    type: "Press Release",
    title: "Intelleges Launches Advanced AI Compliance Engine",
    date: "October 15, 2024",
    summary: "New AI-driven capabilities allow for real-time risk assessment and automated document verification, reducing compliance cycle times by up to 40%.",
    link: "#",
    featured: false
  },
  {
    id: 3,
    type: "Industry News",
    title: "Navigating the New CMMC 2.0 Standards",
    date: "August 05, 2024",
    summary: "How Intelleges is helping defense contractors stay ahead of the latest cybersecurity maturity model certification requirements with automated gap analysis.",
    link: "#",
    featured: false
  }
];

export default function SectionNews() {
  return (
    <section className="container py-24 border-t border-border/40">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl mb-4 text-foreground">
            News & Recognition
          </h2>
          <p className="text-lg text-muted-foreground">
            Latest updates, industry insights, and awards from the Intelleges ecosystem.
          </p>
        </div>
        <Button variant="outline" className="hidden md:flex gap-2">
          View all news <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        {/* Featured Article */}
        <div className="md:col-span-7 lg:col-span-8">
          {newsItems.filter(item => item.featured).map((item) => (
            <Card key={item.id} className="h-full flex flex-col border-border/60 overflow-hidden group hover:shadow-md transition-all">
              <div className="relative h-64 w-full bg-muted overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img 
                  src="/pasted_file_xYXvCm_image.png" 
                  alt="Award" 
                  className="absolute inset-0 h-full w-full object-cover object-center opacity-90 transition-transform duration-700 group-hover:scale-105"
                  style={{ objectFit: 'contain', padding: '2rem', background: '#f5f5f5' }}
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <Badge className="mb-2 bg-emerald-500 hover:bg-emerald-600 border-none text-white">
                    <Award className="h-3 w-3 mr-1" /> {item.type}
                  </Badge>
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Calendar className="h-3 w-3 mr-1" /> {item.date}
                </div>
                <h3 className="text-2xl font-semibold leading-tight group-hover:text-emerald-600 transition-colors">
                  {item.title}
                </h3>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground leading-relaxed">
                  {item.summary}
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="p-0 h-auto font-semibold text-emerald-600 hover:text-emerald-700">
                  Read full story <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Sidebar Articles */}
        <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-6">
          {newsItems.filter(item => !item.featured).map((item) => (
            <Card key={item.id} className="flex-1 flex flex-col border-border/60 hover:border-border transition-colors group">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="font-normal">
                    {item.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center">
                    <Calendar className="h-3 w-3 mr-1" /> {item.date}
                  </span>
                </div>
                <h3 className="text-lg font-semibold leading-snug group-hover:text-emerald-600 transition-colors">
                  {item.title}
                </h3>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {item.summary}
                </p>
              </CardContent>
              <CardFooter className="mt-auto pt-0">
                <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground group-hover:text-foreground">
                  Read more <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          <Card className="bg-muted/30 border-dashed border-border flex flex-col justify-center items-center p-6 text-center h-full min-h-[150px]">
            <Newspaper className="h-8 w-8 text-muted-foreground mb-3" />
            <h3 className="font-medium mb-1">Media Inquiries</h3>
            <p className="text-sm text-muted-foreground mb-4">
              For press kits and interview requests
            </p>
            <Link href="/contact">
              <Button variant="outline" size="sm">Contact PR Team</Button>
            </Link>
          </Card>
        </div>
      </div>
      
      <div className="mt-8 md:hidden">
        <Button variant="outline" className="w-full gap-2">
          View all news <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
