import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <div className="mb-6 rounded-full bg-muted p-4">
        <AlertCircle className="h-10 w-10 text-muted-foreground" />
      </div>
      <h1 className="mb-4 text-4xl font-bold tracking-tight">Page not found</h1>
      <p className="mb-8 max-w-md text-muted-foreground">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link href="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
}
