import { 
  LayoutGrid, 
  Server, 
  Route, 
  Database, 
  FolderKanban,
  SprayCan
} from "lucide-react";

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
};

const features: Feature[] = [
  {
    icon: <SprayCan className="h-6 w-6 text-primary" />,
    title: "React Components",
    description: "Organized component structure with separation of concerns and reusable UI elements.",
    color: "text-primary"
  },
  {
    icon: <Server className="h-6 w-6 text-purple-600" />,
    title: "Express.js Backend",
    description: "Robust API endpoints with middleware, error handling, and database integrations.",
    color: "text-purple-600"
  },
  {
    icon: <Route className="h-6 w-6 text-green-600" />,
    title: "App Router",
    description: "Modern Next.js App Router with file-based routing, layouts, and server components.",
    color: "text-green-600"
  },
  {
    icon: <Database className="h-6 w-6 text-amber-600" />,
    title: "API Integration",
    description: "Seamless communication between frontend and backend with proper error handling.",
    color: "text-amber-600"
  },
  {
    icon: <LayoutGrid className="h-6 w-6 text-red-600" />,
    title: "Responsive Design",
    description: "Mobile-first design approach with Tailwind CSS for beautiful interfaces on all devices.",
    color: "text-red-600"
  },
  {
    icon: <FolderKanban className="h-6 w-6 text-purple-600" />,
    title: "Clean Organization",
    description: "Well-structured project folders with clear separation of concerns and logical grouping.",
    color: "text-purple-600"
  }
];

const FeaturesSection = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Project Structure & Features
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Everything you need to build a modern full-stack application with Next.js
          </p>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-6 py-5 border-b border-gray-200 flex items-center">
                {feature.icon}
                <h3 className="ml-3 text-lg font-medium text-gray-900">{feature.title}</h3>
              </div>
              <div className="px-6 py-5">
                <p className="text-gray-500">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
