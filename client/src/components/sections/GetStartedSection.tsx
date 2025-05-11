import { Button } from "@/components/ui/button";
import { Terminal } from "@/components/ui/terminal";
import { BookOpen, Github } from "lucide-react";

const GetStartedSection = () => {
  return (
    <div className="bg-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-xl text-gray-300">
            Clone the repository and start building your Next.js application today.
          </p>
        </div>

        <div className="mt-8 bg-gray-900 rounded-lg shadow-lg p-4">
          <div className="terminal font-mono text-sm text-gray-300 flex items-center">
            <span className="text-primary mr-2">$</span>
            <span>npx create-next-app@latest --example https://github.com/yourusername/next-app-router-template my-project</span>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary">
              <Github className="mr-2 h-5 w-5" />
              View on GitHub
            </Button>
          </a>
          <a href="/documentation">
            <Button variant="outline" className="ml-4 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary">
              <BookOpen className="mr-2 h-5 w-5" />
              Documentation
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default GetStartedSection;
