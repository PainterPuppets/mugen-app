import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Github, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/documentation", label: "Documentation" },
    { path: "/examples", label: "Examples" },
    { path: "/api-testing", label: "API Testing" }
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <i className="ri-nextjs-fill text-3xl text-primary">N</i>
              <span className="ml-2 text-xl font-semibold">Next.js Template</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex space-x-8">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  href={item.path}
                  className={`${
                    location === item.path 
                      ? "border-b-2 border-primary text-gray-900" 
                      : "border-b-2 border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700"
                  } inline-flex items-center px-1 pt-1 text-sm font-medium`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <Github className="h-6 w-6" />
            </a>
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-3 text-gray-500 hover:text-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <Settings className="h-6 w-6" />
            </Button>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button 
              type="button" 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg 
                className="h-6 w-6" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`${
                location === item.path 
                  ? "bg-primary bg-opacity-10 border-l-4 border-primary text-primary" 
                  : "border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 text-gray-500 hover:text-gray-700"
              } block pl-3 pr-4 py-2 text-base font-medium`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
