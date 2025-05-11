import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal } from "@/components/ui/terminal";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Documentation() {
  return (
    <div className="bg-gray-50 py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Documentation</h1>
          <Link href="/">
            <Button variant="outline" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>Setup your environment</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc list-inside text-gray-600">
                  <li>Installation</li>
                  <li>Project Structure</li>
                  <li>Configuration</li>
                  <li>First Steps</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Installation</CardTitle>
                <CardDescription>Setting up your local environment</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-600">
                  Get started by cloning the repository or using the create-next-app command:
                </p>
                <Terminal>
{`# Clone the repository
git clone https://github.com/yourusername/next-app-router-template

# Navigate to the project directory
cd next-app-router-template

# Install dependencies
npm install

# Start the development server
npm run dev`}
                </Terminal>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Concepts</CardTitle>
                <CardDescription>Understanding the template architecture</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-slate max-w-none">
                  <h3>App Router</h3>
                  <p>
                    The App Router is based on the React Server Components proposal and uses file-system based routing. 
                    Each folder represents a route segment that maps to a URL segment, and nested folders create nested routes.
                  </p>
                  
                  <h3>Layout Structure</h3>
                  <p>
                    Layouts are React components that wrap pages and share UI across routes. 
                    They preserve state, remain interactive, and do not re-render when navigating.
                  </p>
                  
                  <h3>API Routes</h3>
                  <p>
                    API routes allow you to build API endpoints as part of your application. 
                    You can handle different HTTP methods (GET, POST, etc.) in the same file.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
